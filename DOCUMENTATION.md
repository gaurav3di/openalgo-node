# OpenAlgo Node.js Library Documentation

## Get the OpenAlgo API Key

Make sure that your OpenAlgo Application is running. Login to the OpenAlgo Application with valid credentials and get the OpenAlgo API key.
For detailed function parameters, refer to the [API Documentation](https://docs.openalgo.in/api-documentation/v1).

## Getting Started with OpenAlgo

First, import the OpenAlgo class from the library and initialize it with your API key:

```javascript
import OpenAlgo from 'openalgo';

// Replace 'YOUR_API_KEY' with your actual API key
// Specify the host URL with your hosted domain or ngrok domain.
// If running locally in Windows then use the default host value.
const openalgo = new OpenAlgo('YOUR_API_KEY', 'http://127.0.0.1:5000');
```

## Check OpenAlgo Version

```javascript
import { version } from 'openalgo';
console.log(version);
```

## PlaceOrder Example

To place a new order:

```javascript
const response = await openalgo.placeOrder({
    strategy: "NodeJS",
    symbol: "RELIANCE", 
    action: "BUY",
    exchange: "NSE",
    pricetype: "MARKET",
    product: "MIS",
    quantity: 1
});
console.log(response);
```

## PlaceSmartOrder Example

To place a smart order considering the current position size:

```javascript
const response = await openalgo.placeSmartOrder({
    strategy: "NodeJS",
    symbol: "TATAMOTORS",
    action: "SELL",
    exchange: "NSE",
    pricetype: "MARKET",
    product: "MIS",
    quantity: 1,
    positionSize: 5
});
console.log(response);
```

## BasketOrder Example

To place a new basket order:

```javascript
const basketOrders = [
    {
        symbol: "RELIANCE",
        exchange: "NSE",
        action: "BUY",
        quantity: 1,
        pricetype: "MARKET",
        product: "MIS"
    },
    {
        symbol: "INFY",
        exchange: "NSE",
        action: "SELL",
        quantity: 1,
        pricetype: "MARKET",
        product: "MIS"
    }
];

const response = await openalgo.basketOrder({
    strategy: "NodeJS",
    orders: basketOrders
});
console.log(response);
```

## SplitOrder Example

To place a new split order:

```javascript
const response = await openalgo.splitOrder({
    symbol: "YESBANK",
    exchange: "NSE",
    action: "SELL",
    quantity: 105,
    splitSize: 20,
    pricetype: "MARKET",
    product: "MIS",
    strategy: "NodeJS"
});
console.log(response);
```

## ModifyOrder Example

To modify an existing order:

```javascript
const response = await openalgo.modifyOrder({
    orderId: "123456789",
    strategy: "NodeJS",
    symbol: "INFY",
    action: "SELL",
    exchange: "NSE",
    pricetype: "LIMIT",
    product: "CNC",
    quantity: 2,
    price: 1900
});
console.log(response);
```

## CancelOrder Example

To cancel an existing order:

```javascript
const response = await openalgo.cancelOrder({
    orderId: "123456789",
    strategy: "NodeJS"
});
console.log(response);
```

## CancelAllOrder Example

To cancel all open orders and trigger pending orders:

```javascript
const response = await openalgo.cancelAllOrder({
    strategy: "NodeJS"
});
console.log(response);
```

## ClosePosition Example

To close all open positions across various exchanges:

```javascript
const response = await openalgo.closePosition({
    strategy: "NodeJS"
});
console.log(response);
```

## OrderStatus Example

To get the current order status:

```javascript
const response = await openalgo.orderStatus({
    orderId: "123456789",
    strategy: "NodeJS"
});
console.log(response);
```

## OpenPosition Example

To get the current open position:

```javascript
const response = await openalgo.openPosition({
    strategy: "NodeJS",
    symbol: "YESBANK",
    exchange: "NSE",
    product: "CNC"
});
console.log(response);
```

## Quotes Example

To get real-time quotes:

```javascript
const response = await openalgo.quotes({
    symbol: "RELIANCE", 
    exchange: "NSE"
});
console.log(response);
```

## Depth Example

To get market depth data:

```javascript
const response = await openalgo.depth({
    symbol: "SBIN", 
    exchange: "NSE"
});
console.log(response);
```

## History Example

To get historical data:

```javascript
const response = await openalgo.history({
    symbol: "SBIN",
    exchange: "NSE",
    interval: "5m",
    startDate: "2025-01-01",
    endDate: "2025-01-05"
});
console.log(response);
```

## Intervals Example

To get supported time intervals:

```javascript
const response = await openalgo.intervals();
console.log(response);
```

## Symbol Example

To get symbol information:

```javascript
const response = await openalgo.symbol({
    symbol: "RELIANCE",
    exchange: "NSE"
});
console.log(response);
```

## Funds Example

To get account funds information:

```javascript
const response = await openalgo.funds();
console.log(response);
```

## OrderBook Example

To get the order book:

```javascript
const response = await openalgo.orderbook();
console.log(response);
```

## TradeBook Example

To get the trade book:

```javascript
const response = await openalgo.tradebook();
console.log(response);
```

## PositionBook Example

To get the position book:

```javascript
const response = await openalgo.positionbook();
console.log(response);
```

## Holdings Example

To get holdings:

```javascript
const response = await openalgo.holdings();
console.log(response);
```

## Analyzer Status Example

To get analyzer status:

```javascript
const response = await openalgo.analyzerstatus();
console.log(response);
```

## Analyzer Toggle Example

To toggle analyzer mode (simulated/live trading):

```javascript
// Enable analyze mode (simulated trading)
const response = await openalgo.analyzertoggle({ mode: true });
console.log(response);

// Disable analyze mode (live trading)
const response = await openalgo.analyzertoggle({ mode: false });
console.log(response);
```

## Expiry Example

To get expiry dates for options/futures:

```javascript
const response = await openalgo.expiry({
    symbol: "NIFTY",
    exchange: "NFO",
    instrumenttype: "options"  // or "futures"
});
console.log(response);
```

## Search Example

To search for symbols:

```javascript
const response = await openalgo.search({
    query: "NIFTY 25000 JUL CE",
    exchange: "NFO"
});
console.log(response);
```

## WebSocket - LTP Streaming Example

To stream real-time Last Traded Price:

```javascript
import OpenAlgo from 'openalgo';

const client = new OpenAlgo(
    'YOUR_API_KEY',
    'http://127.0.0.1:5000',
    'v1',
    'ws://127.0.0.1:8765'
);

const instruments = [
    { exchange: "NSE", symbol: "RELIANCE" },
    { exchange: "NSE", symbol: "INFY" }
];

function onLTP(data) {
    console.log("LTP Update:", data);
}

async function streamLTP() {
    await client.connect();
    client.subscribe_ltp(instruments, onLTP);

    // Listen for 60 seconds
    await new Promise(resolve => setTimeout(resolve, 60000));

    client.unsubscribe_ltp(instruments);
    client.disconnect();
}

streamLTP();
```

## WebSocket - Quote Streaming Example

To stream real-time Quote data:

```javascript
const instruments = [
    { exchange: "NSE", symbol: "SBIN" },
    { exchange: "NSE", symbol: "TCS" }
];

function onQuote(data) {
    console.log("Quote Update:", data);
}

async function streamQuote() {
    await client.connect();
    client.subscribe_quote(instruments, onQuote);

    await new Promise(resolve => setTimeout(resolve, 60000));

    client.unsubscribe_quote(instruments);
    client.disconnect();
}

streamQuote();
```

## WebSocket - Market Depth Streaming Example

To stream real-time Market Depth (order book):

```javascript
const instruments = [
    { exchange: "NSE", symbol: "HDFCBANK" }
];

function onDepth(data) {
    console.log("Market Depth Update:", data);
}

async function streamDepth() {
    await client.connect();
    client.subscribe_depth(instruments, onDepth);

    await new Promise(resolve => setTimeout(resolve, 60000));

    client.unsubscribe_depth(instruments);
    client.disconnect();
}

streamDepth();
```

Please refer to the documentation and consult the API reference for details on optional parameters:
- [API Documentation](https://docs.openalgo.in/api-documentation/v1)
- [Order Constants](https://docs.openalgo.in/api-documentation/v1/order-constants)