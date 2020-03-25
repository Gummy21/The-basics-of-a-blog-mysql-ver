const express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    passport      = require("passport"),
    methodOverride = require("method-override"),
    {Blog, User}    = require('./sequelize')
    flash          = require("connect-flash")

// require('./config/passport')(passport);

var blogRoutes = require("./routes/blog");
var indexRoutes = require("./routes/index");

	

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
// app.use(flash());

// P config
app.use(require("express-session")({
    secret: "A very big snake",
    resave: false,
    saveUninitialized: false
}));

// require('./routes/blog.js')(app,passport);
// require('./routes/user.js')(app,passport);

app.use(passport.initialize());
app.use(passport.session());


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