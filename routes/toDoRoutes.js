//Route to load arrays of to do items

const db = require('../models');

module.exports = function(app){
    //Get all Items
    app.get('/api/showList', function(req, res){
         db.Items.find({})
            .then(function(dbItems){
                res.json(dbItems);
            })
            .catch(function(err){
                res.json(err);
            });
    });

    //Adds new to do item to collections
     app.post('/api/addList', function(req, res){
        db.Items.create(req.body)
            .then(function(dbItems){
                res.json(dbItems)
            })
            .catch(function(err){
                res.json(err);
            });
     });

    //Delete item from toDo List
    app.delete('/api/deleteList/:index', function(req, res){
        let deleteIndex = parseFloat(req.params.index);
        
        db.Items.findOneAndRemove({'indexNum': deleteIndex})
            .then(function(dbItems){
                res.json(dbItems)
            })
            .catch(function(err){
                res.json(err)
            });
        
        //toDoList.splice(req.params.index, 1);
        //return true if successful
    });

}