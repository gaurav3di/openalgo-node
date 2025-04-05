/**
 * OpenAlgo Node.js Library - Example Runner for ES Modules
 * 
 * This script runs examples for the OpenAlgo Node.js library.
 * Usage: node examples/run-examples.mjs [all|data|order|account|strategy]
 */

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import * as dataExamples from './data-examples.mjs';
import * as orderExamples from './order-examples.mjs';
import * as accountExamples from './account-examples.mjs';
import * as strategyExamples from './strategy-examples.mjs';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper function to delay execution
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function runExamples(type) {
  try {
    console.log(`\n====== Running ${type.toUpperCase()} Examples ======\n`);
    
    switch (type.toLowerCase()) {
      case 'data':
        await dataExamples.runSelectedExamples();
        break;
      case 'order':
        await orderExamples.runSelectedExamples();
        break;
      case 'account':
        await accountExamples.runSelectedExamples();
        break;
      case 'strategy':
        await strategyExamples.runSelectedExamples();
        break;
      case 'all':
        console.log('==== Running All Example Categories ====\n');
        
        console.log('1. Data API Examples:');
        await dataExamples.runSelectedExamples();
        await delay(2000); // Pause between categories
        
        console.log('\n2. Order API Examples:');
        await orderExamples.runSelectedExamples();
        await delay(2000); // Pause between categories
        
        console.log('\n3. Account API Examples:');
        await accountExamples.runSelectedExamples();
        await delay(2000); // Pause between categories
        
        console.log('\n4. Strategy API Examples:');
        await strategyExamples.runSelectedExamples();
        
        console.log('\n==== All Examples Completed ====');
        break;
      default:
        console.log('Invalid example type. Use: all, data, order, account, or strategy');
        break;
    }
  } catch (error) {
    console.error(`Error running examples: ${error.message}`);
  }
}

// Get example type from command line argument
const exampleType = process.argv[2] || 'all';
runExamples(exampleType);
