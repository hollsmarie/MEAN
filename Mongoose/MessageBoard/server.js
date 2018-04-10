var express = require("express");
var path = require("path");
var mongoose = require('mongoose');

var app = express();
var bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/MessageBoard');

var Schema = mongoose.Schema;

var PostSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    message: { type: String, required: true, minlength: 4 },
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true })


var CommentSchema = new mongoose.Schema({
    commentname: { type: String, required: true, minlength: 3 },
    _post: { type: Schema.Types.ObjectId, ref: 'Post' },
    comment: { type: String, required: true, minlength: 4 },

}, { timestamps: true });

mongoose.model('Post', PostSchema) // We are setting this Schema in our Models as 'User'
mongoose.model('Comment', CommentSchema)

var Post = mongoose.model('Post')
var Comment = mongoose.model('Comment')


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/static")));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');



app.get('/', function (req, res) {
    Post.find({})  .populate('comments').exec( function (err, posts) {
        if (err) {
            res.render("index")
        }
        else {
            res.render("index", { posts: posts });
        }
    });
})

app.post('/addPost', function (req, res) {
    var post = new Post({ name: req.body.name, message: req.body.message });

    post.save(function (err) {
        if (err) {
            res.render("/", { errors: posts.errors })
        }
        else {
            res.redirect('/')
        }
    });
})

app.post('/:id/comment', function (req, res) {
    Post.findOne({_id: req.params.id}, function (err, post){

        var comment = new Comment({commentname: req.body.commentname, comment: req.body.comment, _post: post._id});

        comment.save(function (err) {
            post.comments.push(comment);
            post.save(function(err){
                if(err) {
                    res.render('/', {errors: comments.errors} )
                }
                else{
                    res.redirect('/')
                }
            });
        });
    });
});

// app.get('/posts/:id', function (req, res){
//     Post.findOne({_id: req.param.id})
//     .populate('comments')
//     .exec(function(err, posts){
//         res.render('post', {posts: post});
//     });
// })

app.listen(8000, function () {
    console.log("listening on port 8000");
});