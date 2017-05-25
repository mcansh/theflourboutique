const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require('validator');

const orderSchema = new Schema({
  done: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please supply an email address'
  },
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true
  },
  city: {
    type: String,
    required: 'Please supply a city',
    trim: true
  },
  date: {
    type: Date,
    trim: true,
    required: 'Please supply a date for your event'
  },
  theme: {
    type: String,
    required: 'Please supply a theme',
    trim: true
  },
  quantity: {
    type: String,
    trim: true,
    required: 'Please supply a quantity'
  },
  flavor: {
    type: String,
    trim: true,
    required: 'Please supply a flavor'
  },
  comments: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model('Order', orderSchema);
