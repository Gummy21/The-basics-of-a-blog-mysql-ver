module.exports = (sequelize, type) => {
    return sequelize.define('blog', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        title: type.STRING,
        content: type.STRING
    })
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