
var session = require('express-session');
var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: 'secretcode'}));
app.use(express.static(path.join(__dirname, "/static")));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    var count = 0;
    if(req.session.count)
    {
    req.session.count += 1;
    count = req.session.count;
    }
    else 
    {
    req.session.count = 0;
    count = req.session.count;
    }
 res.render("index", {count:count});
})

app.post('/increase', function(req, res) {
   req.session.count += 1;
 res.redirect('/');
})


app.post('/reset', function(req,res) {
    req.session.count = 0;
    res.redirect('/');
})

app.listen(8000, function() {
 console.log("listening on port 8000");
});