import fs from 'fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'
import { markdownTable } from 'markdown-table';
import upath from 'upath';

const args = yargs(hideBin(process.argv))
    .option('input', {
        alias: 'i',
        type: 'string',
        default: '../.github/README_Template.md',
        description: 'input file name'
    })
    .option('outputpath', {
        alias: 'o',
        type: 'string',
        default: '../outputs',
        description: 'output file name'
    })
    .option('backtestfile', {
        alias: 'b',
        type: 'string',
        default: '../user_data/backtest_results/backtest-result-2022-01-21_02-38-31.json',
        description: 'freqtrade backtest result file'
    })
    .option('timeframe', {
        alias:'t',
        type:'string',
        default:'5m',
        description: 'timeframe this backtest data has been run on'
    })
    .parse();

var backtestData = JSON.parse(fs.readFileSync(args.backtestfile));
function calculateWinRate(p) {
    return p[0] / (p[0] + p[1] + p[2]);
};
var jsonKeyToTablename = [
    { jsonkey: 'key', tablename: 'Strategy Name', type: 'string' },
    { jsonkey: 'duration_avg', tablename: 'Average Duration', type: 'string' },
    { jsonkey: 'max_drawdown_per', tablename: 'Max Drawdonw', type: 'pct' },
    { jsonkey: 'profit_mean_pct', tablename: 'Profit Mean', type: 'pct' },
    { jsonkey: 'profit_sum_pct', tablename: 'Profit Sum', type: 'pct' },
    { jsonkey: 'profit_total_pct', tablename: 'Profit Total', type: 'pct' },
    { jsonkey: 'trades', tablename: 'Trade Count', type: 'integer' },
    { jsonkey: 'win_rate', tablename: 'Win Rate', type: 'function', calfunc: calculateWinRate, parameters: ['wins', 'losses', 'draws'] }
];
var tableData = [['Strategy Name', 'Average Duration', 'Max Drawdonw', 'Profit Mean', 'Profit Sum', 'Profit Total', 'Trade Count', 'Win Rate']];
var comparisonKeys = tableData[0];
for (var data of backtestData.strategy_comparison) {
    var tmpTableData = [];
    for (var i = 0; i < tableData[0].length; ++i) {
        var columnName = tableData[0][i];
        var keytotable = jsonKeyToTablename.find(element => element.tablename == columnName);
        switch (keytotable.type) {
            case 'pct':
                tmpTableData.push((data[keytotable.jsonkey] * 100).toFixed(2) + '%')
                break;
            case 'function':
                var parameters = [];
                for (var j = 0; j < keytotable.parameters.length; ++j) {
                    parameters.push(data[keytotable.parameters[j]]);
                }
                tmpTableData.push((keytotable.calfunc(parameters) * 100).toFixed(2) + '%');
                break;
            default:
                tmpTableData.push(data[keytotable.jsonkey]);
                break;
        }
    }
    tableData.push(tmpTableData);
}
var table1 = markdownTable(tableData);

// var filedata = fs.readFileSync(args.input);

// let re = new RegExp('\[\[' + args.timeframe+ '\]\]', 'g');
// var OK = re.exec(filedata.toString());
// var out = filedata.toString().replace(re, table1);
var outputfilepath = upath.join(args.outputpath, args.timeframe + '.md');//new URL(args.outputpath + '/' + args.timeframe + '.md', import.meta.url).pathname;
fs.writeFileSync(outputfilepath, table1, { flag:'w'});
