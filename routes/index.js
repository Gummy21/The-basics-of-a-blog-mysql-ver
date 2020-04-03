var express = require("express");
var router  = express.Router();
const verifySignUp = require("../app/router/verifySignUp");
const authJwt = require('../app/router/verifyJwtToken');
const controller = require('../app/controller/controller');

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
router.post("/register", [verifySignUp.checkDuplicateUserNameOrEmail], controller.signup,function (req,res){
    res.redirect('/blog')
});
// Login p2
router.post("/login",controller.signin,function(req,res){
    res.redirect('/')
});

//Logout
router.get("/logout", function(req,res){
    req.logout();
    res.redirect("/")
});





module.exports = router;