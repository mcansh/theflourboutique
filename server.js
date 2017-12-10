import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { join } from 'path';

import manifest from './lib/manifest';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const PORT = process.env.PORT || 3000;
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    if (/^\/sw.js\/?$/.test(pathname)) {
      const filePath = join(__dirname, '.next', pathname);
      app.serveStatic(req, res, filePath);
    } else if (/^\/manifest(.json)?\/?$/.test(pathname)) {
      res.setHeader('Content-Type', 'application/json');
      res.end(manifest());
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`); // eslint-disable-line no-console
  });
});
