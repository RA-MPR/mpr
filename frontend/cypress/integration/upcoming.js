describe('Upcoming tests', function() {
   beforeEach(() => {
		cy.viewport(1440, 738)
		cy.visit('http://0.0.0.0:3000/')
		cy.on('uncaught:exception', (err, runnable) => { return false })

		//login
		cy.get('#email').type('admin@test.io')
		cy.get('#password').type('poiuztre')
		cy.get('.MuiGrid-root > .MuiGrid-root > div > #login > .MuiButton-label').click()
	})
	
	afterEach(() => {
		cy.wait(2000)
		//logout
		cy.visit('http://0.0.0.0:3000/')
		cy.get('div:nth-child(3) > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root > path').click()
    	cy.get('.MuiDialog-container > .MuiPaper-root > .MuiDialogActions-root > .MuiButtonBase-root:nth-child(2) > .MuiButton-label').click()
	})

   it('Add upcoming event', function() { 
      cy.visit('http://0.0.0.0:3000/contacts')

      cy.get('.upcoming-header > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root > path').click()

      cy.get('form > .MuiDialogContent-root > .MuiFormControl-root:nth-child(1) > .MuiInputBase-root > .MuiInputBase-input').click()
      .type('Upcoming')
      .should('have.value', 'Upcoming')
   
      cy.get('form > .MuiDialogContent-root > .MuiFormControl-root:nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').click()
      .type('Upcoming')
      .should('have.value', 'Upcoming')
   
      cy.get('form > .MuiDialogContent-root > .MuiFormControl-root > .MuiInputBase-root > #datePicker').click()
      .clear()
      .type('22.08.2021')
      .should('have.value', '22.08.2021')
   
      cy.get('.MuiDialog-root > .MuiDialog-container > .MuiPaper-root > form > .MuiDialogContent-root').click()
   
      cy.get('form > .MuiDialogContent-root > .MuiFormControl-root > .MuiInputBase-root > #timePicker').click()
      .clear()
      .type('10:10')
      .should('have.value', '10:10')

      cy.get('.MuiSelect-root.MuiSelect-select.MuiSelect-selectMenu.MuiInputBase-input.MuiInput-input#company').click()
      cy.contains('Test1').click()
   
      cy.get('.MuiDialogContent-root > .switch-buttons > div > .MuiButton-textPrimary > .MuiButton-label').contains('Uložit').click()

      cy.get('.upcomingevents-table').contains('Upcoming')
   })

   it('Remove upcoming event', function() {   
      cy.visit('http://0.0.0.0:3000/contacts')

      cy.contains('Upcoming').get('.delete-button').click()

      cy.get('.MuiDialog-container > .MuiPaper-root > .MuiDialogActions-root > .MuiButtonBase-root:nth-child(2) > .MuiButton-label').click()
   })

})
