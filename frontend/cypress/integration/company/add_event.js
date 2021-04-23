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
 
}) 

   