const FTXRest = require('ftx-api-rest');

class FTXService {
    constructor(creds) {
        this.FTXConnection = new FTXRest(creds);
    }

    /**
     * Get balance of the subaccount
     * @returns balance of the account
     */
    async getBalance() {
        try {
            let req = FTXConnection.request({
                method: 'GET',
                path: '/account'
            })
            let res = await req;
            return await res.result;
        } catch (e) {
            console.error(`Something went wrong ${e}`);
        }
    }

    /**
     * Get the price of an future or spot asset
     * @param {string} _pair BTC-PERP or BTC/USD
     * @returns
     */
    async getPrice(_pair) {
        try {
            const req = this.FTXConnection.request({
                method: 'GET',
                path: '/markets/' + _pair
            });
            const res = await req;
            return await res.result;
        } catch (e) {
            console.error(`Something went wrong ${e}`);
        }
    }

    /**
     * FOR SPOT ORDERS
     */

    /**
     * Convert X to Y
     * @param {string} _from Asset you want to convert
     * @param {string} _to Asset you want to convert to
     * @param {number} _size How much you want to convert
     * @returns 
     */
    async convert(_from, _to, _size) {
        try {
            const req = this.FTXConnection.request({
                method: 'POST',
                path: '/otc/quotes',
                data: {
                    "fromCoin": _from,
                    "toCoin": _to,
                    "size": _size
                }
            });
            const res = await req;
            return await res.result;
        } catch (e) {
            console.error(`Something went wrong ${e}`);
        }
    }

    /**
     * Get information about the swap you want to do
     * @param {number} _id QuoteID of the order
     * @returns 
     */
    async getQuoteInfo(_id) {
        try {
            const req = this.FTXConnection.request({
                method: 'GET',
                path: '/otc/quotes/' + _id
            });
            const res = await req;
            return await res.result;
        } catch (e) {
            console.error(`Something went wrong ${e}`);
        }
    }

    /**
     * Accept the order
     * @param {number} _id QuoteID of the order
     * @returns 
     */
    async acceptQuote(_id) {
        try {
            const req = this.FTXConnection.request({
                method: 'POST',
                path: `/otc/quotes/${_id}/accept`
            });
            const res = await req;
            return await res.result;
        } catch (e) {
            console.error(`Something went wrong ${e}`);
        }
    }

    /**
     * FOR FUTURE CONTRACTS
     */

    /**
     * Get the funding rate of a future contract
     * @param {*} _pair BTC-PERP
     * @returns 
     */
    async fundingRate(_pair) {
        try {
            let req = this.FTXConnection.request({
                method: 'GET',
                path: '/funding_rates',
                data: {
                    future: _pair
                }
            });
            const res = await req;
            return await res.result;
        } catch (e) {
            console.error(`Something went wrong ${e}`);
        }
    }
}

module.exports = FTXService;