var express = require("express");
var path = require("path");
var mongoose = require('mongoose');

var app = express();
var bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/QuotingDojoInMean');

var QuoteSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    quote: { type: String, required: true, minlength: 10 },
}, { timestamps: true })
mongoose.model('Quote', QuoteSchema) // We are setting this Schema in our Models as 'User'

var Quote = mongoose.model('Quote')

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/static")));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render("index");
})

app.post('/quotes', function (req, res) 
{
    var quote = new Quote({ name: req.body.name, quote: req.body.quote, });

    quote.save(function (err) {
        if (err) {
            console.log('something went wrong!');
            res.render("index", { errors: quote.errors })
        }
        else {
            console.log('successfuly posted');
            res.redirect('/quotespage')
        }
    });
})


app.get('/quotespage', function (req, res) {
    Quote.find({}, function (err, quotes) 
    {
        if (err) 
        {
            res.render("index")
        }
        else 
        {
            res.render("quotespage", { quotes: quotes });
        }
    });
})


app.listen(8000, function () {
    console.log("listening on port 8000");
});