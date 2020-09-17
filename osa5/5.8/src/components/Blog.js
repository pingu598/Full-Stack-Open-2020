import React, { useState, useEffect } from 'react'

const Blog = ({ blog, createLike }) => {
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
