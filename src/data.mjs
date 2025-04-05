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
}

export default DataAPI;
