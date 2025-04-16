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
exports.lumber_delete = async function(req, res){
    console.log("delete " + req.params.id)
    try{
        result = await lumber.findByIdAndDelete(req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err){
        res.status(500)
        res.send(`{"error":Error deleting ${err}}`);
    }
};

//Handle Costume update form on PUT
exports.lumber_update_put = async function(req, res){
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
    try{
        let toUpdate = await lumber.findById(req.params.id);
        if(req.body.lumber_type){
            toUpdate.lumber_type = req.body.lumber_type;
        }
        if(req.body.cost){
            toUpdate.cost = req.body.cost;
        }
        if(req.body.length){
            toUpdate.length = req.body.length;
        }
        let result = await toUpdate.save();
        console.log("Success " + result);
        res.send(result);
    }
    catch{
        res.status(500);
        res.send(`{"error":${err}: Update for id ${req.params.id} failed}`);
    }
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
        res.send(`{"error":'${err}'}`);
    }
};

//Handle a show one view id specified by query
exports.lumber_view_one_Page = async function(req, res){
    console.log("single view for id" + req.query.id)
    try{
        result = await lumber.findById(req.query.id)
        res.render('lumberdetail', {title: 'Lumber Detail', toShow:result})
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

//Handle Building the view for creating a lumber
//No body, no in path parameter, no query.
// Does not need to be async
exports.lumber_create_Page = function(req, res){
    console.log("create view")
    try{
        res.render('lumbercreate', {title: 'Lumber Create'});
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`)
    }
};

//Handle building the view for updating a costume
//query provides the id
exports.lumber_update_Page = async function(req, res){
    console.log("update view for item " + req.query.id)
    try{
        let result = await lumber.findById(req.query.id)
        res.render('lumberupdate', {title: 'Lumber Update', toShow: result});
    }
    catch(err){
        res.status(500)
        res.send(`{'error':'${err}'}`);
    }
};