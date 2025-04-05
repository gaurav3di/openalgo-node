/**
 * OpenAlgo REST API - Order Methods
 * https://docs.openalgo.in
 */

import BaseAPI from './base.mjs';

class OrderAPI extends BaseAPI {
    /**
     * Order management API methods for OpenAlgo.
     * Inherits from the BaseAPI class.
     */

    /**
     * Helper method to handle API responses
     * 
     * @param {Object} response - API response object
     * @returns {Object} Processed API response
     * @private
     */
    _handleResponse(response) {
        // This method would normally process responses, but in our case,
        // the base _post method already handles errors
        return response;
    }

    /**
     * Place an order with the given parameters.
     * 
     * @param {Object} params - Order parameters
     * @param {string} [params.strategy="NodeJS"] - The trading strategy name
     * @param {string} params.symbol - Trading symbol
     * @param {string} params.action - BUY or SELL
     * @param {string} params.exchange - Exchange code
     * @param {string} [params.priceType="MARKET"] - Type of price
     * @param {string} [params.product="MIS"] - Product type
     * @param {number|string} [params.quantity=1] - Quantity to trade
     * @param {Object} [params.otherParams] - Other optional parameters like:
     *   - price: Required for LIMIT orders
     *   - triggerPrice: Required for SL and SL-M orders
     *   - disclosedQuantity: Disclosed quantity
     *   - target: Target price
     *   - stopLoss: Stoploss price
     *   - trailingSl: Trailing stoploss points
     * @returns {Promise<Object>} JSON response from the API
     */
    async placeOrder({ 
        strategy = "NodeJS", 
        symbol, 
        action, 
        exchange, 
        priceType = "MARKET", 
        product = "MIS",
        quantity = 1, 
        price,
        triggerPrice,
        ...otherParams
    }) {
        const url = `${this.baseUrl}placeorder`;
        
        // Build the base payload
        const payload = {
            apikey: this.apiKey,
            strategy,
            symbol,
            action,
            exchange,
            pricetype: priceType,
            product,
            quantity: String(quantity)
        };
        
        // Add price for LIMIT orders
        if (price !== undefined) {
            payload.price = String(price);
        }
        
        // Add trigger price for SL and SL-M orders
        if (triggerPrice !== undefined) {
            payload.trigger_price = String(triggerPrice);
        }
        
        // Add other parameters, converting any numeric values to strings
        for (const [key, value] of Object.entries(otherParams)) {
            if (value !== undefined && value !== null) {
                const apiKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
                payload[apiKey] = typeof value === 'number' ? String(value) : value;
            }
        }
        
        return this._post(url, payload);
    }

    /**
     * Place a "smart" order that considers existing positions.
     * 
     * @param {Object} params - Smart order parameters
     * @param {string} [params.strategy="NodeJS"] - The trading strategy name
     * @param {string} params.symbol - Trading symbol
     * @param {string} params.action - BUY or SELL
     * @param {string} params.exchange - Exchange code
     * @param {string} [params.priceType="MARKET"] - Type of price
     * @param {string} [params.product="MIS"] - Product type
     * @param {number|string} params.quantity - Quantity to trade
     * @param {number|string} params.positionSize - Target position size
     * @param {Object} [params.otherParams] - Other optional parameters
     * @returns {Promise<Object>} JSON response from the API
     */
    async placeSmartOrder({ 
        strategy = "NodeJS", 
        symbol, 
        action, 
        exchange, 
        priceType = "MARKET", 
        product = "MIS", 
        quantity, 
        positionSize,
        ...otherParams
    }) {
        const url = `${this.baseUrl}placesmartorder`;
        
        // Build the payload
        const payload = {
            apikey: this.apiKey,
            strategy,
            symbol,
            action,
            exchange,
            pricetype: priceType,
            product,
            quantity: String(quantity),
            position_size: String(positionSize)
        };
        
        // Add other parameters, converting any numeric values to strings
        for (const [key, value] of Object.entries(otherParams)) {
            if (value !== undefined && value !== null) {
                const apiKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
                payload[apiKey] = typeof value === 'number' ? String(value) : value;
            }
        }
        
        return this._post(url, payload);
    }

    /**
     * Place multiple orders simultaneously.
     * 
     * @param {Object} params - Basket order parameters
     * @param {string} [params.strategy="NodeJS"] - The trading strategy name
     * @param {Array<Object>} params.orders - List of order dictionaries
     * @returns {Promise<Object>} JSON response containing results for each order
     */
    async basketOrder({ strategy = "NodeJS", orders }) {
        const url = `${this.baseUrl}basketorder`;
        
        // Process orders to ensure all numeric values are strings
        const processedOrders = orders.map(order => {
            const processedOrder = {};
            for (const [key, value] of Object.entries(order)) {
                processedOrder[key] = typeof value === 'number' ? String(value) : value;
            }
            return processedOrder;
        });
        
        const payload = {
            apikey: this.apiKey,
            strategy,
            orders: processedOrders
        };
        
        return this._post(url, payload);
    }

    /**
     * Split a large order into multiple smaller orders.
     * 
     * @param {Object} params - Split order parameters
     * @param {string} [params.strategy="NodeJS"] - The trading strategy name
     * @param {string} params.symbol - Trading symbol
     * @param {string} params.action - BUY or SELL
     * @param {string} params.exchange - Exchange code
     * @param {number|string} params.quantity - Total quantity to trade
     * @param {number|string} params.splitSize - Size of each split order
     * @param {string} [params.priceType="MARKET"] - Type of price
     * @param {string} [params.product="MIS"] - Product type
     * @param {Object} [params.otherParams] - Other optional parameters
     * @returns {Promise<Object>} JSON response containing results for each split order
     */
    async splitOrder({ 
        strategy = "NodeJS", 
        symbol, 
        action, 
        exchange, 
        quantity, 
        splitSize, 
        priceType = "MARKET", 
        product = "MIS",
        ...otherParams
    }) {
        const url = `${this.baseUrl}splitorder`;
        
        // Build the payload
        const payload = {
            apikey: this.apiKey,
            strategy,
            symbol,
            action,
            exchange,
            quantity: String(quantity),
            splitsize: String(splitSize),
            pricetype: priceType,
            product
        };
        
        // Add other parameters, converting any numeric values to strings
        for (const [key, value] of Object.entries(otherParams)) {
            if (value !== undefined && value !== null) {
                const apiKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
                payload[apiKey] = typeof value === 'number' ? String(value) : value;
            }
        }
        
        return this._post(url, payload);
    }
    
    /**
     * Modify an existing order.
     * 
     * @param {Object} params - Order modification parameters
     * @param {string} params.orderId - Order ID to modify
     * @param {string} [params.strategy="NodeJS"] - The trading strategy name
     * @param {string} params.symbol - Trading symbol
     * @param {string} params.action - BUY or SELL
     * @param {string} params.exchange - Exchange code
     * @param {string} [params.priceType="LIMIT"] - Type of price
     * @param {string} params.product - Product type
     * @param {number|string} params.quantity - Quantity to trade
     * @param {number|string} params.price - New price
     * @param {number|string} [params.disclosedQuantity=0] - Disclosed quantity
     * @param {number|string} [params.triggerPrice=0] - Trigger price
     * @param {Object} [params.otherParams] - Other optional parameters
     * @returns {Promise<Object>} JSON response from the API
     */
    async modifyOrder({ 
        orderId, 
        strategy = "NodeJS", 
        symbol, 
        action, 
        exchange, 
        priceType = "LIMIT", 
        product, 
        quantity, 
        price,
        disclosedQuantity = 0,
        triggerPrice = 0,
        ...otherParams
    }) {
        const url = `${this.baseUrl}modifyorder`;
        
        // Build the base payload
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
            disclosed_quantity: String(disclosedQuantity),
            trigger_price: String(triggerPrice)
        };
        
        // Add other parameters, converting any numeric values to strings
        for (const [key, value] of Object.entries(otherParams)) {
            if (value !== undefined && value !== null) {
                const apiKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
                payload[apiKey] = typeof value === 'number' ? String(value) : value;
            }
        }
        
        return this._post(url, payload);
    }
    
    /**
     * Cancel an existing order.
     * 
     * @param {Object} params - Order cancellation parameters
     * @param {string} params.orderId - Order ID to cancel
     * @param {string} [params.strategy="NodeJS"] - The trading strategy name
     * @returns {Promise<Object>} JSON response from the API
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
     * Cancel all open orders.
     * 
     * @param {Object} [params] - Optional parameters
     * @param {string} [params.strategy="NodeJS"] - The trading strategy name
     * @returns {Promise<Object>} JSON response from the API
     */
    async cancelAllOrder({ strategy = "NodeJS" } = {}) {
        const url = `${this.baseUrl}cancelallorder`;
        
        const payload = {
            apikey: this.apiKey,
            strategy
        };
        
        return this._post(url, payload);
    }
    
    /**
     * Close all positions.
     * 
     * @param {Object} [params] - Optional parameters
     * @param {string} [params.strategy="NodeJS"] - The trading strategy name
     * @param {string} [params.product] - Product type to filter
     * @param {string} [params.symbolGroup] - Symbol group to filter
     * @returns {Promise<Object>} JSON response from the API
     */
    async closePosition({ strategy = "NodeJS", product, symbolGroup } = {}) {
        const url = `${this.baseUrl}closeposition`;
        
        const payload = {
            apikey: this.apiKey,
            strategy
        };
        
        if (product) {
            payload.product = product;
        }
        
        if (symbolGroup) {
            payload.symbolgroup = symbolGroup;
        }
        
        return this._post(url, payload);
    }
}

export default OrderAPI;
