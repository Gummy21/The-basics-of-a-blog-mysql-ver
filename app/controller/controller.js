const db = require('../models/');
const config = require('../config/config.js');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
 
exports.signup = (req, res) => {
  // Save User to Database
  console.log("Processing func -> SignUp");
  
  db.user.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  }).then();
}
 
exports.signin = (req, res) => {
  console.log("Sign-In");
  
  db.user.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (!user) {
      return res.status(404).send('User Not Found.');
    }
 
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
    }

  });
}
 