/**
 * OpenAlgo Analyzer API Examples
 * Demonstrates analyzer status and toggle functionality
 */

import OpenAlgo from '../src/index.mjs';

// Create an instance with your API key
const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
const openalgo = new OpenAlgo(apiKey);

// Examples of using the Analyzer API

async function analyzerStatusExample() {
    console.log('\n=== Analyzer Status Example ===');

    try {
        const response = await openalgo.analyzerstatus();
        console.log('Analyzer Status Response:');
        console.log(JSON.stringify(response, null, 2));
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function analyzerToggleExample() {
    console.log('\n=== Analyzer Toggle Example ===');

    try {
        // Enable analyzer mode
        console.log('\n--- Enabling Analyzer Mode ---');
        const enableResponse = await openalgo.analyzertoggle({ mode: true });
        console.log('Enable Response:');
        console.log(JSON.stringify(enableResponse, null, 2));

        // Disable analyzer mode
        console.log('\n--- Disabling Analyzer Mode ---');
        const disableResponse = await openalgo.analyzertoggle({ mode: false });
        console.log('Disable Response:');
        console.log(JSON.stringify(disableResponse, null, 2));
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Helper function to delay execution
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Execute all examples sequentially
async function runSelectedExamples() {
    console.log('====== Running Analyzer API Examples ======');

    console.log('\n----- Analyzer Status -----');
    await analyzerStatusExample();

    // Add a delay to avoid rate limiting
    console.log('\nWaiting 2 seconds to avoid rate limiting...');
    await delay(2000);

    console.log('\n----- Analyzer Toggle -----');
    await analyzerToggleExample();

    console.log('\n====== Analyzer API Examples Completed ======');
}

// Run the examples
runSelectedExamples().catch(error => {
    console.error('Error running examples:', error);
});
