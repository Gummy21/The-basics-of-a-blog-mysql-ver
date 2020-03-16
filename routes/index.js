var express = require("express");
var router  = express.Router();
var passport = require("passport");
var Blog    = require("../models/blog");
var User   = require("../models/user");




//Index
router.get("/", function(req, res){
    res.render("index");
});

//Register
router.get("/register", function(req,res){
    res.render("register");
});
//Login
router.get("/login", function(req, res){
    res.render("login");
});

//Register p2
router.post("/register", function(req,res){
   var newUser = new User({username: req.body.username, email: req.body.email});
   User.register(newUser, req.body.password, function(err,user){
    if(err){
        console.log(err)
        return res.render("register", {"error": err.message})
    } 
    passport.authenticate("local") (req,res, function(){
        req.flash("success", "Welcome to blogo " + user.username);
        res.redirect("/");
    });
   });
});
//Login p2
router.post("/login",passport.authenticate("local",{
    successRedirect: "/blog",
    failureRedirect: "/login"
    }), function(req,res){

});

//Logout
router.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/")
});




  
module.exports = router;