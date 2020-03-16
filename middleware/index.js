// Middleware

var middlewareObj = {};
var Blog = require("../models/blog");
var User = require("../models/user");





middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in");
    res.redirect("/login")
};

middlewareObj.checkBlogOwnership = function(req,res,next){
    if(req.isAuthenticated()){
            Blog.findById(req.params.id, function(err,foundBlog){
                if(err){
                    console.log(err)
                } else{
                    if(foundBlog.author.id.equals(req.user._id)){
                        next();
                    } else {
                        req.flash("error", "You don't have permission to do that");
                        res.redirect("back");
                    }
                }
            });
    } else{
        req.flash("error", "You need to be logged in to do that")
        res.redirect("back")
    }

};



module.exports = middlewareObj;