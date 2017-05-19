import Raven from 'raven-js';

function setupRaven() {
  if (location.origin !== 'localhost:7777') {
    Raven
      .config('https://e8b40de1cd484a9c81932cf111e9c83a@sentry.io/163976', {
        release: '0.0.2'
      })
      .install();
  }
}

export default setupRaven;
