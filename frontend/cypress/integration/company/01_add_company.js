describe('New company', function() {

	it('Add new company', function() {

		cy.on('uncaught:exception', (err, runnable) => { return false })

		cy.viewport(1342, 976)
		cy.visit('http://0.0.0.0:3000/')

		//login
		cy.get('#email').type('admin@test.io')
		cy.get('#password').type('poiuztre')
		cy.get('.MuiGrid-root > .MuiGrid-root > div > #login > .MuiButton-label').click()

		cy.get('button.add-button').click()
		cy.url().should('eq', 'http://0.0.0.0:3000/company/new')

		cy.get('.MuiGrid-root > .MuiGrid-root > .MuiFormControl-root > .MuiInputBase-root > #ICO').type('12345678')
		.should('have.value', '12345678')

		cy.get('.MuiGrid-root > .MuiGrid-root > .MuiFormControl-root > .MuiInputBase-root > #tel').click()
		cy.get('.MuiGrid-root > .MuiGrid-root > .MuiFormControl-root > .MuiInputBase-root > #tel').type('+420234694111')
		.should('have.value', '+420234694111')

		cy.get('.MuiGrid-root > .MuiGrid-root > .MuiFormControl-root > .MuiInputBase-root > #name').click()
		cy.get('.MuiGrid-root > .MuiGrid-root > .MuiFormControl-root > .MuiInputBase-root > #name').type('Test1')
		.should('have.value', 'Test1')

		cy.get('.MuiFormControlLabel-root > .MuiSwitch-root > .MuiButtonBase-root > .MuiIconButton-label > .PrivateSwitchBase-input-4').click()
		cy.get('.MuiFormControlLabel-root > .MuiSwitch-root > .MuiButtonBase-root > .MuiIconButton-label > .PrivateSwitchBase-input-4').check('')
		.should('be.checked') 

		cy.get('.MuiGrid-root > .MuiGrid-root > .MuiFormControl-root > .MuiInputBase-root > #streetContact').click()
		cy.get('.MuiGrid-root > .MuiGrid-root > .MuiFormControl-root > .MuiInputBase-root > #streetContact').type('Veselá')
		.should('have.value', 'Veselá')

		cy.get('.MuiGrid-root > .MuiGrid-root > .MuiFormControl-root > .MuiInputBase-root > #zipContact').click()
		cy.get('.MuiGrid-root > .MuiGrid-root > .MuiFormControl-root > .MuiInputBase-root > #zipContact').type('12345')
		.should('have.value', '12345')

		cy.get('.MuiGrid-root > .MuiGrid-root > .MuiFormControl-root > .MuiInputBase-root > #cityContact').click()
		cy.get('.MuiGrid-root > .MuiGrid-root > .MuiFormControl-root > .MuiInputBase-root > #cityContact').type('Brno')
		.should('have.value', 'Brno')

		cy.get('.MuiGrid-root > .MuiGrid-root > .MuiFormControl-root > .MuiInputBase-root > #countryContact').click()
		cy.get('.MuiGrid-root > .MuiGrid-root > .MuiFormControl-root > .MuiInputBase-root > #countryContact').type('Česká republika')
		.should('have.value', 'Česká republika')

		// submit
		cy.get("button[type=submit]").click()
		cy.contains('Úspěch')
		cy.get('.MuiDialog-container > .MuiPaper-root > .MuiDialogActions-root > .MuiButtonBase-root > .MuiButton-label').click()
		cy.url().should('eq', 'http://0.0.0.0:3000/company/detail')
		cy.wait(2000)

		//home page
		cy.get('.MuiToolbar-root > div > .MuiToggleButtonGroup-root > .MuiButtonBase-root:nth-child(1) > .MuiToggleButton-label').click()
	})

})
