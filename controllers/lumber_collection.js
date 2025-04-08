var lumber = require('../models/lumber');

// list of all Lumber
exports.lumber_list = function(req, res) {
    res.send('Not Implemented: Lumber list');
};

// for a specific Lumber
exports.lumber_detail = function(req, res){
    res.send('Not Implemented: Lumber detail: ' + req.params.id);
};

//Handle Lumber create on POST.
exports.lumber_create_post = function(req, res){
    res.send('Not Implemented: Lumber create POST');
};

//Handle Lumber delete from on DELETE
exports.lumber_delete = function(req, res){
    res.send('Not Implemented: Lumber delete DELETE ' + req.params.id);
};

//Handle Costume update form on PUT
exports.lumber_update_put = function(req, res){
    res.send('Not Implemented: Lumber update PUT ' + req.params.id);
};