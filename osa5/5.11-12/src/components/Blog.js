import React, { useState, useEffect } from 'react'

const Blog = ({ blog, createLike, removeBlog, userName }) => {
  const [showMore, setShowMore] = useState(false)
  const [name, setName] = useState('')


  useEffect(() => {
    const Rename = () => {
      setName(blog.user.name)
    }
    if(name==='') {Rename()}
  }, [blog.user.name, name])

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleData = () => {
    setShowMore(!showMore)
  }

  const addLike = (event) => {
    event.preventDefault()

    createLike({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user.id,
      likes: blog.likes + 1,
    }, blog.id)
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(
        blog.id
      )
      console.log('deleted blog')
    }
  }

  const checkUser = { display: (userName!==blog.user.username) ? 'none' : '' }

  if(showMore){
    console.log(blog)
    return (
      <div style={blogStyle}>
        <div>{blog.title} {blog.author}
          <button onClick={toggleData}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          {`likes ${blog.likes}`}
          <button onClick={addLike}>like</button>
        </div>
        <div>{name}</div>
        <div style={checkUser}>
          <button onClick={deleteBlog}>remove</button>
        </div>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleData}>show</button>
        </div>
      </div>
    )
  }
}

export default Blog
