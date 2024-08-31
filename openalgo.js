const axios = require('axios');

class OpenAlgo {
    /**
     * Initialize the OpenAlgo object with an API key, and optionally a host URL and API version.
     * 
     * @param {string} apiKey - User's API key.
     * @param {string} [host="http://127.0.0.1:5000"] - Base URL for the API endpoints. Defaults to localhost.
     * @param {string} [version="v1"] - API version. Defaults to "v1".
     */
    constructor(apiKey, host = "http://127.0.0.1:5000", version = "v1") {
        this.apiKey = apiKey;
        this.baseUrl = `${host}/api/${version}/`;
        this.headers = {
            'Content-Type': 'application/json'
        };
    }

    /**
     * Place an order with the given parameters.
     */
    async placeOrder({ strategy = "NodeJS", symbol, action, exchange, priceType = "MARKET", product = "MIS", quantity = 1, ...rest }) {
        const url = `${this.baseUrl}placeorder`;
        const payload = {
            apikey: this.apiKey,
            strategy,
            symbol,
            action,
            exchange,
            pricetype: priceType,
            product,
            quantity: String(quantity),
            ...rest
        };
        return this._post(url, payload);
    }

    /**
     * Place a smart order with the given parameters.
     */
    async placeSmartOrder({ strategy = "NodeJS", symbol, action, exchange, priceType = "MARKET", product = "MIS", quantity = 1, positionSize, ...rest }) {
        const url = `${this.baseUrl}placesmartorder`;
        const payload = {
            apikey: this.apiKey,
            strategy,
            symbol,
            action,
            exchange,
            pricetype: priceType,
            product,
            quantity: String(quantity),
            position_size: String(positionSize),
            ...rest
        };
        return this._post(url, payload);
    }

    /**
     * Modify an existing order.
     */
    async modifyOrder({ orderId, strategy = "NodeJS", symbol, action, exchange, priceType = "LIMIT", product, quantity, price, ...rest }) {
        const url = `${this.baseUrl}modifyorder`;
        const payload = {
            apikey: this.apiKey,
            orderid: orderId,
            strategy,
            symbol,
            action,
            exchange,
            pricetype: priceType,
            product,
            quantity: String(quantity),
            price: String(price),
            ...rest
        };
        return this._post(url, payload);
    }

    /**
     * Cancel an existing order.
     */
    async cancelOrder({ orderId, strategy = "NodeJS" }) {
        const url = `${this.baseUrl}cancelorder`;
        const payload = {
            apikey: this.apiKey,
            orderid: orderId,
            strategy
        };
        return this._post(url, payload);
    }

    /**
     * Close all open positions for a given strategy.
     */
    async closePosition({ strategy = "NodeJS" }) {
        const url = `${this.baseUrl}closeposition`;
        const payload = {
            apikey: this.apiKey,
            strategy
        };
        return this._post(url, payload);
    }

    /**
     * Cancel all orders for a given strategy.
     */
    async cancelAllOrder({ strategy = "NodeJS" }) {
        const url = `${this.baseUrl}cancelallorder`;
        const payload = {
            apikey: this.apiKey,
            strategy
        };
        return this._post(url, payload);
    }

    /**
     * Internal method to make POST requests.
     */
    async _post(url, payload) {
        try {
            const response = await axios.post(url, payload, { headers: this.headers });
            return response.data;
        } catch (error) {
            console.error(`Error making POST request to ${url}:`, error);
            throw error;
        }
    }
}

module.exports = OpenAlgo;