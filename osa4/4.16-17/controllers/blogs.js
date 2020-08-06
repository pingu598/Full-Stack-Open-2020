const blogRouter = require('express').Router()
const Blog = require('../models/blog') 
const User = require('../models/user')

/*blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })*/
  blogRouter.get('/', async (request, response) => { 
    const blogs = await Blog
    .find({}).populate('user', {username:1,name:1})
    response.json(blogs.map(blog => blog.toJSON()))
  })
  
  /*blogRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  }) */

  blogRouter.post('/', async (request, response) => {
    const body = request.body
    if (body.title===undefined || body.url===undefined) {
      return response.status(400).json({ error: 'Bad request' })
    }
    const user = await User.findById(body.userId)
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(200).json(savedBlog.toJSON())
    }) 

  blogRouter.put('/:id', async (request, response) => {
      const body = request.body
    
      await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
      
      response.status(200).end()
    })

  blogRouter.delete('/:id', async (request, response) => {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    })

  module.exports = blogRouter


