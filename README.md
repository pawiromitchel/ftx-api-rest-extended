# ftx-api-rest-extended
An extended version of the [FTX API wrapper](https://github.com/askmike/ftx-api-rest)

`npm install ftx-api-rest-extended`

## Usage
You can use the `example.js` as a reference. Request a API from your [FTX account](https://ftx.com/#a=4341346)

```js
...
const creds = {
    'key': 'key1',
    'secret': 'secret1',
    'subaccount': 'subaccount1'
}
...
```

## Functionalities
1. `getBalance()`
1. `getPrice(_pair)`
1. `fundingRate(_pair)`
1. `convert(_from, _to, _size)`
1. `getQuoteInfo(_id)`
1. `acceptQuote(_id)`

### Todo
1. `buy()`
1. `sell()`