
var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("rendering login ");
  res.render('../public/index.html', { title: 'Logistics' });
});


module.exports = router;
