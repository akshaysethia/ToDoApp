let bodyParser = require('body-parser');
let mongoose = require('mongoose');

// mongoDb connection with database name given here
mongoose.connect("mongodb+srv://admin:Acerf900@todo-6srie.mongodb.net/ToDo", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
console.log("Connected To DataBase");

// Creating the Schema, basically the blueprint about the data being stored
let todoSchema = new mongoose.Schema({ item: String });

// Creating the collection name now, with schema type for safety
let ToDo = mongoose.model('items', todoSchema);

let urlEncodedParser = bodyParser.urlencoded({ extended: false });

// Contains all the routing and all the logics
module.exports = function (app) {

    app.get('/todo', function (req, res) {
        // get data from database and pass to view
        ToDo.find({}, function (err, data) {
            if (err) throw err;
            res.render('todo', { todo: data });
        });
    });

    app.post('/todo', urlEncodedParser, function (req, res) {
        // get data from the view and add to mongoDB
        ToDo(req.body).save(function (err, data) {
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function (req, res) {
        // Delete the req item from mongoDB
        ToDo.deleteOne({ item: req.params.item.replace(/\-/g, " ") }, function(err, data) {
            if (err) throw err;
            res.json(data);
        });
    });

};