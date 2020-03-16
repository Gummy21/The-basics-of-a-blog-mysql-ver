module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        email: type.STRING,
        username: type.STRING,
        password: type.STRING
    })
}

// var passportLocalMongoose = require("passport-local-mongoose");

// var UserSchema = new mongoose.Schema({
//     email: String,
//     username: String,
//     password: String
// });

// UserSchema.plugin(passportLocalMongoose);
