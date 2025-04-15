var express = require('express');
const lumber_controlers=require("../controllers/lumber_collection")
var router = express.Router();

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('lumber', { title: 'Search Results Lumber' });
});*/

// GET Lumbers
router.get('/', lumber_controlers.lumber_view_all_Page);
router.get('/detail', lumber_controlers.lumber_view_one_Page);
module.exports = router;
