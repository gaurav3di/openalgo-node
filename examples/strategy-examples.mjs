/**
 * OpenAlgo Node.js Library - Strategy Examples (ES Module Version)
 */

// Use ES Module import syntax
import { Strategy } from '../src/index.mjs';

// Create an instance with host URL and webhook ID
const hostUrl = 'http://127.0.0.1:5000'; // Replace with your actual host URL
const webhookId = 'YOUR_WEBHOOK_ID';     // Replace with your actual webhook ID
const strategy = new Strategy(hostUrl, webhookId);

// Examples of using the Strategy module

// 1. Send a simple BUY strategy order
async function sendBuyOrder() {
    try {
        const result = await strategy.strategyOrder({
            symbol: 'WIPRO',
            action: 'BUY'
        });
        console.log('Strategy BUY Order Sent:', JSON.stringify(result, null, 2));
        return result;
    } catch (error) {
        console.error('Error sending strategy BUY order:', error.message);
    }
}

// 2. Send a simple SELL strategy order
async function sendSellOrder() {
    try {
        const result = await strategy.strategyOrder({
            symbol: 'RELIANCE',
            action: 'SELL'
        });
        console.log('Strategy SELL Order Sent:', JSON.stringify(result, null, 2));
        return result;
    } catch (error) {
        console.error('Error sending strategy SELL order:', error.message);
    }
}

// 3. Send a strategy order with position size (for BOTH mode)
async function sendOrderWithPositionSize() {
    try {
        const result = await strategy.strategyOrder({
            symbol: 'NHPC',
            action: 'BUY',
            positionSize: 100
        });
        console.log('Strategy Order with Position Size Sent:', JSON.stringify(result, null, 2));
        return result;
    } catch (error) {
        console.error('Error sending strategy order with position size:', error.message);
    }
}

// Helper function to delay execution
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Execute examples sequentially
async function runExamples() {
    console.log('====== Running Strategy Examples ======');
    
    console.log('\n----- Sending BUY Order -----');
    await sendBuyOrder();
    
    // Add a delay between requests
    await delay(2000);
    
    console.log('\n----- Sending SELL Order -----');
    await sendSellOrder();
    
    // Add a delay between requests
    await delay(2000);
    
    console.log('\n----- Sending Order with Position Size -----');
    await sendOrderWithPositionSize();
    
    console.log('\n====== Strategy Examples Completed ======');
}

// Run the examples if this file is executed directly
runExamples().catch(error => {
    console.error('Error running examples:', error);
});
