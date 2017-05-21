const mongoose = require('mongoose');

const Order = mongoose.model('Order');
const mail = require('../handlers/mail');

exports.orderForm = (req, res) => {
  res.render('order', { title: 'Order' });
};

exports.createOrder = async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  await mail.send({
    order,
    subject: 'New Cookie Order!',
    filename: 'new-order'
  });
  req.flash('success', 'Order successly received');
  res.redirect('/');
};

exports.allOrders = async (req, res) => {
  const orders = await Order.find();
  res.render('allOrders', { title: 'All Orders', orders });
};
