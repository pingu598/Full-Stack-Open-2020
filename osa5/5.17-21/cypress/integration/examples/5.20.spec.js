describe('Blog app', function() {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: "hello",
    url: "google.com"
  }

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      // create here a user to backend
      const user = {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user) 
      cy.visit('http://localhost:3000')
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created and liked', function() {
      cy.createBlog( blog )
      cy.contains('Component testing is done with react-testing-library')
      cy.contains('show').click()
      cy.contains('like').click()
      cy.contains('likes 1')
    })
    
  })
  

})