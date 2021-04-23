describe('Login', function() {

	it('Login - admin', function() {

		cy.on('uncaught:exception', (err, runnable) => { return false })

		cy.viewport(1342, 976)
		cy.visit('http://0.0.0.0:3000/')

		cy.get('#email').type('admin@test.io')
        .should('have.value', 'admin@test.io')

		cy.get('#password').type('poiuztre')
        .should('have.value', 'poiuztre')

		cy.get('.MuiGrid-root > .MuiGrid-root > div > #login > .MuiButton-label').click()
        cy.url().should('eq', 'http://0.0.0.0:3000/')
    })

})