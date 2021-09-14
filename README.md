# ftx-api-rest-extended
An extended version of the [ftx-api-rest](https://github.com/askmike/ftx-api-rest) package made by [askmike](https://github.com/askmike/ftx-api-rest), I decided to write specific functions focused on spot / future trading ✨.

## Table of contents
1. [Example](#example)
1. [Overview](#overview)
    1. [getBalance](#getbalance)
    1. [createOTCOrder](#createotcorder)
    1. [fundingRate](#fundingrate)
    1. [calculateOrderSize](#calculateordersize)
    1. [createOrder](#createorder)
    1. [getOpenPositions](#getopenpositions)
    1. [getLimitOrders](#getlimitorders)
    1. [closeOrders](#closeorders)
    1. [closeLimitOrders](#closelimitorders)

## Install
```bash
npm install ftx-api-rest-extended
```

## Usage
You can use the code snippet below as a reference, go to [Overview](#overview) for a breakdown of all the features
```js
const FTX = require('ftx-api-rest-extended');

// request the API credentials on your FTX account
const CREDS = {
    'key': '',
    'secret': '',
    'subaccount': ''
}

const FTX_INSTANCE = new FTX(CREDS);

async function test() {
    // get the price of the ETH-PERP future contract
    const { price } = await FTX_INSTANCE.getPrice('eth-perp');
    console.log(`[i] Exchange rate: ${price}`);

    // sample of a limit buy order on the ETH-PERP future contract
    await FTX_INSTANCE.marketOrder('0.005', 'eth-perp', 'buy', 'limit', 3000);
    // close all limit orders
    const closeLimitOrders = await FTX_INSTANCE.closeLimitOrders();
    console.log(closeLimitOrders);
}

test();
```

## Overview
A breakdown of all the functions within the module
### getBalance
Get balance of the subaccount
```
getBalance()
```

Get the price of an future or spot asset
```js
// _pair: Any asset on the ftx exchange such as BTC-PERP or BTC/USD
getPrice(_pair)
```

### createOTCOrder
OTC (Over the counter) Convert X to Y
```js
// _from: Asset you want to convert
// _to: Asset you want to convert to
// _size: How much you want to convert
createOTCOrder(_from, _to, _size)
```

### fundingRate
Get the funding rate of a future contract
```js
// _pair: Any asset on the ftx exchange such as BTC-PERP or BTC/USD
fundingRate(_pair)
```

### calculateOrderSize
This will calculate the order size based on the portfolio balance
```js
// _sizeInPercentage: how big the order has to be in percentage
// _pair: ETH-PERP or BTC-PERP
calculateOrderSize(_sizeInPercentage, _pair)
```

### createOrder
Place your market or limit order, you can use the `calculateOrderSize(_sizeInPercentage, _pair)` function to calculate the unit amount
```js
// _size: size of the order
// _pair: the future contract name
// _side: buy or sell
// _type: market (default) or limit order
// _price: specify if it's a limit order
createOrder(_size, _pair, _side, _type = 'market', _price = null)
```

### getOpenPositions
Get all open positions
```js
getOpenPositions()
```

### getLimitOrders
Get all open limit orders
```js
getLimitOrders()
```

### closeOrders
Close all orders or of a specific pair
```js
// _pair: close the orders of the specified asset
closeOrders(_pair = '')
```

### closeLimitOrders
Close all limit orders or of a specific pair
```js
// _pair: close the orders of the specified asset
closeLimitOrders(_pair = '')
```

## Reference
- [FTX API Docs](https://docs.ftx.com/?javascript#rest-api)

## Wanna buy me a coffee? ☕
ETH: mitchel.eth or 0x5584A353528dfeB2Fc751Ab48b72D32726C79507   
BTC: bc1qqfnfkrnhv903v9v38n98vvk35hgrp77ay7kwqr or 1DhGZ1kvEF1wamq3oRb4f7pPz3cMBaxKz
