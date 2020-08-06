const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'HTML is easy',
        author: "pasi",
        url: "www.google.com",
        likes: 1,
      },
      {
        title: 'This is test',
        author: "pasi",
        url: "www.google.com/test",
        likes: 2,
      }
  ]

const nonExistingId = async () => {
  const note = new Blog({ content: 'willremovethissoon' })
  await note.save()
  await note.remove()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Blog.find({})
  return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, notesInDb, usersInDb
}