const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/1955');

var Schema = mongoose.Schema;

var BirthdaySchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    // birthday: { type: Int, required: true, minlength: 4 }
}, { timestamps: true })


mongoose.model('Birthday', BirthdaySchema) // We are setting this Schema in our Models as 'User'
var Birthday = mongoose.model('Birthday')

//use statements
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/static")));

//set statements
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');



//Routes
app.get('/', function (req, res) {
    Birthday.find({}, function (err, birthdays) {
        if (err) {
            console.log("Returned Error", err);
            res.json({message: "ERROR", error: err})
        }
        else {
            res.json({PeopleBornIn1955: birthdays})
        }
    });
})

app.get('/new/:name/', function(req,res){
    var birthday = new Birthday({name: req.params.name})
    birthday.save(function(err){
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


app.get('/remove/:name/', function(req,res){
    Birthday.remove({name: req.params.name},function(err){
        if(err)
        {
            res.json({error:err})
        }
        else{
            res.redirect('/')
        }
    })

})

app.get('/:name', function(req,res){
    Birthday.findOne({name: req.params.name}, function(err, birthday){
        if(err)
        {
            res.json({error: err})
        }
        else
        {
            res.json({birthday})
        }
    })

})




app.listen(8000, function () {
    console.log("listening on port 8000");
});