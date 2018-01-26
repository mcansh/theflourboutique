import polka from 'polka';
import { parse } from 'url';
import next from 'next';
import { join } from 'path';

import manifest from './lib/manifest';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const PORT = process.env.PORT || 3000;
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = polka();

  server.get('/sw.js', (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;
    const filePath = join(__dirname, '.next', pathname);
    app.serveStatic(req, res, filePath);
  });

  server.get('/manifest.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(manifest());
  });

  server.get('*', (req, res) => handle(req, res));

  server
    .listen(PORT)
    .then(() => console.log(`> Ready on http://localhost:${PORT}`)); // eslint-disable-line no-console
});
