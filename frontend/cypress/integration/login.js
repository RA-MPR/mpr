describe('Login', function() {
	beforeEach(() => {
		cy.viewport(1440, 738)
		cy.visit('http://0.0.0.0:3000/')
		cy.on('uncaught:exception', (err, runnable) => { return false })
	  })

	it('Login - admin', function() {
		cy.get('#email').type('admin@mpr.zarybnicky.com')
        .should('have.value', 'admin@mpr.zarybnicky.com')

		cy.get('#password').type('admin')
        .should('have.value', 'admin')

		cy.get('.MuiGrid-root > .MuiGrid-root > div > #login > .MuiButton-label').click()
        cy.url().should('eq', 'http://0.0.0.0:3000/')
    })

})