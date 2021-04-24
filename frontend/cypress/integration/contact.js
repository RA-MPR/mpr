describe('Contact tests', function() {
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

    it('Add contact person', function() {
        cy.contains('Test1').click()
        cy.url().should('eq', 'http://0.0.0.0:3000/company/detail')

        //contact
        cy.get('.MuiCardContent-root > .MuiTypography-gutterBottom > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root').click()
        cy.get('.MuiTableRow-root > .MuiTableCell-root:nth-child(1) > .MuiFormControl-root > .MuiInputBase-root:nth-child(2) > .MuiInputBase-input').click()
        .type('Pavel')
        .should('have.value', 'Pavel')
        
        cy.get('.MuiTableRow-root > .MuiTableCell-root:nth-child(2) > .MuiFormControl-root > .MuiInputBase-root:nth-child(2) > .MuiInputBase-input').click()
        .type('Novák')
        .should('have.value', 'Novák')
        
        cy.get('.MuiTableRow-root > .MuiTableCell-root:nth-child(3) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').click()
        .type('novak@email.com')
        .should('have.value', 'novak@email.com')
        
        cy.get('.MuiTableRow-root > .MuiTableCell-root:nth-child(4) > .MuiFormControl-root > .MuiInputBase-root:nth-child(2) > .MuiInputBase-input').click()
        .type('+420223456789')
        .should('have.value', '+420223456789')
        
        cy.get('.MuiTable-root > .MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root:nth-child(5) > .hide-button-shadows').click()
        cy.get('.MuiPaper-root:nth-child(1) > .MuiCardContent-root > .MuiTypography-root > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root').click()
        
        //assert
        cy.contains('Pavel Novák')
        cy.contains('novak@email.com')
        cy.contains('+420223456789')
    })

    it('Remove contact person', function() {
        cy.contains('Test1').click()
        cy.url().should('eq', 'http://0.0.0.0:3000/company/detail')

        cy.get('.MuiTableCell-root > .MuiIconButton-sizeSmall > .MuiIconButton-label > .MuiSvgIcon-root > path').click()
 
        cy.get('.MuiDialog-container > .MuiPaper-root > .MuiDialogActions-root > .MuiButtonBase-root:nth-child(2) > .MuiButton-label').click()
    })
 
}) 

   