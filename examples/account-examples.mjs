/**
 * OpenAlgo Node.js Library - Account API Examples (ES Module Version)
 */

// Use ES Module import syntax
import OpenAlgo from '../src/index.mjs';

// Create an instance with your API key
const apiKey = 'fc2862f7bbf782d2f5907730002dcf582fddc807280753646b3bfa239966c91b'; // Replace with your actual API key
const openalgo = new OpenAlgo(apiKey);

// Examples of using the Account API

// 1. Get account funds
async function getFunds() {
    try {
        const funds = await openalgo.funds();
        console.log('Account Funds:', JSON.stringify(funds, null, 2));
        return funds;
    } catch (error) {
        console.error('Error getting funds:', error.message);
    }
}

// 2. Get orderbook
async function getOrderbook() {
    try {
        const orderbook = await openalgo.orderbook();
        console.log('Orderbook:', JSON.stringify(orderbook, null, 2));
        return orderbook;
    } catch (error) {
        console.error('Error getting orderbook:', error.message);
    }
}

// 3. Get tradebook
async function getTradebook() {
    try {
        const tradebook = await openalgo.tradebook();
        console.log('Tradebook:', JSON.stringify(tradebook, null, 2));
        return tradebook;
    } catch (error) {
        console.error('Error getting tradebook:', error.message);
    }
}

// 4. Get positionbook
async function getPositionbook() {
    try {
        const positionbook = await openalgo.positionbook();
        console.log('Positionbook:', JSON.stringify(positionbook, null, 2));
        return positionbook;
    } catch (error) {
        console.error('Error getting positionbook:', error.message);
    }
}

// 5. Get holdings
async function getHoldings() {
    try {
        const holdings = await openalgo.holdings();
        console.log('Holdings:', JSON.stringify(holdings, null, 2));
        return holdings;
    } catch (error) {
        console.error('Error getting holdings:', error.message);
    }
}

// Helper function to delay execution
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Execute all examples sequentially
async function runAllExamples() {
    console.log('====== Running Account API Examples ======');
    
    console.log('\n----- Getting Funds -----');
    await getFunds();
    
    // Add a delay to avoid rate limiting
    console.log('\nWaiting 2 seconds to avoid rate limiting...');
    await delay(2000);
    
    console.log('\n----- Getting Orderbook -----');
    await getOrderbook();
    
    // Add a delay to avoid rate limiting
    console.log('\nWaiting 2 seconds to avoid rate limiting...');
    await delay(2000);
    
    console.log('\n----- Getting Tradebook -----');
    await getTradebook();
    
    // Add a delay to avoid rate limiting
    console.log('\nWaiting 2 seconds to avoid rate limiting...');
    await delay(2000);
    
    console.log('\n----- Getting Positionbook -----');
    await getPositionbook();
    
    // Add a delay to avoid rate limiting
    console.log('\nWaiting 2 seconds to avoid rate limiting...');
    await delay(2000);
    
    console.log('\n----- Getting Holdings -----');
    await getHoldings();
    
    console.log('\n====== Account API Examples Completed ======');
}

// Run the examples
runAllExamples().catch(error => {
    console.error('Error running examples:', error);
});
