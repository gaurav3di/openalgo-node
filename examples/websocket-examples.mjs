/**
 * OpenAlgo WebSocket Examples
 * Demonstrates real-time data streaming using WebSocket
 */

import OpenAlgo from '../src/index.mjs';

// Create an instance with your API key
const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
const openalgo = new OpenAlgo(apiKey);

// Examples of using WebSocket for real-time data

async function ltpStreamExample() {
    console.log('\n=== LTP (Last Traded Price) Stream Example ===');

    try {
        // Connect to WebSocket
        console.log('Connecting to WebSocket...');
        await openalgo.connect();
        console.log('Connected successfully!\n');

        // Define instruments to subscribe
        const instruments = [
            { exchange: 'NSE', symbol: 'RELIANCE' },
            { exchange: 'NSE', symbol: 'INFY' }
        ];

        // Subscribe to LTP updates
        openalgo.subscribe_ltp(instruments, (data) => {
            console.log('LTP Update Received:');
            console.log(JSON.stringify(data, null, 2));
        });

        console.log('Listening for LTP updates for 10 seconds...\n');

        // Listen for 10 seconds
        await new Promise(resolve => setTimeout(resolve, 10000));

        // Unsubscribe and disconnect
        console.log('\nUnsubscribing and disconnecting...');
        openalgo.unsubscribe_ltp(instruments);
        openalgo.disconnect();
        console.log('Disconnected successfully!');

    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function quoteStreamExample() {
    console.log('\n=== Quote Stream Example ===');

    try {
        // Connect to WebSocket
        console.log('Connecting to WebSocket...');
        await openalgo.connect();
        console.log('Connected successfully!\n');

        // Define instruments to subscribe
        const instruments = [
            { exchange: 'NSE', symbol: 'RELIANCE' },
            { exchange: 'NSE', symbol: 'INFY' }
        ];

        // Subscribe to Quote updates
        openalgo.subscribe_quote(instruments, (data) => {
            console.log('Quote Update Received:');
            console.log(JSON.stringify(data, null, 2));
        });

        console.log('Listening for Quote updates for 10 seconds...\n');

        // Listen for 10 seconds
        await new Promise(resolve => setTimeout(resolve, 10000));

        // Unsubscribe and disconnect
        console.log('\nUnsubscribing and disconnecting...');
        openalgo.unsubscribe_quote(instruments);
        openalgo.disconnect();
        console.log('Disconnected successfully!');

    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function depthStreamExample() {
    console.log('\n=== Market Depth Stream Example ===');

    try {
        // Connect to WebSocket
        console.log('Connecting to WebSocket...');
        await openalgo.connect();
        console.log('Connected successfully!\n');

        // Define instruments to subscribe
        const instruments = [
            { exchange: 'NSE', symbol: 'RELIANCE' },
            { exchange: 'NSE', symbol: 'INFY' }
        ];

        // Subscribe to Market Depth updates
        openalgo.subscribe_depth(instruments, (data) => {
            console.log('Market Depth Update Received:');
            console.log(JSON.stringify(data, null, 2));
        });

        console.log('Listening for Market Depth updates for 10 seconds...\n');

        // Listen for 10 seconds
        await new Promise(resolve => setTimeout(resolve, 10000));

        // Unsubscribe and disconnect
        console.log('\nUnsubscribing and disconnecting...');
        openalgo.unsubscribe_depth(instruments);
        openalgo.disconnect();
        console.log('Disconnected successfully!');

    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Helper function to delay execution
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Execute all examples sequentially
async function runSelectedExamples() {
    console.log('====== Running WebSocket Examples ======');

    console.log('\n----- LTP Stream -----');
    await ltpStreamExample();

    // Add a delay between examples
    console.log('\nWaiting 2 seconds before next example...');
    await delay(2000);

    console.log('\n----- Quote Stream -----');
    await quoteStreamExample();

    // Add a delay between examples
    console.log('\nWaiting 2 seconds before next example...');
    await delay(2000);

    console.log('\n----- Market Depth Stream -----');
    await depthStreamExample();

    console.log('\n====== WebSocket Examples Completed ======');
}

// Run the examples
runSelectedExamples().catch(error => {
    console.error('Error running examples:', error);
});
