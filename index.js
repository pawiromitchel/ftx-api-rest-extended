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
            const req = this.FTXConnection.request({
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

    /**
     * This will calculate the order size based on the portfolio balance
     * @param {number} _sizeInPercentage how big the order has to be in percentage
     * @param {string} _pair ETH-PERP or BTC-PERP
     */
    async calculateOrderSize(_sizeInPercentage, _pair) {
        try {
            const { freeCollateral } = await this.getBalance();
            const { price } = await this.getPrice(_pair)
            // calculate the asset amount size of the order based on the percentage given by the user
            const size = ((_sizeInPercentage / 100) * freeCollateral) / price;
            return size;
        } catch (e) {
            console.error(`Something went wrong ${e}`);
        }
    }

    /**
     * Place your market or limit order
     * @param {number} _size size of the order
     * @param {string} _pair the future contract name
     * @param {string} _side buy or sell
     * @param {string} _type market (default) or limit order
     * @param {string} _price specify if it's a limit order
     * @returns 
     */
    async createOrder(_size, _pair, _side, _type = 'market', _price = null) {
        try {
            const req = this.FTXConnection.request({
                method: 'POST',
                path: '/orders',
                data: {
                    market: _pair,
                    size: _size,
                    side: _side,
                    type: _type,
                    price: _price
                }
            });
            const res = await req;
            return await res.result;
        } catch (e) {
            console.error(`Something went wrong ${e}`);
        }
    }

    /**
     * Get all open positions
     * @returns an array of the opened orders
     */
    async getOpenPositions() {
        try {
            const req = this.FTXConnection.request({
                method: 'GET',
                path: '/positions',
                data: {
                    showAvgPrice: true
                }
            });

            const res = await req;
            const onlyPositionsWithSize = res.result.filter(pos => pos.size !== 0);
            return onlyPositionsWithSize;
        } catch (e) {
            console.error(`Something went wrong ${e}`);
        }
    }

    /**
     * Get all open limit orders
     * @returns an array of the limit orders
     */
    async getLimitOrders() {
        try {
            const req = this.FTXConnection.request({
                method: 'GET',
                path: '/orders'
            });

            const res = await req;
            return res.result;
        } catch (e) {
            console.error(`Something went wrong ${e}`);
        }
    }

    /**
     * Close all orders or of a specific pair
     * @param {string} _pair orders of the specific asset to close
     */
    async closeOrders(_pair = '') {
        try {
            const positions = await this.getOpenPositions();
            if (_pair) positions = positions.filter(position => position.future.toLowerCase().includes(_pair.toLowerCase()))

            if (positions.length > 0) {
                positions.map(position => this.createOrder(position.size, position.future, position.side === 'buy' ? 'sell' : 'buy'))
            } else {
                console.log('No open orders');
            }
        } catch (e) {
            console.error(`Something went wrong ${e}`);
        }
    }

    /**
     * Close all limit orders or of a specific pair
     * @param {string} _pair orders of the specific asset to close
     * @returns 
     */
    async closeLimitOrders(_pair = '') {
        try {
            const request = {
                method: 'DELETE',
                path: '/orders'
            }
            if (_pair) request.data = { market: _pair }

            const req = this.FTXConnection.request(request);
            const res = await req;
            return res.result;
        } catch (e) {
            console.error(`Something went wrong ${e}`);
        }
    }
}

module.exports = FTXService;