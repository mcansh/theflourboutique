const express = require('express');

const orderController = require('../controllers/orderController');

const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/', (req, res) => {
  res.render('homepage', { title: 'Home' });
});

router.get('/order', orderController.orderForm);

router.post('/order', catchErrors(orderController.createOrder));

module.exports = router;
