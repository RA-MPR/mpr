describe('Login', function() {
	beforeEach(() => {
		cy.viewport(1440, 738)
		cy.visit('http://0.0.0.0:3000/')
		cy.on('uncaught:exception', (err, runnable) => { return false })
	  })

	it('Login - admin', function() {
		cy.get('#email').type('admin@test.io')
        .should('have.value', 'admin@test.io')

		cy.get('#password').type('poiuztre')
        .should('have.value', 'poiuztre')

		cy.get('.MuiGrid-root > .MuiGrid-root > div > #login > .MuiButton-label').click()
        cy.url().should('eq', 'http://0.0.0.0:3000/')
    })

})