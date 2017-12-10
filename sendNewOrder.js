// ran on graphcool after an order is created
/* eslint-disable */
const postmark = require('postmark');

const client = new postmark.Client('');

module.exports = event => {
  const name = event.data.Order.node.name;
  const email = event.data.Order.node.email;
  const city = event.data.Order.node.city;
  const date = event.data.Order.node.date;
  const theme = event.data.Order.node.theme;
  const quantity = event.data.Order.node.quantity;
  const flavor = event.data.Order.node.flavor;
  const comments = event.data.Order.node.comments;

  const dateObj = new Date(date);
  const month = dateObj.toLocaleString('en-us', { month: 'long' });
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  const dateString = `${month} ${day}, ${year}`;

  client.sendEmailWithTemplate({
    From: '',
    TemplateId: 4199224,
    To: '',
    TemplateModel: {
      name,
      email,
      city,
      date: dateString,
      theme,
      quantity,
      flavor,
      comments,
    },
  });
};
/* eslint-enable */
