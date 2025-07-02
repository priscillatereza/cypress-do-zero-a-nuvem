Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data ={
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@teste.com',
    text: 'Teste.'

       
})=>  { // Meu objeto  vai receber como argumento a variavel 'data' que criei em CAC-TAT.CY.js
    cy.get('#firstName').type(data.firstName) // função executada, os comandos que vão ser excutados
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    //cy.get('button[type="submit"]').click()
    cy.contains('button','Enviar').click()  //contains é uma forma de identificar elementos que as vezes eu não tenho um ID Unico

    
})



