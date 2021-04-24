describe('Company tests', function() {
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

	it('Add new company', function() {
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

	it('Add company event', function() {
        cy.contains('Test1').click()
        cy.url().should('eq', 'http://0.0.0.0:3000/company/detail')

		//event
		cy.get('.MuiPaper-root:nth-child(1) > .MuiCardContent-root > .MuiTypography-root > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root').click()
		cy.get('.new-grid > .name > .MuiFormControl-root > .MuiInputBase-root > #eventName').click()
		.type('Event')
		.should('have.value', 'Event')
		
		cy.get('.new-grid > .description > .MuiFormControl-root > .MuiInputBase-root > #eventDesc').click()
		.type('Event test')
		.should('have.value', 'Event test')
		
		cy.get('.new-grid > .date > .MuiFormControl-root > .MuiInputBase-root > #datePicker').click()
		.clear()
		.type('10.06.2021')
		.should('have.value', '10.06.2021')

		cy.get('#timePicker').click()
		.clear()
		.type('10:23')
		.should('have.value', '10:23')
		
		//submit
		cy.get('.MuiTableCell-root > .new-grid > .new-event-buttons > .MuiButton-containedPrimary > .MuiButton-label').click()

		//assert
		cy.get('.events-table').contains('Event')
		cy.get('.events-table').contains('Event test')
		cy.get('.events-table').contains('10.06.2021')
		cy.get('.events-table').contains('10:23')
    })

	it('Add company order', function() {
        cy.contains('Test1').click()
        cy.url().should('eq', 'http://0.0.0.0:3000/company/detail')
    
        //order
        cy.get('.MuiPaper-root:nth-child(4) > .MuiCardContent-root > .MuiTypography-root > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root > path').click()

        cy.get('#addRow #datePicker').click()
        .clear()
        .type('13.06.2021')
        .should('have.value', '13.06.2021')

        cy.get('.MuiPaper-root:nth-child(4) > .MuiCardContent-root > .MuiTypography-root > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root').click()
        cy.get('#addRow > .MuiTableCell-root > .MuiFormControl-root > .MuiInputBase-root > #orderNumber').click()
        .type('001')
        .should('have.value', '001')
        
        cy.get('#addRow > .MuiTableCell-root > .MuiFormControl-root > .MuiInputBase-root > #orderCost').click()
        .type('10000')
        .should('have.value', '10000')
        
        //submit
        cy.get('#addRow > .MuiTableCell-root > .MuiButtonBase-root:nth-child(1) > .MuiIconButton-label > .MuiSvgIcon-root').click()

        //assert
        cy.get('.orderTableRow .MuiTableCell-body').contains('13.06.2021')
        cy.get('.orderTableRow .MuiTableCell-body').contains('001')
        cy.get('.orderTableRow .MuiTableCell-body').contains('Podepsaná objednávka')
        cy.get('.orderTableRow .MuiTableCell-body').contains('10000')
    })

	it('Edit company info', function() {
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

	it('Remove company', function() {
		cy.contains('Test1').click()
		cy.url().should('eq', 'http://0.0.0.0:3000/company/detail')

        cy.contains('Smazat').click()
		cy.get('.MuiDialog-container > .MuiPaper-root > .MuiDialogActions-root > .MuiButtonBase-root:nth-child(2) > .MuiButton-label').click()

		cy.url().should('eq', 'http://0.0.0.0:3000/')
	})

})
