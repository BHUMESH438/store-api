const express = require('express');
const { getallProductStatic, getallProduct } = require('../controllers/products');
const router = express.Router();

router.route('/').get(getallProduct);
router.route('/static').get(getallProductStatic);

module.exports = router;
