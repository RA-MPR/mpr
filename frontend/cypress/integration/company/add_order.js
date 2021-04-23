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
    
        //order
        cy.get('.MuiPaper-root:nth-child(4) > .MuiCardContent-root > .MuiTypography-root > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root > path').click()

        cy.get('#addRow > .MuiTableCell-root > .MuiFormControl-root > .MuiInputBase-root > #datePicker').click()
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
 
}) 

   