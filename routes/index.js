var express = require("express");
var router  = express.Router();
var bcrypt = require('bcryptjs')
var db = require("../app/models")
const saltRounds = 10;



//Index
router.get("/",function(req, res){
    res.render("index");
});

//Register
router.get("/register",function(req,res){
    res.render("register");
});
//Login
router.get("/login",function(req, res){
    res.render("login");
});

//Register p2
router.post("/register",function (req,res){
    bcrypt.hash(req.body.password, saltRounds, function (err,hash) {
        db.user.create({
          username: req.body.username,
          email: req.body.email,
          password: hash
          }).then(user => {
              req.session.user = user.dataValues;
              res.redirect("/blog")
          })
    });
});
// Login p2
router.post("/login",function(req,res){
    db.user.findOne({
        where: {
          username: req.body.username
        }
      }).then(function (user){
        if(!user){
          res.redirect("/login");
        } else {
          bcrypt.compare(req.body.password, user.password, function (err,result) {
            if(result == true) {
                req.session.user = JSON.stringify(result);
              res.redirect('/blog');
            } else {
              res.redirect('/login')
            }
          });
        }
      });
    });

//Logout
router.get("/logout", function(req,res){
    req.logout();
    res.redirect("/")
});





module.exports = router;