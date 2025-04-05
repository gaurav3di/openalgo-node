# OpenAlgo Node.js Library

A modern Node.js library for the OpenAlgo API, providing comprehensive access to algorithmic trading functionality for Indian markets. This library follows the same structure and functionality as the official OpenAlgo Python library.

## Installation

Install the package using npm:

```bash
npm install openalgo
```

## Library Structure

The OpenAlgo Node.js library is organized into modular components:

- **BaseAPI**: Core functionality for API authentication and communication
- **DataAPI**: Methods for accessing market data (quotes, depth, historical data)
- **OrderAPI**: Comprehensive order management capabilities
- **AccountAPI**: Account information and portfolio management
- **Strategy**: TradingView integration for strategy execution

## Usage Examples

### Main API

The OpenAlgo class combines all API functionalities into one convenient interface:

```javascript
// Default import
import OpenAlgo from 'openalgo';

// Named imports for specific components
import { OrderAPI, DataAPI, AccountAPI, Strategy } from 'openalgo';

// Initialize with your API key
const openalgo = new OpenAlgo('YOUR_API_KEY');

// Use methods from any API group
async function main() {
  // Get real-time quotes
  const quotes = await openalgo.quotes({ symbol: 'RELIANCE', exchange: 'NSE' });
  console.log(quotes);
  
  // Place an order
  const order = await openalgo.placeOrder({
    symbol: 'RELIANCE',
    exchange: 'NSE',
    action: 'BUY',
    quantity: 50
  });
  console.log(order);
  
  // Get account information
  const funds = await openalgo.funds();
  console.log(funds);
}

main().catch(console.error);
```

### Using Individual API Components

You can also use each API component separately:

```javascript
import { OrderAPI, DataAPI, AccountAPI, Strategy } from 'openalgo';

// Initialize individual components
const dataAPI = new DataAPI('YOUR_API_KEY');
const orderAPI = new OrderAPI('YOUR_API_KEY');

// Use specific API methods
async function getData() {
  const historicalData = await dataAPI.history({
    symbol: 'RELIANCE',
    exchange: 'NSE',
    interval: '5m',  // 5-minute candles
    startDate: '2025-01-01',
    endDate: '2025-01-05'
  });
  console.log(historicalData);
}
```

### Strategy Module for TradingView

```javascript
import { Strategy } from 'openalgo';

// Initialize strategy with host URL and webhook ID
const strategy = new Strategy('http://127.0.0.1:5000', 'YOUR_WEBHOOK_ID');

// Send strategy orders from TradingView alerts
async function executeStrategy() {
  const result = await strategy.strategyOrder({
    symbol: 'RELIANCE',
    exchange: 'NSE',  // Explicitly specifying NSE exchange
    action: 'BUY',
    positionSize: 100  // Optional, for BOTH mode
  });
  console.log(result);
}
```

## API Reference and Examples

This section provides detailed examples for each component of the OpenAlgo API. All examples are provided in both CommonJS and ES Module formats.

### DataAPI

Provides methods for accessing financial market data through OpenAlgo's REST API.

#### Getting Real-Time Quotes

```javascript
import OpenAlgo from 'openalgo';
const openalgo = new OpenAlgo('YOUR_API_KEY');

// Get real-time quotes
async function getQuotes() {
  try {
    const quotes = await openalgo.quotes({ 
      symbol: 'RELIANCE', 
      exchange: 'NSE' 
    });
    console.log('Quotes:', quotes);
    // Sample response:
    // {
    //   data: {
    //     ask: 2350.1,
    //     bid: 2349.8,
    //     high: 2360.0,
    //     low: 2340.5,
    //     ltp: 2350.0,
    //     open: 2345.0,
    //     prev_close: 2344.5,
    //     volume: 3521908
    //   },
    //   status: 'success'
    // }
  } catch (error) {
    console.error('Error fetching quotes:', error.message);
  }
}
```

#### Getting Market Depth

```javascript
async function getMarketDepth() {
  try {
    const depth = await openalgo.depth({ 
      symbol: 'RELIANCE', 
      exchange: 'NSE' 
    });
    console.log('Market Depth:', depth);
    // Shows order book with multiple price levels for bids and asks
  } catch (error) {
    console.error('Error fetching market depth:', error.message);
  }
}
```

#### Getting Symbol Information

```javascript
async function getSymbolInfo() {
  try {
    const symbolInfo = await openalgo.symbol({ 
      symbol: 'RELIANCE', 
      exchange: 'NSE' 
    });
    console.log('Symbol Information:', symbolInfo);
    // Contains details like token, lot size, tick size, etc.
  } catch (error) {
    console.error('Error fetching symbol info:', error.message);
  }
}
```

#### Getting Historical Data

```javascript
async function getHistoricalData() {
  try {
    // Calculate dates for data range
    const endDate = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 5); // 5 days ago
    const formattedStartDate = startDate.toISOString().split('T')[0];
    
    const history = await openalgo.history({ 
      symbol: 'RELIANCE', 
      exchange: 'NSE',
      interval: 'D',  // Daily candles (use '1m', '5m', '15m', '1h', etc. for intraday)
      startDate: formattedStartDate,
      endDate: endDate
    });
    console.log('Historical Data:', history);
    // Returns array of OHLCV candles with timestamps
  } catch (error) {
    console.error('Error fetching historical data:', error.message);
  }
}
```

#### Getting Supported Time Intervals

```javascript
async function getSupportedIntervals() {
  try {
    const intervals = await openalgo.intervals();
    console.log('Supported Intervals:', intervals);
    // Returns available timeframes categorized by minutes, hours, days, etc.
  } catch (error) {
    console.error('Error fetching intervals:', error.message);
  }
}
```

### OrderAPI

Comprehensive order management capabilities for trading.

#### Placing a Market Order

```javascript
async function placeMarketOrder() {
  try {
    const order = await openalgo.placeOrder({
      symbol: 'RELIANCE',
      exchange: 'NSE',
      action: 'BUY',  // or 'SELL'
      quantity: 50,
      pricetype: 'MARKET',
      product: 'MIS',  // or 'CNC' for delivery
      strategy: 'MyStrategy'  // Tag for identifying orders
    });
    console.log('Market Order:', order);
    // Returns order ID and status
  } catch (error) {
    console.error('Error placing market order:', error.message);
  }
}
```

#### Placing a Limit Order

```javascript
async function placeLimitOrder() {
  try {
    const order = await openalgo.placeOrder({
      symbol: 'RELIANCE',
      exchange: 'NSE',
      action: 'BUY',
      quantity: 50,
      pricetype: 'LIMIT',
      price: 2350.0,  // Limit price
      product: 'MIS',
      strategy: 'MyStrategy'
    });
    console.log('Limit Order:', order);
  } catch (error) {
    console.error('Error placing limit order:', error.message);
  }
}
```

#### Placing a Smart Order (Considers Current Position)

```javascript
async function placeSmartOrder() {
  try {
    const order = await openalgo.placeSmartOrder({
      symbol: 'RELIANCE',
      exchange: 'NSE',
      action: 'BUY',  // or 'SELL' or 'BOTH'
      quantity: 50,   // Used for BUY/SELL
      positionSize: 100, // Used for BOTH mode
      pricetype: 'MARKET',
      product: 'MIS',
      strategy: 'MyStrategy'
    });
    console.log('Smart Order:', order);
  } catch (error) {
    console.error('Error placing smart order:', error.message);
  }
}
```

#### Placing Multiple Orders (Basket Order)

```javascript
async function placeBasketOrder() {
  try {
    const basketResult = await openalgo.basketOrder({
      strategy: 'MyStrategy',
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
    console.log('Basket Order Result:', basketResult);
    // Returns status for each order in the basket
  } catch (error) {
    console.error('Error placing basket order:', error.message);
  }
}
```

#### Splitting Large Orders

```javascript
async function placeSplitOrder() {
  try {
    const splitResult = await openalgo.splitOrder({
      symbol: 'RELIANCE',
      exchange: 'NSE',
      action: 'BUY',
      quantity: 1000,
      splitSize: 100,  // Split into orders of 100 shares each
      pricetype: 'MARKET',
      product: 'MIS',
      strategy: 'MyStrategy'
    });
    console.log('Split Order Result:', splitResult);
    // Returns array of order results
  } catch (error) {
    console.error('Error placing split order:', error.message);
  }
}
```

#### Cancelling Orders

```javascript
async function cancelOrders() {
  // Cancel a specific order
  try {
    const cancelResult = await openalgo.cancelOrder({
      orderId: 'YOUR_ORDER_ID'
    });
    console.log('Cancel Order Result:', cancelResult);
  } catch (error) {
    console.error('Error cancelling order:', error.message);
  }
  
  // Cancel all orders from a strategy
  try {
    const cancelAllResult = await openalgo.cancelAllOrder({
      strategy: 'MyStrategy'
    });
    console.log('Cancel All Orders Result:', cancelAllResult);
  } catch (error) {
    console.error('Error cancelling all orders:', error.message);
  }
}
```

#### Closing All Positions

```javascript
async function closePositions() {
  try {
    const closeResult = await openalgo.closePosition({
      strategy: 'MyStrategy'  // Optional: close positions for specific strategy
    });
    console.log('Close Positions Result:', closeResult);
  } catch (error) {
    console.error('Error closing positions:', error.message);
  }
}
```

### AccountAPI

Access to account information and portfolio details.

#### Getting Account Funds

```javascript
async function getAccountFunds() {
  try {
    const funds = await openalgo.funds();
    console.log('Account Funds:', funds);
    // Returns available cash, margins, used margin, etc.
  } catch (error) {
    console.error('Error fetching account funds:', error.message);
  }
}
```

#### Getting Order Book

```javascript
async function getOrderBook() {
  try {
    const orderbook = await openalgo.orderbook();
    console.log('Order Book:', orderbook);
    // Returns all orders with status and details
  } catch (error) {
    console.error('Error fetching order book:', error.message);
  }
}
```

#### Getting Trade Book

```javascript
async function getTradeBook() {
  try {
    const tradebook = await openalgo.tradebook();
    console.log('Trade Book:', tradebook);
    // Returns executed trades with price, time, etc.
  } catch (error) {
    console.error('Error fetching trade book:', error.message);
  }
}
```

#### Getting Position Book

```javascript
async function getPositionBook() {
  try {
    const positions = await openalgo.positionbook();
    console.log('Position Book:', positions);
    // Returns open positions with quantity, P&L, etc.
  } catch (error) {
    console.error('Error fetching position book:', error.message);
  }
}
```

#### Getting Holdings

```javascript
async function getHoldings() {
  try {
    const holdings = await openalgo.holdings();
    console.log('Holdings:', holdings);
    // Returns stocks held in demat account with valuation
  } catch (error) {
    console.error('Error fetching holdings:', error.message);
  }
}
```

### Strategy Module for TradingView

Integrates with TradingView for strategy execution via webhooks.

```javascript
import { Strategy } from 'openalgo';

// Initialize strategy with host URL and webhook ID
const strategy = new Strategy('http://127.0.0.1:5000', 'YOUR_WEBHOOK_ID');

// Send strategy order from TradingView alerts
async function executeStrategyOrder() {
  try {
    const result = await strategy.strategyOrder({
      symbol: 'RELIANCE',
      action: 'BUY',  // or 'SELL' or 'BOTH' or 'EXIT'
      positionSize: 100,  // Optional, for BOTH mode
      quantity: 50,       // Optional, for specific size
      exchange: 'NSE',    // Using NSE exchange for Indian equities
      product: 'MIS'      // Optional trading product type
    });
    console.log('Strategy Order Result:', result);
  } catch (error) {
    console.error('Error executing strategy order:', error.message);
  }
}
```

## Running the Examples

The library includes comprehensive example files that demonstrate all functionality:

- `data-examples.mjs`: Demonstrates all data API functionality
- `order-examples.mjs`: Shows various order placement and management options
- `account-examples.mjs`: Illustrates account information retrieval
- `strategy-examples.mjs`: Examples of TradingView strategy integration

### Running All Examples

```bash
npm run examples
```

### Running Specific Examples

```bash
npm run example:data
npm run example:order
npm run example:account
npm run example:strategy
```

Or run the examples directly:

```bash
node examples/run-examples.mjs data
node examples/run-examples.mjs order
node examples/run-examples.mjs account
node examples/run-examples.mjs strategy
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.
