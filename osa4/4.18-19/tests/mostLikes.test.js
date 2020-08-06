const listHelper = require('../utils/list_helper')

describe('total likes', () => {
    const blogs = [
        {
        title: "Canonical string reduction",
        author: "Wesker",
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

    const most = {
        author: "Edsger W. Dijkstra",
        likes: 23
    }
  
    test('most likes amount', () => {
      const result = listHelper.mostLikes(blogs)
      expect(result).toStrictEqual(most)
    })
  })