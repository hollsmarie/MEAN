var express = require("express");
var path = require("path");
var mongoose = require('mongoose');

var app = express();
var bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/basic_mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    age: Number
   })
   mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
   var User = mongoose.model('User') 

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/static")));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
 res.render("index");
})

app.post('/users', function(req, res) {
    console.log("POST DATA", req.body);

    // let result = 
    // {
    //     name: req.body.name,
    //     age: req.body.age,
    // }
    var user = new User({name: req.body.name, age: req.body.age});
    user.save(function(err) {
        if(err) {
            console.log('something went wrong');
          } else { // else console.log that we did well and then redirect to the root route
            console.log('successfully added a user!');
            res.redirect('/');
          }
    user.find.all({} ,function(err,users){

    })
        })
      })

app.listen(8000, function() {
 console.log("listening on port 8000");
});