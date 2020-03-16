var express = require("express");
var router  = express.Router();
var Blog    = require("../models/blog");


function searchF(){
    router.get("/results", function(req,res){
        Blog.find({$text : { $search: req.body.searchF}}, function(err, userSD){
            if(err){
                console.log(err)
            } else{
                res.render("results", {results: userSD});
            }
        });
    });
    
}