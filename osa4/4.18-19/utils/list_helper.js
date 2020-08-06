var _ = require('lodash')

const palindrome = (string) => {
    return string
      .split('')
      .reverse()
      .join('')
  }
  
  const average = array => {
    const reducer = (sum, item) => {
      return sum + item
    }
    return array.length === 0
      ? 0 
      : array.reduce(reducer, 0) / array.length
  }

  const dummy = (blogs) => {
    return 1
  }
  
  const totalLikes = (blogs) => {
     const reducer = (sum, item) => {
        return sum + item.likes
      }
      return blogs.length === 0
        ? 0 
        : blogs.reduce(reducer, 0)
  }

  const favoriteBlog = (blogs) => {
    const reducer = (best, blog) => {             
        return best.likes < blog.likes 
        ? best = blog
        : best
      }
      return blogs.length === 0
        ? 0 
        : blogs.reduce(reducer, blogs[0])
  }

  const mostBlogs = (blogs) => {
    const sorted = _.groupBy(blogs, "author")
    //console.log(sorted)
    
    const newtitle = (author,blogs) => {
      return {
      author: `${author}`,
      blogs: blogs
      }
    }

    const biggest = _.reduce(sorted, function(most, n) {
      return most < n.length
      ? most = n              
      : most
    }, 0)

    console.log(newtitle(biggest[0].author,biggest.length))

    return blogs.length === 0
      ? 0 
      : newtitle(biggest[0].author,biggest.length)
  }
  
  const mostLikes = (blogs) => {
    const sorted = _.groupBy(blogs, "author")
    console.log(sorted)
    
    const newtitle = (author,blogs) => {
      return {
      author: `${author}`,
      blogs: blogs
      }
    }

    const biggest = _.reduce(sorted, function(most, n) {
      
    }, 0)

    console.log(newtitle(biggest[0].author,biggest.length))

    return blogs.length === 0
      ? 0 
      : newtitle(biggest[0].author,biggest.length)
  }

  module.exports = {
    palindrome,
    average,
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
  }