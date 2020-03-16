//mysql -u root -p
const express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    methodOverride = require("method-override"),
    // flash          = require("connect-flash")
    mysql           = require("mysql");

var blogRoutes = require("./routes/blog");
var indexRoutes = require("./routes/index");

	

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
// app.use(flash());

//P config
// app.use(require("express-session")({
//     secret: "A very big snake",
//     resave: false,
//     saveUninitialized: false
// }));

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

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