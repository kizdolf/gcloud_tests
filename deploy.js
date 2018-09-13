/**
 * scan cloudFunctions directory, create func names, topic names, env vars for each function founded.
 * Then deploy them.
 *
 * Functions are scaned the same way (yeah, duplicated code) and exported by index.js
 */

const glob = require('glob');

const process = require('child_process');

// path where to find all reconciliators
const cloudFunctionPath = './cloudFunctions/';

// array that will contains all finals functions name
const functions = [];

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
      functions.push({
        name: `${cleanFunctionName}_${suffix}`,
        topic: `reconciliator_${cleanFunctionName}_${suffix}`,
        source: file,
        env: suffix.toUpperCase(),
      });
    }
  }
}

for (const f of functions) {
  console.log(
    `\n --- Deploying ${f.name} on topic reconciliator_${f.name} \n\n `,
  );

  const shString = `/home/jburet/google-cloud-sdk/bin/gcloud beta functions deploy ${
    f.name
  } --trigger-topic=reconciliator_${f.name} --set-env-vars ENV=${
    f.env
  } --runtime nodejs8 --source=.`;

  process.exec(shString, (err, stdout, stderr) => {
    console.log(err, stdout, stderr);
  });
}
