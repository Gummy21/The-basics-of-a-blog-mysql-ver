var express = require("express");
var router  = express.Router();
var passport = require("passport");
const {Blog, User} = require('../sequelize')




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
    var newUser = { username: req.body.username, email: req.body.email, password: req.body.password};
   User.create(newUser, function(err){
    passport.authenticate("local-signup") (req,res, function(){
        res.redirect("/");
    });
   });
});
// Login p2
router.post("/login",
// passport.authenticate("local",{
// //     successRedirect: "/blog",
// //     failureRedirect: "/login"
//     }),
     function(req,res){

});

//Logout
router.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/")
});




  
module.exports = router;