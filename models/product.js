const { default: mongoose } = require('mongoose');
const monggose = require('mongoose');

const productschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'product name should not be empty']
  },
  price: {
    type: Number,
    required: [true, 'product price should not be empty']
  },
  featured: {
    type: String,
    default: false
  },
  rating: {
    type: Number,
    default: 4.5
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  company: {
    type: String,
    enum: { values: ['ikea', 'liddy', 'caressa', 'marcos'], message: '{VALUE} is not supported' }
  }
});

module.exports = mongoose.model('Product', productschema);
