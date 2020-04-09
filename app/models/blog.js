module.exports = function(sequelize, Datatypes){
      var Blog = sequelize.define('blog', {
        id: { 
          primaryKey: true,
          autoIncrement: true,
          type: Datatypes.INTEGER
        },
        title: Datatypes.STRING,
        content: Datatypes.STRING,
        createdAt: {
          type: Datatypes.DATE,
          defaultValue: sequelize.fn('NOW')
        },
    },{
      freezeTableName: true,
      timestamps: false
    }
    );
    Blog.associate = (db) => {
      Blog.belongsTo(db.user,{
        onDelete: "CASCADE",
        foreignKey: {
          allowNull:false
        }
      })
    };
    return Blog;
}
