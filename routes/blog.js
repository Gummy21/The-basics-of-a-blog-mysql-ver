var express = require("express");
var router  = express.Router();
var middleware = require("../middleware");
const mysql = require("mysql");
const {User, Blog} = require("../sequelize")


//INDEX
router.get("/", function(req, res){
    Blog.findAll({}, function(err, allBlogs){
        if(err){
            console.log(err)
        } else{
            res.render("home", {blogs:allBlogs, currentUser: req.user});
        }
    });
});
//NEW
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("new")
});
//Create
router.post("/",middleware.isLoggedIn,function(req,res){
   const name = req.body.name;
   const title = req.body.title;
   const  content = req.body.content;
   const author = {
       id: req.user._id,
       username: req.user.username
   };
   const newBlog = {name: name, title: title, content: content, author:author};
   Blog.create(newBlog, function(err, newlyCreated){
    if(err){
        console.log(err)
    } else {
       res.redirect("/blog")
    }

   });
});
//SHOW
router.get("/:id", function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log(err)
        } else{
            res.render("show", {blog:foundBlog, currentUser: req.user});
        }
    });
});

//EDIT
router.get("/:id/edit", function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        res.render("edit", {blog: foundBlog});
    });
});

//UPDATE
router.put("/:id", function(req,res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blog");
        } else {
            res.redirect("/blog/" + req.params.id);
            console.log(typeof req.body.blog)
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