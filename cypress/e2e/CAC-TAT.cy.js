describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit ('./src/index.html')

  })
  it('verifica o título da aplicação', () => {
    //cy.visit ('./src/index.html')   //VISITANDO A PAGINA QUE ESTA NA MINHA MAQUINA LOCAL
   cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')  //VERIFICNADO QUE ELE É IGUAL AO TITULO CENTRAL DE ATENDIMENTS
  })
  it('preenche os campos obrigatorios e envia o formulario', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10);
    cy.get('#firstName').type('Priscila teste')
    cy.get('#lastName').type('da Silva')
    cy.get('#email').type('priscila.teste@gmail.com')
    cy.get('#open-text-area').type(longText)
    cy.get('button[type="submit"]').click()

  cy.get('.success').should('be.visible')

  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => { //Criou um teste  que exibe uma mensagem de erro
    cy.get('#firstName').type('Priscila teste1') // nome correro
    cy.get('#lastName').type('da Silva') // sobrenome correto
    cy.get('#email').type('priscila.teste@gmail,com') //email de formatação invalido pela ,
    cy.get('#open-text-area').type('teste') //digitamos na area de tex
    cy.get('button[type="submit"]').click() //clicamos no botão 
    
    cy.get('.error').should('be.visible') // e verificamos se uma mensagem de erro esta sendo exibida. a classe error é identificada pelo (.) e should exibe a mensagem
  })
  it('Campo telefone continua vazio quando preenchido com um valor não numerico ', () => {
    cy.get('#phone') //buscamos o campo telefone do tipo numero // encadear mais de um comando e fica tranquilo colocar tudo na mesma linha
     .type('abcde') // ele não exibe pois é um campo numerico, não vai aceitar letras
     .should('have.value', '' ) // valor vazio, string vazia

  })
  it('Campo telefone continua vazio quando preenchido com um valor não numerico ', () => {
    cy.get('#phone') //buscamos o campo telefone do tipo numero // encadear mais de um comando e fica tranquilo colocar tudo na mesma linha
     .type('abcde') // ele não exibe pois é um campo numerico, não vai aceitar letras
     .should('have.value', '' ) // mostar o valor vazio, string vazia

  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Priscila teste1') // nome correro
    cy.get('#lastName').type('da Silva') // sobrenome correto
    cy.get('#email').type('priscila.teste@gmail,com') //email de formatação invalido pela ,
    cy.get('#open-text-area').type('teste') //digitamos na area de texto
    cy.get('#phone-checkbox').click() //marcou o chechkbox telefone, por isso o campo telefone ficoui obrigatorio
    cy.get('button[type="submit"]').click() //clicamos no botão 
   
    cy.get('.error').should('be.visible') //exibe a mensagem de erro
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
    .type('Priscila teste1') // nome 
    .should('have.value', 'Priscila teste1')
    .clear()
    .should('have.value','')
    cy.get('#lastName')
    .type('da Silva') // nome 
    .should('have.value', 'da Silva')
    .clear()
    .should('have.value','')
    cy.get('#email')
    .type('priscila.teste@gmail,com') // nome 
    .should('have.value', 'priscila.teste@gmail,com')
    .clear()
    .should('have.value','')
    cy.get('#phone')
    .type('123456789') // nome 
    .should('have.value', '123456789')
    .clear()
    .should('have.value','')
   
  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
  cy.get('button[type="submit"]').click() //clicamos no botão 
   
    cy.get('.error').should('be.visible') //exibe a mensagem de erro
  })

  it.only('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit() //clicamos no botão 
     
      cy.get('.success').should('be.visible') //exibe a mensagem de sucesso
    })
})
