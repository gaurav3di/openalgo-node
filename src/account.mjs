/**
 * OpenAlgo REST API - Account Methods
 * https://docs.openalgo.in
 */

import BaseAPI from './base.mjs';

class AccountAPI extends BaseAPI {
    /**
     * Account management API methods for OpenAlgo.
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
     * Get funds and margin details of the connected trading account.
     * 
     * @returns {Promise<Object>} JSON response containing funds data
     */
    async funds() {
        const url = `${this.baseUrl}funds`;
        const payload = {
            apikey: this.apiKey
        };
        return this._post(url, payload);
    }

    /**
     * Get orderbook details from the broker with basic orderbook statistics.
     * 
     * @returns {Promise<Object>} JSON response containing orders data
     */
    async orderbook() {
        const url = `${this.baseUrl}orderbook`;
        const payload = {
            apikey: this.apiKey
        };
        return this._post(url, payload);
    }

    /**
     * Get tradebook details from the broker.
     * 
     * @returns {Promise<Object>} JSON response containing trades data
     */
    async tradebook() {
        const url = `${this.baseUrl}tradebook`;
        const payload = {
            apikey: this.apiKey
        };
        return this._post(url, payload);
    }

    /**
     * Get positionbook details from the broker.
     * 
     * @returns {Promise<Object>} JSON response containing positions data
     */
    async positionbook() {
        const url = `${this.baseUrl}positionbook`;
        const payload = {
            apikey: this.apiKey
        };
        return this._post(url, payload);
    }

    /**
     * Get holdings details from the broker with basic holdings statistics.
     * 
     * @returns {Promise<Object>} JSON response containing holdings data
     */
    async holdings() {
        const url = `${this.baseUrl}holdings`;
        const payload = {
            apikey: this.apiKey
        };
        return this._post(url, payload);
    }
}

export default AccountAPI;
