var express = require("express");
var router  = express.Router();
var db = require('../app/models');

//INDEX
router.get("/", function(req,res) { 
   db.blog.findAll({include: [{model: db.user}]}).then(function(allBlogs){  
            res.render("home", {blogs:allBlogs, user: req.session.user});
    });
});

//NEW
router.get("/new",function(req,res){
    res.render("new")
});
//Create
router.post("/",function(req,res){
   const title = req.body.title;
   const content = req.body.content;
   const userId    = req.session.user.id
   const newBlog = { title: title, content: content, userId: userId};
   db.blog.create(newBlog, function(){
       res.redirect("/blog")
   });
});
//SHOW
router.get("/:id", function(req,res){
    var id = req.params.id;
    db.blog.findAll({where: {id}, attributes: ['title','content']}).then(function(foundBlog){
            res.render("show", {blogs:foundBlog, currentUser: req.user});
    });
});

//EDIT
router.get("/:id/edit", function(req,res){
    db.blog.findByPk({where: {id: req.params.id}}, function(err, foundBlog){
        res.render("edit", {blog: foundBlog});
    });
});

//UPDATE
router.put("/:id", function(req,res){
    db.blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blog");
        } else {
            res.redirect("/blog/" + req.params.id);
          
        }
    });
});

router.delete("/:id", function(req,res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log("/blog");
        } else {
            res.redirect("/blog")
        }
    })
});

router.post("/results", function(req,res){
    var query = req.body.searchData
    Blog.find({$text : {$search: query}}, function(err, userSD){
        if(err){
            console.log(err)
        } else{
            res.render("results", {results: userSD});
        }
    });
});

module.exports = router;