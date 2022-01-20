# Freqtrade Strategy Collection

This is a collection of strategies that should be categorized by the default timeframe.

I am aiming to automatically backtest all strategies on small trending time ranges. 

## Organization

All Strategies go into their respecting timeframe folder as follows

| timeframe | folder |
|---|---|
|5m | strategies_5m |
|15m | strategies_15m |
|30m | strategies_30m |
|1h | strategies_1h |

If your strategy file somehow has strategies with mixed timeframes, please split it up or add them to both folders. 


## Note To Self

```
docker-compose run --rm -e TIME_FRAME=5m freqtrade backtesting -i 5m --timerange=${{ matrix.timerange }} --exchange ${{ matrix.exchange }}
```