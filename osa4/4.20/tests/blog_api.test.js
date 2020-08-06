const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')


const api = supertest(app)

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
  
  beforeEach(async () => {
    await Blog.deleteMany({})
  
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
  
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length)
  })
  
  test('the first blog is google', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].url).toBe('www.google.com')
  })

  test('id is defined to first', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  test('post succesful', async () => {
    const newBlog = {
        title: 'This is test',
        author: "pasi",
        url: "www.google.com/test",
        likes: 3,
      }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length+1)

  })

  test('add like if not included', async () => {
    const newBlog = {
        title: 'This is test',
        author: "pasi",
        url: "www.google.com/test",
      }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)

    const response = await api.get('/api/blogs')
    expect(response.body[2].likes).toBe(0)

  })

  test('respond with 400', async () => {
    const newBlog = {      
        author: "pasi",
        url: "www.google.com/test",
      }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  })

  /*test('deletewith204', async () => {
    const blogToDelete = "5f1db8ad537a9d32e45e4f89"

    await api
    .delete(`/api/blogs/${blogToDelete}`)
    .expect(204)

  })*/

  test('modifywith', async () => {
    const blogToModify = "5f1dcb60b8fb132c88f7d061"

    const newBlog = {
        title: 'This is FOR PUT',
        author: "pasi1",
        url: "www.google.com/test",
        likes: 1
      }

    await api
    .put(`/api/blogs/${blogToModify}`)
    .send(newBlog)
    .expect(200)

  })

afterAll(() => {
  mongoose.connection.close()
})