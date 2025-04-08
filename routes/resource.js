var express = require('express');
var router = express.Router();

//Require controller modules
var api_controller = require('../controllers/api');
var lumber_controller = require('../controllers/lumber_collection');

/// API Route ///

// GET resources base.
router.get('/', api_controller.api);

/// Lumber Routes ///

// POST request for creating a Lumber.
router.post('/lumber', lumber_controller.lumber_create_post);

// DELETE request to delete Lumber.
router.delete('/lumber/:id', lumber_controller.lumber_delete);

// PUT request to update Lumber
router.put('/lumber/:id', lumber_controller.lumber_update_put);

//GET request for one Lumber
router.get('/lumber/:id', lumber_controller.lumber_detail);

//GET request for list of all Lumber items.
router.get('/lumber', lumber_controller.lumber_list);

module.exports = router;