describe('Blog ', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000')
      })
    it('front page can be opened', function() {
      cy.visit('http://localhost:3000')
      /*cy.contains('Blogs')
      cy.contains('Note app, Department of Computer Science, University of Helsinki 2020')*/
    })
    it('login form can be opened', function() {
        cy.visit('http://localhost:3000')
        cy.contains('login').click()
      })
      it('user can log in', function() {
        cy.contains('login').click()
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
    
        cy.contains('Matti Luukkainen logged in')
      }) 
      describe('when logged in', function() {
        beforeEach(function() {
          cy.contains('login').click()
          cy.get('input:first').type('mluukkai')
          cy.get('input:last').type('salainen')
          cy.get('#login-button').click()
        })
    
        it('a new note can be created', function() {
          cy.contains('new note').click()
          cy.get('input').type('a note created by cypress')
          cy.contains('save').click()
          cy.contains('a note created by cypress')
        })
      })
  })