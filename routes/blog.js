var express = require("express");
var router  = express.Router();
var db = require('../app/models');
const { QueryTypes } = require('sequelize');

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
   db.blog.create(newBlog).then(
       res.redirect("/blog")
    );
});
//SHOW
router.get("/:id", function(req,res){
    var id = req.params.id;
    db.blog.findAll({where: {id}, attributes: ['title','content', 'userId', 'id']}).then(function(foundBlog){
            res.render("show", {blogs:foundBlog, currentUser: req.user});
    }); 
});

//EDIT
router.get("/:id/edit", function(req,res){
    var id = req.params.id
    db.blog.findAll({where: {id},attributes: ['title','content', 'id']}).then(function(foundBlog){
        res.render("edit", {blogs: foundBlog});
    })
});

//UPDATE
router.put("/:id", function(req,res){
    var id = req.params.id;
    var updatedValues = {title:req.body.title, content: req.body.content};
    db.blog.update(updatedValues,{where: {id}}).then(function(err){
            res.redirect("/blog/" + id);
        })
});
// DELETE
router.delete("/:id", function(req,res){
    var id = req.params.id
    db.blog.destroy({where: {id}}).then(
     res.redirect("/blog")
    );
});
// SEARCH
router.post("/results", function(req,res){
    var query = req.body.searchData
    db.sequelize.query('SELECT * FROM blog WHERE title LIKE :search_title',
    {
        replacements: {search_title: query + "%"},
        type: QueryTypes.SELECT
    }).then(function (userSD){
        res.render("results", {results: userSD})
    })
    
});


module.exports = router;