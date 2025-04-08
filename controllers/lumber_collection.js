var lumber = require('../models/lumber');

// list of all Lumber
exports.lumber_list = async function(req, res) {
    try{
        theLumbers = await lumber.find();
        res.send(theLumbers);
    }
    catch(err){
        res.status(500);
        res.send(`{"error":${err}}`);
    }
};

// for a specific Lumber
exports.lumber_detail = async function(req, res){
    console.log("detail" + req.params.id)
    try{
        result = await lumber.findById(req.params.id);
        res.send(result);
    }
    catch(error){
        res.status(500);
        res.send(`{"error": document for id ${req.params.id} not found}`);
    }
};

//Handle Lumber create on POST.
exports.lumber_create_post = async function(req, res){
    console.log(req.body);
    let document = new lumber();
    document.lumber_type = req.body.lumber_type;
    document.cost = req.body.cost;
    document.length = req.body.length;
    try{
        let result = await document.save();
        res.send(result);
    }
    catch(err){
        res.status(500);
        res.send(`{"error":${err}}`);
    }
};

//Handle Lumber delete from on DELETE
exports.lumber_delete = function(req, res){
    res.send('Not Implemented: Lumber delete DELETE ' + req.params.id);
};

//Handle Costume update form on PUT
exports.lumber_update_put = function(req, res){
    res.send('Not Implemented: Lumber update PUT ' + req.params.id);
};

//VIEWS
//Handle a show all view
exports.lumber_view_all_Page = async function(req, res){
    try{
        theLumbers = await lumber.find();
        res.render('lumber', {title: 'Lumber Search Results',result: theLumbers});
    }
    catch(err){
        res.status(500);
        res.send(`{"error":${err}}`);
    }
};