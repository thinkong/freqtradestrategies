# Freqtrade Strategy Collection

This is a collection of strategies that should be categorized by the default timeframe.

I am aiming to automatically backtest all strategies on small trending time ranges. 

## Organization

All Strategies go into the strategy folder.

Backtesting data is from [NFI](https://github.com/iterativv/NostalgiaForInfinity). So currently only limited to kucoin and binance. Timeframes only have 5m , 15m, 1h, 1d. If you need more, I am willing to fork NFIData and add more timeframes. And maybe more exchanges. 

## Time ranges

Time ranges per trend is as follows.
|Trend	|Timerange|
|---|---|
|Downtrend	|20210509-20210524|
|Uptrend	|20210127-20210221|
|Sidetrend	|20210518-20210610|
|Final	|20210425-20210610|

## How to contribute

You can add your strategy into ./user_data/strategies. Then add your strategy in the strategy_<timeframe>.env file. Create a pull request. 

Please create an issue if you are using something other than the provided timeframe or something more than the freqtrade:develop tree.
