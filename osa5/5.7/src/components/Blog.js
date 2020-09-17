import React, { useState } from 'react'
const Blog = ({ blog }) => {
  const [showMore, setShowMore] = useState(false)

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

  if(showMore){
    return (
    <div style={blogStyle}>
      <div>{blog.title} {blog.author} 
        <button onClick={toggleData}>hide</button>
      </div>
      <div>{blog.url}</div>
      <div>
        {`likes ${blog.likes}`}
        <button>like</button>
      </div>
      <div>{blog.user.name}</div>
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
