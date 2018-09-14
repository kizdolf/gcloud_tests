/**
 * This function receive the payload from trackSale via a dedicated pubsub subscription
 * parse it, and publish the payload to matched reconciliator pubsub topic.
 */

const reconciliatorMap = new Map();
// add a line when creating a new reconciliator
reconciliatorMap.set('additionalProducts', 'theaterConcession');

// the env will be already defined
const env = 'DEVELOPMENT';

// payload in the pubSub data
const payloadtest = {
  additionalProducts: [
    { type: 'CONCESSION', label: 'popcorn test', amount: 12 },
  ],
};

const main = payload => {
  for (const key in payload) {
    if (payload.hasOwnProperty(key)) {
      if (reconciliatorMap.has(key)) {
        const topic = `reconciliator_${reconciliatorMap.get(
          key,
        )}_${env.toLowerCase()}`;
        console.log('publish to ', topic);
      }
    }
  }
};

main(payloadtest);
