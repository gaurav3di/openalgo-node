/**
 * OpenAlgo Node.js Library - ES Module version
 * https://docs.openalgo.in
 */

import OrderAPIClass from './orders.mjs';
import DataAPIClass from './data.mjs';
import AccountAPIClass from './account.mjs';
import StrategyClass from './strategy.mjs';

/**
 * OpenAlgo API client class that combines OrderAPI, DataAPI, and AccountAPI
 */
class OpenAlgo extends OrderAPIClass {
    constructor(apiKey, host = "http://127.0.0.1:5000", version = "v1") {
        super(apiKey, host, version);
        
        // Initialize the other API interfaces
        this._dataAPI = new DataAPIClass(apiKey, host, version);
        this._accountAPI = new AccountAPIClass(apiKey, host, version);
    }

    // Data API methods
    quotes(params) { return this._dataAPI.quotes(params); }
    depth(params) { return this._dataAPI.depth(params); }
    symbol(params) { return this._dataAPI.symbol(params); }
    history(params) { return this._dataAPI.history(params); }
    intervals() { return this._dataAPI.intervals(); }
    
    // Account API methods
    funds() { return this._accountAPI.funds(); }
    orderbook() { return this._accountAPI.orderbook(); }
    tradebook() { return this._accountAPI.tradebook(); }
    positionbook() { return this._accountAPI.positionbook(); }
    holdings() { return this._accountAPI.holdings(); }
}

// Named exports
export const OrderAPI = OrderAPIClass;
export const DataAPI = DataAPIClass;
export const AccountAPI = AccountAPIClass;
export const Strategy = StrategyClass;
export const version = "1.0.3";

// Default export
export default OpenAlgo;
