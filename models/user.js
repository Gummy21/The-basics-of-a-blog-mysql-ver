
module.exports = (sequelize,DataTypes) => {
    var User = sequelize.define('user', {
        email: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        id: {
          primaryKey: true,
          autoIncrement: true,
          type: DataTypes.INTEGER
        }
    },{
      freezeTableName: true,
      timestamps: false
    }
  );
    User.associate = (models) => {
      User.hasMany(models.blog);
    };
    return User
}

// var passportLocalMongoose = require("passport-local-mongoose");

// var UserSchema = new mongoose.Schema({
//     email: String,
//     username: String,
//     password: String
// });

// UserSchema.plugin(passportLocalMongoose);
