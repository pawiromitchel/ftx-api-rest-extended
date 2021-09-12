const FTX = require('./index');

const creds = {
    'key': 'key1',
    'secret': 'secret1',
    'subaccount': 'subaccount1'
}

const FTX_INSTANCE = new FTX(creds);

async function test() {
    const { price, quoteCurrency } = await FTX_INSTANCE.getPrice('BTC/USD');
    console.log(`[i] Exchange rate: ${price} ${quoteCurrency}`);
}

test();