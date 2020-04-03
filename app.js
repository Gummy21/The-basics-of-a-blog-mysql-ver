const express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    methodOverride = require("method-override"),
    flash          = require("connect-flash");
const db = require("./app/models/");
db.sequelize.sync({
    force: true
});
var blogRoutes = require("./routes/blog");
var indexRoutes = require("./routes/index");

	

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	// res.locals.error = req.flash("error");
	// res.locals.success = req.flash("success");
	next();
});

app.use("/blog", blogRoutes);
app.use("/", indexRoutes);






app.listen(8887,function(){
    console.log("Server started on port 8887")
});