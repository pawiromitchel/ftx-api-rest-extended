const FTX = require('./index');

const creds = {
    'key': 'key1',
    'secret': 'secret1',
    'subaccount': 'subaccount1'
}

const FTX_INSTANCE = new FTX(creds);

async function test() {
    const getPrice = await FTX_INSTANCE.getPrice('BTC/USD');
    if (getPrice) {
        const { price, quoteCurrency } = getPrice.result;
        console.log(`[i] Exchange rate: ${price} ${quoteCurrency}`);
    }
}

test();