
module.exports = function(sequelize,Sequelize) {
    var User = sequelize.define('user', {
        email: Sequelize.STRING,

        username: Sequelize.STRING,

        password: Sequelize.STRING,
        id: {
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER
        },
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
    // User.associate = (models) => {
    //   User.hasMany(models.blog);
    // };
    return User
}
