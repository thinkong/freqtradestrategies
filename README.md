# Table of Contents

  * [Summary](#summary)
  * [Organization](#organization)
  * [Results](#results)
  * [Time ranges](#time-ranges)
  * [How to contribute](#how-to-contribute)


# Freqtrade Strategy Collection

## Summary
This is a collection of strategies that should be categorized by the default timeframe.

I am aiming to automatically backtest all strategies on small trending time ranges. 

## Organization

All Strategies go into the strategy folder.

Backtesting data is from [NFI](https://github.com/iterativv/NostalgiaForInfinity). So currently only limited to kucoin and binance. Timeframes only have 5m , 15m, 1h, 1d. If you need more, I am willing to fork NFIData and add more timeframes. And maybe more exchanges. 

## Results

Please note that strategy name doesn't always mean the file name. If the file name doesn't match, you will have to search the strategy folder for the strategy file.

I am still looking for a way to add the results here.. Until then you can check the results in the [results folder](https://github.com/thinkong/freqtradestrategies/tree/main/results)

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


## Organization

All Strategies go into the strategy folder.

Backtesting data is from [NFI](https://github.com/iterativv/NostalgiaForInfinity). So currently only limited to kucoin and binance. Timeframes only have 5m , 15m, 1h, 1d. If you need more, I am willing to fork NFIData and add more timeframes. And maybe more exchanges. 



## How to contribute

You can add your strategy into ./user_data/strategies. Then add your strategy in the strategy_<timeframe>.env file. Create a pull request. 

Please create an issue if you are using something other than the provided timeframe or something more than the freqtrade:develop tree.
