module.exports = (sequelize, Sequelize) => {
      var Blog = sequelize.define('blog', {
        id: { 
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER
        },
        title: Sequelize.STRING,
        content: Sequelize.STRING,
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: sequelize.NOW
        }
    },{
      freezeTableName: true,
      timestamps: false
    }
    );
    Blog.associate = (models) => {
      Blog.belongsTo(models.user,{
        onDelete: "CASCADE",
        foreignKey: {
          allowNull:false
        }
      })
    };
    return Blog;
}
// var blogSchema = new mongoose.Schema({
//     title: String,
//     content: String,
//     author: {
//         id:{
//             type: mongoose.Schema.Types.ObjectId,
//             ref:"User"
//         },
//         username: String
//     },
// });

// module.exports = Sequelize.m("Blog", blogSchema);