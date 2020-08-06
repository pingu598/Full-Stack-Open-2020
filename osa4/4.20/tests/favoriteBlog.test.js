const listHelper = require('../utils/list_helper')

describe('total likes', () => {
    const blogs = [
        {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 15
        },
        {
            title: "Canonical string",
            author: "Edsger W. Dijkstra",
            likes: 10
          },
          {
            title: "Canonical string",
            author: "Edsger W. Dijkstra",
            likes: 13
          }
    ]
  
    test('favorite blog amount', () => {
      const result = listHelper.favoriteBlog(blogs)
      expect(result).toEqual(blogs[0])
    })
  })