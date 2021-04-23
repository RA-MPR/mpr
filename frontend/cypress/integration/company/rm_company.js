describe('New company', function() {

	it('Add new company', function() {

		cy.on('uncaught:exception', (err, runnable) => { return false })

		cy.viewport(1342, 976)
		cy.visit('http://0.0.0.0:3000/')

		//login
		cy.get('#email').type('admin@test.io')
		cy.get('#password').type('poiuztre')
		cy.get('.MuiGrid-root > .MuiGrid-root > div > #login > .MuiButton-label').click()

		cy.contains('Test1').click()
		cy.url().should('eq', 'http://0.0.0.0:3000/company/detail')

        cy.contains('Smazat').click()
		cy.get('.MuiDialog-container > .MuiPaper-root > .MuiDialogActions-root > .MuiButtonBase-root:nth-child(2) > .MuiButton-label').click()

		cy.url().should('eq', 'http://0.0.0.0:3000/')
	})

})
