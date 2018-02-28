import Router from 'next/router';

const redirect = ({ ctx, url = '/', type = 302 }) => {
  if (ctx && ctx.res) {
    const { res } = ctx;
    res.writeHead(type, {
      Location: url,
    });
    res.end();
    res.finished = true;
  } else {
    Router.replace(url);
  }
  return {};
};

export default redirect;
