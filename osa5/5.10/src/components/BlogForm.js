import React, {useState} from 'react' 

const BlogForm = ({ createBlog }) => {
  const [setTitle, setNewTitle] = useState('') 
  const [setAuthor, setNewAuthor] = useState('') 
  const [setUrl, setNewUrl] = useState('') 

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    console.log("add blog")
    createBlog({
      title: setTitle,
      author: setAuthor,
      url: setUrl
    })
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
    
  }
  
    return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
      <div>
        title
          <input
          type="text"
          value={setTitle}
          name="Title"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author
          <input
          type="text"
          value={setAuthor}
          name="Author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url
          <input
          type="text"
          value={setUrl}
          name="Url"
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">create</button>
    </form> 
      
      </div>
    )
    }

  export default BlogForm