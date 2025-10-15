/**
 * OpenAlgo Node.js Library - Data API Examples (ES Module Version)
 */

// Use ES Module import syntax
import OpenAlgo from '../src/index.mjs';

// Create an instance with your API key
const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
const openalgo = new OpenAlgo(apiKey);

// Examples of using the Data API

// 1. Get real-time quotes
async function getQuotes() {
    try {
        const quotes = await openalgo.quotes({ 
            symbol: 'RELIANCE', 
            exchange: 'NSE' 
        });
        console.log('Quotes:', JSON.stringify(quotes, null, 2));
    } catch (error) {
        console.error('Error getting quotes:', error.message);
    }
}

// 2. Get market depth
async function getDepth() {
    try {
        const depth = await openalgo.depth({ 
            symbol: 'RELIANCE', 
            exchange: 'NSE' 
        });
        console.log('Market Depth:', JSON.stringify(depth, null, 2));
    } catch (error) {
        console.error('Error getting market depth:', error.message);
    }
}

// 3. Get symbol information
async function getSymbol() {
    try {
        const symbol = await openalgo.symbol({ 
            symbol: 'RELIANCE', 
            exchange: 'NSE' 
        });
        console.log('Symbol Information:', JSON.stringify(symbol, null, 2));
    } catch (error) {
        console.error('Error getting symbol information:', error.message);
    }
}

// 4. Get historical data
async function getHistory() {
    try {
        // Calculate dates for 5 days of data
        const endDate = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format
        
        // Start date 5 days ago
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 5);
        const formattedStartDate = startDate.toISOString().split('T')[0];
        
        const history = await openalgo.history({ 
            symbol: 'RELIANCE', 
            exchange: 'NSE',
            interval: 'D',  // Use 'D' instead of '1d' for daily data
            startDate: formattedStartDate,
            endDate: endDate
        });
        console.log('Historical Data:', JSON.stringify(history, null, 2));
    } catch (error) {
        console.error('Error getting historical data:', error.message);
    }
}

// 5. Get supported intervals
async function getIntervals() {
    try {
        const intervals = await openalgo.intervals();
        console.log('Supported Intervals:', JSON.stringify(intervals, null, 2));
    } catch (error) {
        console.error('Error getting supported intervals:', error.message);
    }
}

// 6. Get expiry dates
async function getExpiry() {
    try {
        const expiry = await openalgo.expiry({
            symbol: 'NIFTY',
            exchange: 'NFO',
            instrumenttype: 'options'
        });
        console.log('Expiry Dates:', JSON.stringify(expiry, null, 2));
    } catch (error) {
        console.error('Error getting expiry dates:', error.message);
    }
}

// 7. Search for symbols
async function searchSymbol() {
    try {
        const search = await openalgo.search({
            query: 'NIFTY 25000 OCT CE',
            exchange: 'NFO'
        });
        console.log('Search Results:', JSON.stringify(search, null, 2));
    } catch (error) {
        console.error('Error searching symbols:', error.message);
    }
}

// Helper function to delay execution
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Execute all examples sequentially
async function runAllExamples() {
    console.log('====== Running Data API Examples ======');
    
    console.log('\n----- Getting Quotes -----');
    await getQuotes();
    
    // Add a delay to avoid rate limiting
    console.log('\nWaiting 2 seconds to avoid rate limiting...');
    await delay(2000);
    
    console.log('\n----- Getting Market Depth -----');
    await getDepth();
    
    // Add a delay to avoid rate limiting
    console.log('\nWaiting 2 seconds to avoid rate limiting...');
    await delay(2000);
    
    console.log('\n----- Getting Symbol Information -----');
    await getSymbol();
    
    // Add a delay to avoid rate limiting
    console.log('\nWaiting 2 seconds to avoid rate limiting...');
    await delay(2000);
    
    console.log('\n----- Getting Historical Data -----');
    await getHistory();
    
    // Add a delay to avoid rate limiting
    console.log('\nWaiting 2 seconds to avoid rate limiting...');
    await delay(2000);
    
    console.log('\n----- Getting Supported Intervals -----');
    await getIntervals();

    // Add a delay to avoid rate limiting
    console.log('\nWaiting 2 seconds to avoid rate limiting...');
    await delay(2000);

    console.log('\n----- Getting Expiry Dates -----');
    await getExpiry();

    // Add a delay to avoid rate limiting
    console.log('\nWaiting 2 seconds to avoid rate limiting...');
    await delay(2000);

    console.log('\n----- Searching Symbols -----');
    await searchSymbol();

    console.log('\n====== Data API Examples Completed ======');
}

// Run the examples
runAllExamples().catch(error => {
    console.error('Error running examples:', error);
});
