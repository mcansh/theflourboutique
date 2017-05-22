import Raven from 'raven-js';

function setupRaven() {
  if (location.origin !== 'localhost:7777') {
    Raven
      .config('https://2b010463aa1242ca8ecda627539c5338@sentry.io/170090', {
        release: '0.0.3-1'
      })
      .install();
  }
}

export default setupRaven;
