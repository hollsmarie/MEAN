// require packages
const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require("bcryptjs");


//connect to statement and use promise statement
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/LoginAndReg');

//create database
var Schema = mongoose.Schema;


var UserSchema = new mongoose.Schema({
    firstname: { type: String, validate: [{ validator: function (firstname) { return /^[a-z ,.'-]+$/i.test(firstname); }, message: "Names may only contain letters" },], required: [true, "Users must enter a first name"], minlength: 3 },
    lastname: { type: String, validate: [{ validator: function (lastname) { return /^[a-z ,.'-]+$/i.test(lastname); }, message: "Names may only contain letters" },], required: [true, "Users must enter a last name"], minlength: 2 },
    email: { type: String, validate: [{ validator: function (email) { return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email); }, message: "Email is not a valid email" },], required: [true, "Users must enter an email address"], minlength: 5 },
    password: { type: String, validate: [{ validator: function (password) { return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test(password); }, message: "Passwords much contain at least 1 number, uppercase letter, and special character" },], required: [true, "Users must enter a password"], minlength: 8 },
    birthday: { type: Date, validate: [{ validator: function (value) { return value.getTime() < new Date().getTime(); }, message: "Birthday cannot be in the future" },], required: [true, "Users must enter a birth date"] },
}, { timestamps: true })


mongoose.model('User', UserSchema) // We are setting this Schema in our Models as 'User'
var User = mongoose.model('User')


//use statements
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, "/static")));
app.use(session({ secret: 'devholly',
resave: true,
saveUninitialized: true }));


//set statements
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');




//Routes
//1. Main Index Page
app.get('/', function (req, res) {
    if (req.session.userid) {
        res.redirect("/success")
    }
    else {
        console.log("********GOT HERE 0**********")
        res.render("index");
    }
});


app.post('/register', function (req, res) 
{
    console.log("********GOT HERE 1**********")
    console.log(req.body)
    User.find({ email: req.body.email }, function (err, user) {
        if (user.length >= 1) {
            res.json({ "emailError": "This email already exists in our database. Try Logging in or registering with a different email address." })
        }
        else 
        console.log("********GOT HERE 2**********")
        {
            if (req.body.password == req.body.confirm) {
                console.log("GOT TO IF STATEMENT IN REG")
                var hash = bcrypt.hashSync(req.body.password, 8)
                var newUser = new User({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: hash,
                    birthday: req.body.birthday
                });
                console.log("********GOT HERE 3**********")
                newUser.save(function (err) {
                    if (err) {
                        console.log("********GOT TO IF STATEMENT AFTER SAVE*********")
                        console.log(err)
                        res.render("index")
                    }
                    else 
                        console.log("********GOT HERE 4**********")
                        {
                            req.session.userid = newUser._id;
                            var thisUser = req.session.userid;
                            res.redirect("/success");
                        }
                })
            }
            else {
                res.json({ "Password Error": "Passwords do not match please try again." })
            }
        }
    })
})


app.post('/login', function (req, res) {
    User.find({email: req.body.email}, function (err,user){
        if(err)
        {
            res.render("index")
        }
        else
        {
            if (user.length>0)
            {
                if(bcrypt.compareSync(req.body.password, user[0].password))
                {
                    req.session.userid=user[0]._id;
                    var thisUser = req.session.userid;
                    res.redirect("/success");  
                }
                else
                {
                    res.json({"error": "Password is not correct."})
                }
            }
        }
    })

})



app.get('/success', function (req, res) {
    res.render("success");
});


app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/')
})





//server setup
app.listen(8000, function () {
    console.log("listening on port 8000");
});

