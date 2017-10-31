const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { join } = require('path');

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
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`); // eslint-disable-line no-console
  });
});
