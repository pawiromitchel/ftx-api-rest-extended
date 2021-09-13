# ftx-api-rest-extended
An extended version of the [ftx-api-rest](https://github.com/askmike/ftx-api-rest) package made by [askmike](https://github.com/askmike/ftx-api-rest), I decided to write specific functions focused on spot / future trading ✨.
```bash
npm install ftx-api-rest-extended
```
## Example
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
There's also a generated JSDoc available: https://pawiromitchel.github.io/ftx-api-rest-extended/docs/FTXService.html
## Reference
- [FTX API Docs](https://docs.ftx.com/?javascript#rest-api)

## Wanna buy me a coffee? ☕
ETH: mitchel.eth or 0x5584A353528dfeB2Fc751Ab48b72D32726C79507   
BTC: bc1qqfnfkrnhv903v9v38n98vvk35hgrp77ay7kwqr or 1DhGZ1kvEF1wamq3oRb4f7pPz3cMBaxKz
