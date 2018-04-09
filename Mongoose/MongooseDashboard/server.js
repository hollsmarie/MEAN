var express = require("express");
var path = require("path");
var mongoose = require('mongoose');

var app = express();
var bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/MongooseDashboard');

var AnimalSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    color: { type: String, required: true, minlength: 4 },
}, { timestamps: true })
mongoose.model('Animal', AnimalSchema) // We are setting this Schema in our Models as 'User'

var Animal = mongoose.model('Animal')

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/static")));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    Animal.find({}, function (err, animals) 
    {
        if (err) 
        {
            res.render("index")
        }
        else 
        {
            res.render("index", { animals: animals });
        }
    });
})

app.get('/animals', function (req, res) {
    res.render("animals")
})

app.get('/show/:id' , function(req, res){
    var animal = Animal.findOne({_id:req.params.id}, function (err, animal) {
        res.render("show", {animal: animal});
    });    
})

app.get('/edit/:id' , function(req, res){
    var animal = Animal.findOne({_id:req.params.id}, function (err, animal) {
        res.render("edit", {animal: animal});
    });    
})

app.get('/delete/:id' , function(req, res){
   Animal.remove({_id:req.params.id}, function (err) {
        res.redirect("/");
    });    
})

app.post('/addanimal', function (req, res) {
    var animal = new Animal({ name: req.body.name, color: req.body.color});

    animal.save(function (err)
    {
        if(err) 
        {
            res.render("animals", {errors: animal.errors})
        }
        else
        {
            res.redirect('/')
        }
    });
})

app.post('/update/:id', function (req, res) {
    Animal.update({_id: req.params.id },
        {
            name: req.body.name,
            color: rec.body.color,
        },
        function(err) {
            if(err) 
                {
                    res.render('/edit/${req.params.id}', {errors: animal.errors})
                }
            else
                {
                    res.redirect('/')
                }
    })
})



app.listen(8000, function () {
    console.log("listening on port 8000");
});