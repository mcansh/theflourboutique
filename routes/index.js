const express = require('express');

const orderController = require('../controllers/orderController');
const priceController = require('../controllers/priceController');

const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/', (req, res) => {
  res.render('homepage', { title: 'Home' });
});
router.get('/order', orderController.orderForm);
router.post('/order', catchErrors(orderController.createOrder));
router.get('/prices', priceController.prices);

module.exports = router;
