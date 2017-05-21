const express = require('express');

const orderController = require('../controllers/orderController');
const priceController = require('../controllers/priceController');
const userController = require('../controllers/userController');

const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/', (req, res) => {
  res.render('homepage', { title: 'Home' });
});
router.get('/order', orderController.orderForm);
router.post('/order', catchErrors(orderController.createOrder));
router.get('/orders', catchErrors(orderController.allOrders));
router.get('/prices', priceController.prices);

router.get('/login', userController.login);

module.exports = router;
