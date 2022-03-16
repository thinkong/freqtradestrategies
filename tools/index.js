import * as fs from 'fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { markdownTable } from 'markdown-table';
import upath from 'upath';
import {EOL} from 'os';

const args = yargs(hideBin(process.argv))
    .option('outputpath', {
        alias: 'o',
        type: 'string',
        default: '../results',
        description: 'output file name'
    })
    .option('backtestpath', {
        alias: 'b',
        type: 'string',
        default: '../user_data/backtest_results',
        description: 'freqtrade backtest result file'
    })
    .option('timeframe', {
        alias:'t',
        type:'string',
        default:'5m',
        description: 'timeframe this backtest data has been run on'
    })
    .option('exchange',{
        alias:'e',
        type:'string',
        default:'binance',
        description: 'exchange this backtest data has been run on'
    })
    .option('timerange',{
        alias:'r',
        type:'string',
        default:'10000101-99991231',
        description: 'timerange this backtest data has been run on'
    })
    .parse();
var backtestlatestfilepath = upath.join(args.backtestpath, '.last_result.json');
var latestJson = JSON.parse(fs.readFileSync(backtestlatestfilepath));
var backtestfile = latestJson.latest_backtest;

var backtestData = JSON.parse(fs.readFileSync(upath.join(args.backtestpath, backtestfile)));
function calculateWinRate(p) {
    return p[0] / (p[0] + p[1] + p[2]);
};
var jsonKeyToTablename = [
    { jsonkey: 'key', tablename: 'Strategy Name', type: 'string' },
    { jsonkey: 'duration_avg', tablename: 'Average Duration', type: 'string' },
    { jsonkey: 'max_drawdown_account', tablename: 'Max Drawdown', type: 'pct' },
    { jsonkey: 'profit_mean_pct', tablename: 'Average Profiit', type: 'pct' },
    { jsonkey: 'profit_sum_pct', tablename: 'Cum Profit', type: 'pct' },
    { jsonkey: 'profit_total_pct', tablename: 'Tot Profit USDT', type: 'integer' },
    { jsonkey: 'trades', tablename: 'Trade Count', type: 'integer' },
    { jsonkey: 'win_rate', tablename: 'Win Rate', type: 'function', calfunc: calculateWinRate, parameters: ['wins', 'losses', 'draws'] }
];
var tableData = [['Strategy Name', 'Average Duration', 'Max Drawdown', 'Profit Mean', 'Profit Sum', 'Profit Total', 'Trade Count', 'Win Rate']];
var comparisonKeys = tableData[0];
for (var data of backtestData.strategy_comparison) {
    var tmpTableData = [];
    for (var i = 0; i < tableData[0].length; ++i) {
        var columnName = tableData[0][i];
        var keytotable = jsonKeyToTablename.find(element => element.tablename == columnName);
        switch (keytotable.type) {
            case 'pct':
                if (data[keytotable.jsonkey] != undefined) {
                    tmpTableData.push((data[keytotable.jsonkey]).toFixed(2) + '%')
                } else {
                    tmpTableData.push('0%')
                }
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
var mdheader = '#### ' + args.exchange + ' ' + args.timeframe + ' ' + args.timerange + ' !heading' + EOL;
var filename = args.exchange + '-' + args.timeframe + '-' + args.timerange + '.md' 
var outputfilepath = upath.join(args.outputpath, filename);
fs.writeFileSync(outputfilepath, mdheader + table1, { flag:'w'});
