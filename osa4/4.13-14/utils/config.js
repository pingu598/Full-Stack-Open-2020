require('dotenv').config()
let mongoUrl = 'mongodb+srv://user1:user1@cluster0.pyxdx.mongodb.net/blog-app?retryWrites=true&w=majority'
let mongoUrltest = 'mongodb+srv://user1:user1@cluster0.pyxdx.mongodb.net/blog-app?retryWrites=true&w=majority'
let PORT = 3003

if (process.env.NODE_ENV === 'test') {
    mongoUrl = mongoUrltest
    //korjaa 4.2, test-ympäristö
  }

module.exports = {
    mongoUrl,
    PORT
}