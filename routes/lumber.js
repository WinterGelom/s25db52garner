var express = require('express');
const lumber_controlers=require("../controllers/lumber_collection")
var router = express.Router();

const secured = (req, res, next) => {
  if(req.user){
    return next();
  }
  res.redirect("/login");
}
/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('lumber', { title: 'Search Results Lumber' });
});*/

// GET Lumbers
router.get('/', lumber_controlers.lumber_view_all_Page);
router.get('/detail', lumber_controlers.lumber_view_one_Page);
router.get('/create', lumber_controlers.lumber_create_Page);
router.get('/update', secured, lumber_controlers.lumber_update_Page);
router.get('/delete', lumber_controlers.lumber_delete_Page);
module.exports = router;
