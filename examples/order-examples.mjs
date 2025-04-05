/**
 * OpenAlgo Node.js Library - Order API Examples (ES Module Version)
 */

// Use ES Module import syntax
import OpenAlgo from '../src/index.mjs';

// Create an instance with your API key
const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
const openalgo = new OpenAlgo(apiKey);

// Examples of using the Order API

// 1. Place a simple market order
async function placeMarketOrder() {
    try {
        const order = await openalgo.placeOrder({
            symbol: 'RELIANCE',
            exchange: 'NSE',
            action: 'BUY',
            quantity: 50
            // Default values will be used for strategy, priceType, and product
        });
        console.log('Market Order:', JSON.stringify(order, null, 2));
        return order;
    } catch (error) {
        console.error('Error placing market order:', error.message);
    }
}

// 2. Place a limit order
async function placeLimitOrder() {
    try {
        const order = await openalgo.placeOrder({
            symbol: 'RELIANCE',
            exchange: 'NSE',
            action: 'BUY',
            quantity: 50,
            priceType: 'LIMIT',
            price: 2500,
            product: 'MIS'
        });
        console.log('Limit Order:', JSON.stringify(order, null, 2));
        return order;
    } catch (error) {
        console.error('Error placing limit order:', error.message);
    }
}

// 3. Place a "smart" order (considering existing positions)
async function placeSmartOrder() {
    try {
        const order = await openalgo.placeSmartOrder({
            symbol: 'RELIANCE',
            exchange: 'NSE',
            action: 'BUY',
            quantity: 50,
            positionSize: 100  // Target position size
        });
        console.log('Smart Order:', JSON.stringify(order, null, 2));
        return order;
    } catch (error) {
        console.error('Error placing smart order:', error.message);
    }
}

// 4. Place a basket order (multiple orders at once)
async function placeBasketOrder() {
    try {
        const order = await openalgo.basketOrder({
            orders: [
                {
                    symbol: 'RELIANCE',
                    exchange: 'NSE',
                    action: 'BUY',
                    quantity: 50,
                    product: 'MIS'
                },
                {
                    symbol: 'INFY',
                    exchange: 'NSE',
                    action: 'BUY',
                    quantity: 100,
                    product: 'MIS'
                }
            ]
        });
        console.log('Basket Order:', JSON.stringify(order, null, 2));
        return order;
    } catch (error) {
        console.error('Error placing basket order:', error.message);
    }
}

// 5. Split a large order into smaller chunks
async function placeSplitOrder() {
    try {
        const order = await openalgo.splitOrder({
            symbol: 'RELIANCE',
            exchange: 'NSE',
            action: 'BUY',
            quantity: 500,
            splitSize: 100
        });
        console.log('Split Order:', JSON.stringify(order, null, 2));
        return order;
    } catch (error) {
        console.error('Error placing split order:', error.message);
    }
}

// 6. Modify an existing order
async function modifyOrder() {
    // First place an order to get an order ID
    const originalOrder = await placeLimitOrder();
    
    if (originalOrder && originalOrder.data && originalOrder.data.orderid) {
        try {
            // Wait a moment to make sure the order is registered
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const modifiedOrder = await openalgo.modifyOrder({
                orderId: originalOrder.data.orderid,
                symbol: 'RELIANCE',
                exchange: 'NSE',
                action: 'BUY',
                quantity: 75,  // Increase quantity
                price: 2495,   // Lower the price
                priceType: 'LIMIT',
                product: 'MIS',
                disclosedQuantity: 50,
                triggerPrice: 0
            });
            console.log('Modified Order:', JSON.stringify(modifiedOrder, null, 2));
            return modifiedOrder;
        } catch (error) {
            console.error('Error modifying order:', error.message);
        }
    } else {
        console.log('No order ID available to modify');
    }
}

// 7. Cancel an order
async function cancelOrder() {
    // First place an order to get an order ID
    const originalOrder = await placeLimitOrder();
    
    if (originalOrder && originalOrder.data && originalOrder.data.orderid) {
        try {
            // Wait a moment to make sure the order is registered
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const cancelResult = await openalgo.cancelOrder({
                orderId: originalOrder.data.orderid
            });
            console.log('Cancel Order Result:', JSON.stringify(cancelResult, null, 2));
            return cancelResult;
        } catch (error) {
            console.error('Error canceling order:', error.message);
        }
    } else {
        console.log('No order ID available to cancel');
    }
}

// 8. Cancel all open orders
async function cancelAllOrders() {
    try {
        const result = await openalgo.cancelAllOrder({ strategy: "NodeJS" });
        console.log('Cancel All Orders Result:', JSON.stringify(result, null, 2));
        return result;
    } catch (error) {
        console.error('Error canceling all orders:', error.message);
    }
}

// 9. Close all positions
async function closeAllPositions() {
    try {
        const result = await openalgo.closePosition();
        console.log('Close All Positions Result:', JSON.stringify(result, null, 2));
        return result;
    } catch (error) {
        console.error('Error closing positions:', error.message);
    }
}

// Helper function to delay execution
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Execute selected examples sequentially
async function runSelectedExamples() {
    console.log('====== Running Order API Examples ======');
    
    try {
        console.log('\n----- Placing Market Order -----');
        await placeMarketOrder();
        await delay(2000); // Wait to avoid rate limiting
        
        console.log('\n----- Placing Limit Order -----');
        await placeLimitOrder();
        await delay(2000); // Wait to avoid rate limiting
        
        console.log('\n----- Placing Smart Order -----');
        await placeSmartOrder();
        await delay(2000); // Wait to avoid rate limiting
        
        console.log('\n----- Placing Basket Order -----');
        await placeBasketOrder();
        await delay(2000); // Wait to avoid rate limiting
        
        console.log('\n----- Placing Split Order -----');
        await placeSplitOrder();
        await delay(2000); // Wait to avoid rate limiting
        
        // Only run these if you want to test cancellation
        // Note: These examples depend on having successful orders placed
        console.log('\n----- Canceling All Orders -----');
        await cancelAllOrders();
        await delay(2000); // Wait to avoid rate limiting
        
        // Note: This will close all existing positions - use with caution
        // console.log('\n----- Closing All Positions -----');
        // await closeAllPositions();
    } catch (error) {
        console.error(`Error in order examples: ${error.message}`);
    } finally {
        console.log('\n====== Order API Examples Completed ======');
    }
}

// Run the examples
runSelectedExamples().catch(error => {
    console.error('Error running examples:', error);
});
