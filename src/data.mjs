/**
 * OpenAlgo REST API - Data Methods
 * https://docs.openalgo.in
 */

import BaseAPI from './base.mjs';

class DataAPI extends BaseAPI {
    /**
     * Data API methods for OpenAlgo.
     * Inherits from the BaseAPI class.
     */

    /**
     * Handle API response with retry logic
     * 
     * @param {Object} response - API response
     * @param {number} [maxRetries=3] - Maximum number of retries
     * @param {number} [retryDelay=1000] - Delay between retries in milliseconds
     * @returns {Promise<Object>} Processed API response
     * @private
     */
    async _handleResponse(response, maxRetries = 3, retryDelay = 1000) {
        let retries = 0;
        
        // This is a placeholder for handling responses with retry logic
        // In a real implementation, this would need to be integrated with the axios request
        return response;
    }

    /**
     * Get real-time quotes for a symbol.
     * 
     * @param {Object} params - Request parameters
     * @param {string} params.symbol - Trading symbol
     * @param {string} params.exchange - Exchange code
     * @returns {Promise<Object>} JSON response containing quote data
     */
    async quotes({ symbol, exchange }) {
        const url = `${this.baseUrl}quotes/`;
        const payload = {
            apikey: this.apiKey,
            symbol,
            exchange
        };
        return this._post(url, payload);
    }

    /**
     * Get market depth (order book) for a symbol.
     * 
     * @param {Object} params - Request parameters
     * @param {string} params.symbol - Trading symbol
     * @param {string} params.exchange - Exchange code
     * @returns {Promise<Object>} JSON response containing depth data
     */
    async depth({ symbol, exchange }) {
        const url = `${this.baseUrl}depth/`;
        const payload = {
            apikey: this.apiKey,
            symbol,
            exchange
        };
        return this._post(url, payload);
    }

    /**
     * Get symbol details and information.
     * 
     * @param {Object} params - Request parameters
     * @param {string} params.symbol - Trading symbol
     * @param {string} params.exchange - Exchange code
     * @returns {Promise<Object>} JSON response containing symbol information
     */
    async symbol({ symbol, exchange }) {
        const url = `${this.baseUrl}symbol`;
        const payload = {
            apikey: this.apiKey,
            symbol,
            exchange
        };
        return this._post(url, payload);
    }

    /**
     * Get historical candle data for a symbol.
     * 
     * @param {Object} params - Request parameters
     * @param {string} params.symbol - Trading symbol
     * @param {string} params.exchange - Exchange code
     * @param {string} params.interval - Time interval (e.g., "1m", "5m", "1h", "1d")
     * @param {string} [params.startDate] - Start date (format: "YYYY-MM-DD")
     * @param {string} [params.endDate] - End date (format: "YYYY-MM-DD")
     * @param {number} [params.count] - Number of candles to return
     * @returns {Promise<Array>} Array of candle data
     */
    async history({ symbol, exchange, interval, startDate, endDate, count }) {
        const url = `${this.baseUrl}history/`;
        
        const payload = {
            apikey: this.apiKey,
            symbol,
            exchange,
            interval
        };
        
        if (startDate) {
            payload.start_date = startDate;
        }
        
        if (endDate) {
            payload.end_date = endDate;
        }
        
        if (count) {
            payload.count = String(count);
        }
        
        const response = await this._post(url, payload);
        
        if (response.status === 'success' && response.data) {
            return response.data;
        } else {
            return response; // Return the error response
        }
    }

    /**
     * Get supported time intervals for historical data.
     *
     * @returns {Promise<Object>} JSON response containing available intervals
     */
    async intervals() {
        const url = `${this.baseUrl}intervals`;
        const payload = {
            apikey: this.apiKey
        };
        return this._post(url, payload);
    }

    /**
     * Get expiry dates for a symbol.
     *
     * @param {Object} params - Request parameters
     * @param {string} params.symbol - Trading symbol (e.g., "NIFTY", "BANKNIFTY")
     * @param {string} params.exchange - Exchange code (e.g., "NFO")
     * @param {string} params.instrumenttype - Instrument type ("options" or "futures")
     * @returns {Promise<Object>} JSON response containing expiry dates
     * @example
     * const response = await client.expiry({
     *     symbol: "NIFTY",
     *     exchange: "NFO",
     *     instrumenttype: "options"
     * });
     * console.log(response);
     * // Output: { status: 'success', data: ['10-JUL-25', '17-JUL-25', ...], message: 'Found 18 expiry dates...' }
     */
    async expiry({ symbol, exchange, instrumenttype }) {
        const url = `${this.baseUrl}expiry`;
        const payload = {
            apikey: this.apiKey,
            symbol,
            exchange,
            instrumenttype
        };
        return this._post(url, payload);
    }

    /**
     * Search for symbols matching a query.
     *
     * @param {Object} params - Request parameters
     * @param {string} params.query - Search query (e.g., "NIFTY 25000 JUL CE")
     * @param {string} params.exchange - Exchange code (e.g., "NFO", "NSE")
     * @returns {Promise<Object>} JSON response containing matching symbols
     * @example
     * const response = await client.search({
     *     query: "NIFTY 25000 JUL CE",
     *     exchange: "NFO"
     * });
     * console.log(response);
     * // Output: { status: 'success', data: [{symbol: 'NIFTY17JUL2525000CE', ...}], message: 'Found 6 matching symbols' }
     */
    async search({ query, exchange }) {
        const url = `${this.baseUrl}search`;
        const payload = {
            apikey: this.apiKey,
            query,
            exchange
        };
        return this._post(url, payload);
    }
}

export default DataAPI;
