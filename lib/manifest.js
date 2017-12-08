const { description } = require('../package.json');

module.exports = () => `
{
  "name": "The Flour Boutique",
  "short_name": "The Flour Boutique",
  "description": "${description}",
  "start_url": "/?homescreen=1",
  "background_color": "#feeeed",
  "theme_color": "#feeeed",
  "display": "standalone",
  "icons": [
    {
      "src": "/static/logo.svg",
      "sizes": "72x72 96x96 128x128 144x144 256x256 512x512"
    }
  ]
}
`;
