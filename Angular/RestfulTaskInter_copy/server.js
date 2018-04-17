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
app.use(express.static( __dirname + "/Practice/dist" ));


//set statements
app.set('views', path.join(__dirname, '/views'));


//CREATE
app.post("/addTask", function (req,res) {
    var task = new Task({title: req.body.title, description: req.body.description})
    task.save(function(err){
        if(err)
        {
            res.json({error: err})
        }
        else
        {
            res.json({task:task})
        }
    })

})


//READ
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

//READ
app.get('/tasks', function (req, res) {
    Task.find({}, function (err, tasks) {
        if (err) {
            console.log("Returned Error", err);
            res.json({message: "ERROR", error: err})
        }
        else {
            console.log("made it to server")
            res.json({tasks: tasks})
        }
    });
})


//READ
app.get('/viewtask/:id', function(req,res){
    Task.findOne({_id: req.params.id}, function(err, task){
        if(err)
        {
            res.json({error: err})
        }
        else
        {
            res.json({task:task})
        }
    })

})


//UPDATE
app.put('/viewtask/:id/', function(req,res){
    console.log('HIT UPDATE')
    Task.update({_id: req.params.id},
        {
            title: req.body.title,
            description: req.body.description,
        },
    function(err){
        if(err)
        {
            res.json({error: err})
        }
        else
        {
            res.json('success')
        }
    })

})



//DESTROY
app.delete('/viewtask/:id/', function(req,res){
    Task.remove({_id: req.params.id},function(err){
        if(err)
        {
            res.json({error:err})
        }
        else{
            res.json('success')
        }
    })

})


var server = app.listen(8000, function () {
    console.log("listening on port 8000");
});
