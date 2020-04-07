const express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    methodOverride = require("method-override"),
    flash          = require("connect-flash"),
    cookieParser    =require('cookie-parser')
    isAuthenticated = require("./middleware");
    db = require("./app/models/");



blogRoutes = require("./routes/blog");
indexRoutes = require("./routes/index");

db.sequelize.sync({
    force: true
});
	

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.use(require("express-session")({
    resave: false,
    saveUninitialized: false,
    secret: 'A big snake',
    cookie:{
        expires: 600000
    }
}));
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});
app.use(function(req, res, next){
    res.locals.user = req.session.user;
    next();
});


app.use("/blog", blogRoutes);
app.use("/", indexRoutes);






app.listen(8887,function(){
    console.log("Server started on port 8887")
});