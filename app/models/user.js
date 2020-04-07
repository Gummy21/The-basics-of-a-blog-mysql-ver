var bcrypt = require('bcryptjs');
module.exports = function(sequelize,Datatypes) {
    var User = sequelize.define('user', {
        email: {
          type :Datatypes.STRING,
          isEmail: true
        },
        username: Datatypes.STRING,

        password: Datatypes.STRING,
        id: {
          primaryKey: true,
          autoIncrement: true,
          type: Datatypes.INTEGER
        },
    },
    {
      freezeTableName: true,
      timestamps: false
    });
    User.generateHash = function(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };
    User.prototype.validPassword = function(password){
      return bcrypt.compareSync(password, this.localPassword);
    };

    User.associate = (db) => {
      User.hasMany(db.blog);
    };
    
    return User
}
