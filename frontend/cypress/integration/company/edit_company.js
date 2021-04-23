describe('Edit company', function() {

    it('Edit company and save changes', function() {
  
        cy.on('uncaught:exception', (err, runnable) => { return false })
    
        cy.viewport(1342, 976)
        cy.visit('http://0.0.0.0:3000/')
    
        //login
        cy.get('#email').type('admin@test.io')
        cy.get('#password').type('poiuztre')
        cy.get('.MuiGrid-root > .MuiGrid-root > div > #login > .MuiButton-label').click()

        cy.contains('Test1').click()
        cy.url().should('eq', 'http://0.0.0.0:3000/company/detail')
        
        cy.contains('Upravit').click()

		cy.get('.grid > .ico > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').click()
		.clear()
		.type('12345679')
		.should('have.value', '12345679')

        cy.get('.billing-address > div > .MuiFormControl-root:nth-child(1) > .MuiInputBase-root > .MuiInputBase-input').click()
		.clear()
		.type('Sadová 3')
		.should('have.value', 'Sadová 3')

        cy.get('.billing-address > div > .MuiFormControl-root:nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').click()
		.clear()
		.type('65432')
		.should('have.value', '65432')

		cy.get('.billing-address > div > .MuiFormControl-root:nth-child(3) > .MuiInputBase-root > .MuiInputBase-input').click()
		.clear()
		.type('Olomouc')
		.should('have.value', 'Olomouc')

        cy.get('.billing-address > div > .MuiFormControl-root:nth-child(4) > .MuiInputBase-root > .MuiInputBase-input').click()
		.clear()
		.type('Česká republika')
		.should('have.value', 'Česká republika')
    
        cy.get('.grid > .main-phone-number > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').click()
		.clear()
		.type('+420789789789')
		.should('have.value', '+420789789789')
    
        cy.get('.contact-address > div > .MuiFormControl-root:nth-child(1) > .MuiInputBase-root > .MuiInputBase-input').click()
		.clear()
		.type('Brněnská 4')
		.should('have.value', 'Brněnská 4')
    
        cy.get('.contact-address > div > .MuiFormControl-root:nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').click()
		.clear()
		.type('89078')
		.should('have.value', '89078')
    
        cy.get('.contact-address > div > .MuiFormControl-root:nth-child(3) > .MuiInputBase-root > .MuiInputBase-input').click()
		.clear()
		.type('Olomouc')
		.should('have.value', 'Olomouc')
    
        cy.get('.contact-address > div > .MuiFormControl-root:nth-child(4) > .MuiInputBase-root > .MuiInputBase-input').click()
		.clear()
		.type('Česká republika')
		.should('have.value', 'Česká republika')
		
		cy.get('.MuiCardContent-root > .grid > .button-area > .company-details-save-button > .MuiButton-label').click()

		//assert
		cy.get('.ico').contains('12345679')
		cy.get('.main-phone-number').contains('+420789789789')
		cy.get('.billing-address').contains('Sadová 3')
		cy.get('.billing-address').contains('65432')
		cy.get('.billing-address').contains('Olomouc')
		cy.get('.billing-address').contains('Česká republika')
		cy.get('.contact-address').contains('Brněnská 4')
		cy.get('.contact-address').contains('89078')
		cy.get('.contact-address').contains('Olomouc')
		cy.get('.contact-address').contains('Česká republika')
	})
 
}) 

   