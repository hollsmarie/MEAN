// require packages
const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

//connect to statement and use promise statement
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ProductManager');

//create database
var Schema = mongoose.Schema;

var ProductSchema = new mongoose.Schema({
    title: { type: String, required: [true, "Products must have a name."], minlength: [3, "Product names must be at least 3 characters long."] },
    price: { type: Number, required: [true, "Products must include a price."]},
}, { timestamps: true })


mongoose.model('Product', ProductSchema) // We are setting this Schema in our Models as 'User'
var Product = mongoose.model('Product')


//use statements
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname, "/static")));
app.use(express.static( __dirname + "/angularapp/dist" ));



//set statements
app.set('views', path.join(__dirname, '/views'));


  app.set('views', path.join(__dirname, '/views'));

//   app.get('/', function (req, res) {
//       Product.find({}, function (err, products) {
//           if (err) {
//               console.log("Returned Error", err);
//               res.json({message: "ERROR", error: err})
//           }
//           else {
//               res.json({Products: products})
//           }
//       });
//   })
  
  
  app.get('/products', function (req, res) {
      Product.find({}, function (err, products) {
          if (err) {
              console.log("Returned Error", err);
              res.json({error: err})
          }
          else {
              res.json({products: products})
          }
      });
  })
  
  
  //2. Retrieves tasks by ID
  app.get('/:id', function(req,res){
      Product.findOne({_id: req.params.id}, function(err, product){
          if(err)
          {
              res.json({error: err})
          }
          else
          {
              res.json({product})
          }
      })
  
  })
  
  //3. Creates a task
  app.post('/api/products', function(req,res){
      var product = new Product({title: req.body.title, price: req.body.price})
      product.save(function(err){
          if(err)
          {
            console.log("in Server.js file")  
            res.json({error: err})
              
          }
          else
          {
              res.json({message:"Success!"})
          }
      })
  
  })
  
  
  //4. Update Task by ID
  app.put('/:id/', function(req,res){
      product.update({_id: req.params.id},
          {
              title: req.body.title,
              price: req.body.price,
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
  app.delete('/api/products/:id', function(req,res){
      Product.remove({_id: req.params.id},function(err){
          if(err)
          {
              res.json({error:err})
          }
          else{
              res.redirect('/')
          }
      })
  
  })

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./angularapp/dist/index.html"))
});
  
var server = app.listen(8000, function () {
    console.log("listening on port 8000");
});