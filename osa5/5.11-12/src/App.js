import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import './index.css'
import './components/Togglable'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log('this is the token ' + user.token)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    console.log('add blog')
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        //setNotificationMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
        setTimeout(() => {

          //setNotificationMessage(null)
        }, 3000)
      }).catch(error => {
        //setErrorMessage('Error adding blog')
        setTimeout(() => {
          //setErrorMessage(null)
        }, 3000)
      })

  }

  const addLikes = (blogObject, id) => {
    blogService
      .update(id, blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
        console.log(returnedBlog)
      }).catch(error => {
        setTimeout(() => {
          console.log('error in put')
        }, 3000)
      })
  }

  const removeBlog = (id) => {
    blogService
      .remove(id)
      .then(returnedBlog => {
        console.log(returnedBlog)
      }).catch(error => {
        setTimeout(() => {
          console.log('error in delete')
        }, 3000)
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      console.log(window.localStorage.getItem('loggedNoteappUser'))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      //setErrorMessage('wrong username or password')
      setTimeout(() => {
        //setErrorMessage(null)
      }, 3000)
    }
  }


  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            createLike={addLikes}
            removeBlog={removeBlog}
            userName={user.username}
          />
        ).sort((b,a) => {
          return a.props.blog.likes-b.props.blog.likes
        })
        }
      </div>
    )
  }

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={() => {
        window.localStorage.removeItem('loggedNoteappUser')
        setUser(null)
      } }>
          logout
      </button>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>

      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          createLike={addLikes}
          removeBlog={removeBlog}
          userName={user.username}
        />
      ).sort((b,a) => {
        return a.props.blog.likes-b.props.blog.likes
      })
      }
    </div>
  )

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    if(errorMessage !== null ){
      return <div className="error">
        {message}
      </div>
    }

    else return (
      <div className="notification">
        {message}
      </div>
    )
  }


  return (
    <div>
      {user === null ?
        loginForm() :
        blogForm()
      }
    </div>
  )
}

export default App