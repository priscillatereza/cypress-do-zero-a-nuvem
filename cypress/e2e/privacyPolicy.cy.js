
Cypress._.times(3,() => {  //CONSEGUIMOS EMPACOTAR O CODIGO E ELE EXECUTA 3 VEZES
 it('testa a página da política de privacidade de forma independente', () =>{
cy.visit ('./src/privacy.html')

cy.contains('h1','CAC TAT - Política de Privacidade').should('be.visible')
cy.contains('Talking About Testing').should('be.visible') // Verificações de resultdo esperado

})   

}) 

