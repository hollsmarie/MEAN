const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

//connect to statement and use promise statement
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/RestfulTasksAPI');


//use statements
// app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/static")));
app.use(express.static( __dirname + '/RestfulTasksAPI/dist' ));


//set statements
app.set('views', path.join(__dirname, '/views'));

//create database
var Schema = mongoose.Schema;

var TaskSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 3 },
    description: { type: String, required: true, minlength: 5},
    completed: { type: Boolean, required: true, default: false},
}, { timestamps: true })


mongoose.model('Task', TaskSchema) // We are setting this Schema in our Models as 'User'
var Task = mongoose.model('Task')

app.listen(4200, function() {
    console.log("Tasks listening on port 4200");
})