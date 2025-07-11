describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit ('./src/index.html')

  })
  it('verifica o título da aplicação', () => {
    //cy.visit ('./src/index.html')   //VISITANDO A PAGINA QUE ESTA NA MINHA MAQUINA LOCAL
   cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')  //VERIFICNADO QUE ELE É IGUAL AO TITULO CENTRAL DE ATENDIMENTS
  })
  it('preenche os campos obrigatorios e envia o formulario', () => {
    cy.clock()  // add o clock seção 13 avançando no uso do cypress

    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10);
    cy.get('#firstName').type('Priscila teste')
    cy.get('#lastName').type('da Silva')
    cy.get('#email').type('priscila.teste@gmail.com')
    cy.get('#open-text-area').type(longText)
    cy.contains('button','Enviar').click()      //utilizar o contains 

  cy.get('.success').should('be.visible')

  cy.tick(3000) //equivalente a 3 segundos

  cy.get('.success').should('not.be.visible')


  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => { //Criou um teste  que exibe uma mensagem de erro
    cy.clock()  // add o clock seção 13 avançando no uso do cypress

    cy.get('#firstName').type('Priscila teste1') // nome correto
    cy.get('#lastName').type('da Silva') // sobrenome correto
    cy.get('#email').type('priscila.teste@gmail,com') //email de formatação invalido pela ,
    cy.get('#open-text-area').type('teste') //digitamos na area de tex
    cy.get('button[type="submit"]').click() //clicamos no botão 
    
    cy.get('.error').should('be.visible') // e verificamos se uma mensagem de erro esta sendo exibida. a classe error é identificada pelo (.) e should exibe a mensagem
    cy.tick(3000) //equivalente a 3 segundos

     cy.get('.success').should('not.be.visible')
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
    cy.clock()
    cy.get('#firstName').type('Priscila teste1') // nome correro
    cy.get('#lastName').type('da Silva') // sobrenome correto
    cy.get('#email').type('priscila.teste@gmail,com') //email de formatação invalido pela ,
    cy.get('#open-text-area').type('teste') //digitamos na area de texto
    cy.get('#phone-checkbox').check() //marcou o chechkbox telefone, por isso o campo telefone ficoui obrigatorio/ajuste por check-ele so marca o campo
    cy.get('button[type="submit"]').click() //clicamos no botão 
   
    cy.get('.error').should('be.visible') //exibe a mensagem de erro

    cy.tick(3000) //equivalente a 3 segundos
    cy.get('.success').should('not.be.visible')

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

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.clock() // com a funcionalidade .clock podemos congelar o relogio do navegador
    cy.fillMandatoryFieldsAndSubmit() //clicamos no botão 
     
      cy.get('.success').should('be.visible') //exibe a mensagem de sucesso

      cy.tick(3000)// conseguimos avançar no tempo
      cy.get('.success').should('not.be.visible')
    })

    it('envia o formulario com sucesso usando um comando customizado',() => {  //pela pasta commands, passando valors diferentes
      const data = {     //criar uma variavel com nome data ou dados, ela vai armazenar um objeto, um objeto  definimos com abre e fecha chaves
        firstName: 'Priscila',      //esse objeto vai ter algumas propriedades como first name
        lastName: 'Tereza da Silva',  //propriedade lastname
        email: 'priscila@teste.com',  //propriedade e-mail, para propriedades do objeto temos que usar :
        text: 'teste.' //propriedade  que tem seu valor  teste digitado entre aspas
      }
      cy.fillMandatoryFieldsAndSubmit(data) // passar para esse objeto a variavel que criei lá em cima com nome 'data' manda essa varaivel pro commands

      cy.get('.success').should('be.visible')  // valida e exibe a mensagem de sucesso

      //esse cenario abordou sobre criar comandos customizados que recebem uma variavel que nesse caso é um objeto que possui diferentes propriedades
      

    })
    it('envia o formulario com sucesso usando um comando customizado',() => {  // Um comando  customizado é bom quando vamos definir alguns valores padrões pra ele,
      // para que possamos chamar esse comando, passando dados diferentes do padrão, como fizemos aqui
      cy.fillMandatoryFieldsAndSubmit() // objeto, todo nossa execução esta no commands, ele pega os valores padrões de lá

      cy.get('.success').should('be.visible') 

    })
    //Seção 4: selecionadndo as opções em campos de seleção suspensa
    it('seleciona o produto (youtube) por seu texto', () => {  // criou um bloco IT que é nosso caso de teste
      cy.get('#product')  // identificamos o elemento  pelo seu ID 
      .select('YouTube')  //incadiamos o .select e passamos o conteudo da option entre aspas
      .should('have.value', 'youtube')  // verificamos que o valor  foi realmente apresentado
     })

     it('seleciona um produto (Mentoria) por seu valor(value)', () => { 
      cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
     })
     it('seleciona um produto (Blog) por seu indice', () => { 
      cy.get('#product')
      .select(1) // ele esta selecionando pelo indice que é a opção 1 no css
      .should('have.value', 'blog')
     })
    //Seção 4: Marcando inputs do tipo radio com a disponibilidade check
    it('marca o tipo de atendimento "Feedback"', () => { 
      cy.get('input[type="radio"][value="feedback"]')
      .check()  // incadeamos um .check para marcar ele
      .should('be.checked')  // esta checado, com checked conseguimos marca pro tipo radio

      //resultado esperado: pega o campo marca ele e verifica se o "feedback" foi marcado
     })

     it('Marca cada tipo de atendimento', () => { //sobre um array podemos usar o .each = cada
      cy.get('input[type="radio"]')
      .each(typeOfService => {   // o each esta recebendo uma  função
       cy.wrap(typeOfService) // o cy.wrap que sigfinica empacotar, ele empacota o elementos para poder enviar comandos do cypress como os de baixo
       .check()  // comando  .check
       .should('be.checked')  // e ganranti com be.checked que cada um foi marcado

      })
  
    })
//Seção 5: marcando e desmarcando inputs do tipo checkbox:
it('Marca ambos checkbox, depois desmarca o ultimo', () => { 
  cy.get('input[type="checkbox"]')  // ele achou dois elementos de checkbox e ele marca todos que encontrar/ pegou um seletor css mais generico
  .check() // e mandou um check, ele vai marcar cada um dos checkbox
  .should('be.checked') // verificando se eles estão marcados.
  .last() //pega o ultimo checkbox
  .uncheck() //desmarcar
  .should('not.be.checked')//não deve estar mais marcado o telefone
  })
//Seção 7: Fazendo uploads de arquivos com cypress:
it('seleciona um arquivo da pasta fixtures', () => { //criou o teste o bloco IT
  cy.get('#file-upload')  // função de callback, fazer o upload do arquivo/ cy.get pra identificar o elemento file
   .selectFile('cypress/fixtures/example.json')  //para uploads de arquivos usamos .selectfile / estamos encadeando o.selectfile e passando uma fixture criada no cypress
   .should(input => {  // encadea o should ao selectfile,  passando para ele uma função de calback
    expect(input[0].files[0].name).to.equal('example.json')  // essa função recebe o input e fazemos o expect
   })
  
  })
it('seleciona um arquivo da pasta fixtures', () => {
  cy.get('#file-upload')
  .selectFile('cypress/fixtures/example.json',{ action: 'drag-drop'}) //um objeto em javascript pelas chaves e passamos a propiedade action com valor drag-drop
  .should(input => { 
     expect(input[0].files[0].name).to.equal('example.json')
   })  
 })

//
 it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
  cy.fixture('example.json').as('sampleFile') //não precisa passar o caminho da fixture
 cy.get('#file-upload')  // 
   .selectFile('@sampleFile')  //
   .should(input => {  // 
    expect(input[0].files[0].name).to.equal('example.json') 
   })

 })

//Seção 8:lidando com links que abrem em outra aba do navegtador:
it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
  cy.contains('a', 'Política de Privacidade')
  .should('have.attr', 'href', 'privacy.html')
  .and('have.attr', 'target', '_blank')
})

it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
  cy.contains('a', 'Política de Privacidade') // identifiquei o elemento que quero clicar onde useu dois atributos
  .invoke('removeAttr', 'target') // o invoke esta recebendo dois elementos, a removeattr que remove o atributo, e io 2 argumento que4 é o que queremos remover
  .click() // clicar no link no qual  removemos no target e fomos direcionado para pagina de politica e privacidade

  cy.contains('h1','CAC TAT - Política de Privacidade').should('be.visible') // pegar um H1 e o should para garantir que o heading esta visivel
  
})


it('testa a página da política de privacidade de forma independente', () => {// 
  cy.contains('a', 'Política de Privacidade')
  .invoke('removeAttr', 'target')
  .click()

  cy.contains('h1','CAC TAT - Política de Privacidade').should('be.visible')

  })

  //seção 09: simulando dimensoes de um dispositivo movel
//"cy:open:mobile": "cypress open --config viewportWidth=410,viewportHeight=860", no package.json
// "test:mobile": "cypress run --config viewportWidth=410,viewportHeight=860"  execução dos testes em modo hidles com video configurado no cypress.config  video: true

//Seção 12: avançando no uso do cypress
it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
  cy.get('.success')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Mensagem enviada com sucesso.')
    .invoke('hide')
    .should('not.be.visible')
  cy.get('.error')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')
    .invoke('hide')
    .should('not.be.visible')
})


it('preenche o campo da área de texto usando o comando invoke', () => {
cy.get('#open-text-area') //pegou  o campo da area de texto
 .invoke('val', 'Um texto qualquer') //encadeou o e passou o valor especifico
 .should('have.value', 'Um texto qualquer') // verificação de resultado esperado

})

it('faz uma requisição HTTP', () => {  //api TESTE
cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
  .as('getRequest')
  .its('status')
 .should('be.equal', 200) // verificação de resultado esperado
cy.get('@getRequest') 
  .its('statusText')
  .should('be.equal', 'OK')
cy.get('@getRequest')  
  .its('body')
  .should('include', 'CAC TAT')
})

it('encontra o gato escondido', () => {
cy.get('#cat')
  .invoke('show')// pra mostrar um elemento que ta escondido
  .should('be.visible')
cy.get('#title')  
   .invoke('text', 'CAT TAT') // podemos alterar o texto pra brincar
cy.get('#subtitle')
   .invoke('text', 'Eu  amo gatos')
  })

})
