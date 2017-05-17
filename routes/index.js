const express = require('express');

const router = express.Router();

// Do work here
router.get('/', (req, res) => {
  res.render('homepage', { title: 'Home' });
});

router.get('/order', (req, res) => {
  res.render('order', { title: 'Order' });
});

module.exports = router;
