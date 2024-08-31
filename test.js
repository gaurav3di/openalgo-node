const OpenAlgo = require('./openalgo');

// Replace with your actual API key and host URL
const apiKey = 'your_api_key_here';
const host = 'http://127.0.0.1:5000'; // Example host value

const openalgo = new OpenAlgo(apiKey, host);

async function placeOrderTest() {
    try {
        const order = await openalgo.placeOrder({
            strategy: 'Test Strategy',
            symbol: 'RELIANCE',
            action: 'BUY',
            exchange: 'NSE',
            priceType: 'MARKET',
            product: 'MIS',
            quantity: 1
        });

        console.log('Order Response:', order);
    } catch (error) {
        console.error('Error placing order:', error);
    }
}

placeOrderTest();