Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Priscila teste')
    cy.get('#lastName').type('da Silva')
    cy.get('#email').type('priscila.teste@gmail.com')
    cy.get('#open-text-area').type('Teste.')
    cy.get('button[type="submit"]').click()

    
})



