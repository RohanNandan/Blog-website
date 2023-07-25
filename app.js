//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://rohannandan:rohannandan@cluster0.kxscb.mongodb.net/blogDB")

const homeStartingContent ="Welcome to Blog Website!!. This is your one stop destination for all your blog keeping";
const aboutContent = "This website is for you to speak your heart out";
const contactContent = "Rohan Nandan";

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//creating schema
const postSchema = {
  title: String,
  content: String
}
//creating model
const Post = mongoose.model("Post",postSchema)
app.get("/",function(request,response){
  
  Post.find({},function(err,posts){
    response.render("home",{
      homePageContent: homeStartingContent,
      posts: posts
    })
  })
  
 
  
})
app.get("/posts/:postId",function(request,response){
   
  const requestedPostId = request.params.postId;
  Post.findOne({_id: requestedPostId},function(err,post){
    response.render("post",{
      postTitle: post.title,
      postContent: post.content
    })
  })
})
app.get("/about",function(request,response){
  response.render("about",{aboutPageContent:aboutContent})
})

app.get("/contact",function(request,response){
  response.render("contact",{contactPageContent:contactContent})
})

app.get("/compose",function(request,response){
  response.render("compose")
})

app.post("/compose", function(request,response){
  
  //crrating new document
  const post = new Post( {
    title: request.body.blogTitle,
    content: request.body.blogContent
  });
  post.save(function(err){
    if(!err){
      response.redirect("/")
    }
  });
  
})



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
