/**
 * This file scan cloudFunctions directory and exports all versions of each function
 */

const glob = require('glob');

// path where to find all reconciliators
const cloudFunctionPath = './reconciliators/';

// exported functions
const toExports = {};

// map env versions to create for each function
const functionsSuffixes = ['development', 'staging', 'production'];

const files = glob.sync(`${cloudFunctionPath}/*.js`);

for (const file of files) {
  const func = require(file);

  if (func.reconciliator && typeof func.reconciliator === 'function') {
    const cleanFunctionName = file
      .replace(cloudFunctionPath, '')
      .replace('.js', '');
    for (const suffix of functionsSuffixes) {
      toExports[`${cleanFunctionName}_${suffix}`] = func.reconciliator;
    }
  }
}

module.exports = toExports;
