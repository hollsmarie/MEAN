// require packages
const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

//connect to statement and use promise statement
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/1955');

//create database
var Schema = mongoose.Schema;

var TaskSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 3 },
    description: { type: String, required: true, minlength: 5},
    completed: { type: Boolean, required: true, default: false},
}, { timestamps: true })


mongoose.model('Task', TaskSchema) // We are setting this Schema in our Models as 'User'
var Task = mongoose.model('Task')


//use statements
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/static")));


//set statements
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');


//Routes
//1. Retrieves all tasks
app.get('/', function (req, res) {
    Task.find({}, function (err, tasks) {
        if (err) {
            console.log("Returned Error", err);
            res.json({message: "ERROR", error: err})
        }
        else {
            res.json({Tasks: tasks})
        }
    });
})


//2. Retrieves tasks by ID
app.get('/:id', function(req,res){
    Task.findOne({_id: req.params.id}, function(err, task){
        if(err)
        {
            res.json({error: err})
        }
        else
        {
            res.json({task})
        }
    })

})

//3. Creates a task
app.get('/new/:title/:description', function(req,res){
    var task = new Task({title: req.params.title, description: req.params.description})
    task.save(function(err){
        if(err)
        {
            res.json({error: err})
        }
        else
        {
            res.redirect('/')
        }
    })

})


//4. Update Task by ID
app.put('/:id/', function(req,res){
    task.update({_id: req.params.id},
        {
            title: req.body.title,
            description: req.body.description,
            complete: req.body.completed,
        },
    function(err){
        if(err)
        {
            res.json({error: err})
        }
        else
        {
            res.redirect('/')
        }
    })

})



//5. Delete task by ID
app.get('/remove/:id/', function(req,res){
    Task.remove({_id: req.params.id},function(err){
        if(err)
        {
            res.json({error:err})
        }
        else{
            res.redirect('/')
        }
    })

})





//server setup
app.listen(8000, function () {
    console.log("listening on port 8000");
});