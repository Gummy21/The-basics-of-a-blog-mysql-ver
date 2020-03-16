const Sequelize = require('sequelize')
const UserModel = require('./models/user')
const BlogModel = require('./models/blog')

const sequelize = new Sequelize('blog', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    freezeTableName: true
  }
})

const User = UserModel(sequelize, Sequelize)
const Blog = BlogModel(sequelize, Sequelize)

Blog.belongsTo(User);

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  User,
  Blog
}