# Freqtrade Strategy Collection

#include "../docs/summary.md"
#include "../docs/Organization.md"
#include "../docs/Results.md"
#include "../docs/Timeranges.md"
#include "../docs/Contribute.md"

## Organization

All Strategies go into the strategy folder.

Backtesting data is from [NFI](https://github.com/iterativv/NostalgiaForInfinity). So currently only limited to kucoin and binance. Timeframes only have 5m , 15m, 1h, 1d. If you need more, I am willing to fork NFIData and add more timeframes. And maybe more exchanges. 



## How to contribute

You can add your strategy into ./user_data/strategies. Then add your strategy in the strategy_<timeframe>.env file. Create a pull request. 

Please create an issue if you are using something other than the provided timeframe or something more than the freqtrade:develop tree.
