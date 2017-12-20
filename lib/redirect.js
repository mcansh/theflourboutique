import Router from 'next/router';

const redirect = ({ res, url, type = '302' }) => {
  if (res) {
    res.writeHead(type, {
      Location: url,
    });
    res.end();
    res.finished = true;
  } else {
    Router.replace(url);
  }
};

export default redirect;
