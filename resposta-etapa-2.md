# Resposta Etapa 2 - Sistema de Restaurante

# Perguntas para o PO - Sistema de Restaurante

Antes de criar os cenários de teste, provavelmente durante a planning realizaria essas perguntas para o PO do time para melhor entendimento da demanda

# Sobre o Ponto de Venda (POS):
   - Quais são os campos obrigatórios para registrar um pedido no POS?
   - Como é feita a validação dos dados do pedido antes do envio para a cozinha?
   - Existe algum fluxo de confirmação antes do envio do pedido para a cozinha?
   - Como são tratados pedidos com modificações (ex: sem cebola, bem passado)?
   - Como são tratados erros de digitação ou pedidos incorretos?

# Sobre os Monitores da Cozinha:
   - Quais são os critérios para a exibição das cores e ícones nos monitores?
         - Quais são as cores que serão utilizadas ? 
         - Quais os ícones que serão utilizados ?
   - Como é feita a confirmação de recebimento do pedido na cozinha?
   - Existe algum sistema de notificação quando um novo pedido chega?
   - Como é feito o controle de tempo entre o recebimento e a preparação do pedido?
# Sobre o Fluxo de Pedidos:
   - Qual é o tempo esperado entre o registro do pedido e sua entrega ao cliente?
   - Como é feita a confirmação de que o pedido foi entregue ao cliente?
   - Como são tratados pedidos para viagem/entrega?



## BDD (Behavior Driven Development)



### 1. Validações do POS

Feature: Validação do Sistema POS
  Como um atendente do restaurante
  Eu quero validar o funcionamento do sistema POS
  Para garantir que os pedidos sejam registrados corretamente

  Scenario: Verificar acessibilidade do sistema POS 
    Given que o atendente está na tela inicial
    When ele tenta acessar o sistema POS
    Then o sistema deve estar acessível e carregar corretamente

  Scenario: Validar listagem de produtos
    Given que o sistema POS está acessível
    When o atendente visualiza a lista de produtos
    Then todos os produtos devem estar listados corretamente
    And os preços devem estar atualizados

  Scenario: Registrar pedido com sucesso
    Given que o atendente está no sistema POS
    When ele seleciona os itens do pedido
    And clica no botão de finalizar pedido
    Then o pedido deve ser registrado com sucesso
    And uma confirmação deve ser exibida

  Scenario: Validar preços dos produtos
    Given que o sistema POS está acessível
    When o atendente verifica os preços dos produtos
    Then todos os preços devem estar corretos
    And atualizados conforme tabela vigente

  Scenario: Testar botão de finalizar pedido
    Given que o atendente está no sistema POS
    When ele tenta finalizar um pedido
    Then o botão deve estar funcionando corretamente
    And deve processar o pedido adequadamente

### 2. Validações dos Monitores da Cozinha

Feature: Validação dos Monitores da Cozinha
  Como um funcionário da cozinha
  Eu quero validar o funcionamento dos monitores
  Para garantir que os pedidos sejam visualizados corretamente

  Scenario: Visualizar novo pedido nos monitores
    Given que um pedido foi registrado no POS
    When o pedido é transmitido para os monitores
    Then o pedido deve aparecer nos monitores da cozinha
    And as cores e ícones devem estar corretos

  Scenario: Atualização de status do pedido
    Given que um pedido está visível nos monitores
    When o status do pedido é alterado
    Then a atualização deve ser refletida imediatamente
    And as informações devem estar completas

  Scenario: Validar exibição de cores e ícones
    Given que um pedido está nos monitores
    When o pedido é exibido
    Then as cores devem estar de acordo com o padrão
    And os ícones devem representar corretamente o tipo de pedido

  Scenario: Verificar informações completas do pedido
    Given que um pedido está nos monitores
    When o pedido é visualizado
    Then todas as informações devem estar presentes
    And organizadas de forma clara e legível

### 3. Validações do Fluxo Completo

Feature: Validação do Fluxo Completo de Pedidos
  Como um gerente do restaurante
  Eu quero validar o fluxo completo de pedidos
  Para garantir a eficiência do processo

   Scenario: Cliente faz pedido de refeição com sucesso
    Given que o cliente está no restaurante
    When o cliente faz um pedido de refeição
    And a equipe registra o pedido no sistema POS
    Then o pedido deve aparecer nos monitores da cozinha
    And a equipe da cozinha deve preparar a refeição
    And a refeição deve ser entregue ao cliente


  Scenario: Atualização de status em todas as etapas
    Given que um pedido está em andamento
    When o status é alterado em qualquer etapa
    Then todas as interfaces devem ser atualizadas
    And o histórico de alterações deve ser mantido

  Scenario: Validar tempo de processamento
    Given que um pedido foi registrado
    When o pedido é processado
    Then o tempo total deve estar dentro do esperado
    And deve seguir o padrão estabelecido

  Scenario: Verificar histórico de alterações
    Given que um pedido está em andamento
    When são feitas alterações no status
    Then o histórico deve ser registrado
    And deve ser possível visualizar todas as mudanças

## Cenários para Automação

1. **Cenários para Automação**
   - Cenários que serão automatizados:
     1. Cliente faz pedido de refeição com sucesso
     2. Validar listagem de produtos
     3. Registrar pedido com sucesso
     4. Validar preços dos produtos - Somente API
     5. Testar botão de finalizar pedido
     6. Visualizar novo pedido nos monitores
     7. Atualização de status do pedido
     8. Verificar informações completas do pedido

   - Cenários que serão manuais:
     1. Verificar acessibilidade do sistema POS
     2. Testes de usabilidade e experiência do usuário
     3. Validar exibição de cores e ícones

   - Cenários de Performance
     1. Validações de tempo e performance

2. **Estratégia de Automação**
   - Utilizar Cypress para automação web
   - Implementar testes de API para validações de backend
   - Criar relatórios automatizados de execução
   - Implementar CI/CD para execução contínua

## Pseudo-código da Automação (Cypress)

```javascript
describe("Sistema de Restaurante", () => {
  beforeEach(() => {
    // Setup inicial
    cy.visit("/pos");
    cy.intercept("POST", "/api/pedidos").as("registrarPedido");
    cy.intercept("GET", "/api/monitores-cozinha/*").as("verificarPedido");
  });

  it("deve processar um pedido completo com sucesso", () => {
    // Dados do pedido
    const pedido = {
      id: "123",
      itens: ["Prato Principal", "Bebida"],
      mesa: "5",
      status: "novo",
    };

    // Teste do POS
    cy.get('[data-testid="lista-produtos"]').should("be.visible");
    cy.get('[data-testid="produto-prato-principal"]').click();
    cy.get('[data-testid="produto-bebida"]').click();
    cy.get('[data-testid="botao-finalizar-pedido"]').click();

    // Verificar registro do pedido
    cy.wait("@registrarPedido").its("response.statusCode").should("eq", 200);
    cy.get('[data-testid="status-pedido"]').should("contain", "registrado");

    // Verificar transmissão para monitores
    cy.visit("/monitores-cozinha");
    cy.wait("@verificarPedido").its("response.statusCode").should("eq", 200);
    cy.get(`[data-testid="pedido-${pedido.id}"]`).should("be.visible");
    cy.get(`[data-testid="pedido-${pedido.id}"]`).should(
      "have.class",
      "novo-pedido"
    );

    // Simular preparo
    cy.get(`[data-testid="pedido-${pedido.id}"]`)
      .find('[data-testid="botao-iniciar-preparo"]')
      .click();
    cy.get(`[data-testid="pedido-${pedido.id}"]`).should(
      "have.class",
      "em-preparo"
    );

    // Simular entrega
    cy.get(`[data-testid="pedido-${pedido.id}"]`)
      .find('[data-testid="botao-finalizar-preparo"]')
      .click();
    cy.get(`[data-testid="pedido-${pedido.id}"]`).should(
      "have.class",
      "entregue"
    );
  });
});
```

## Resposta para Componentes Não Automatizáveis

Se não fosse possível automatizar algum componente do sistema, eu procederia da seguinte forma:

1. **Documentação Detalhada:**

   - Criar documentação detalhada dos testes manuais necessários
   - Descrever os passos de teste, dados de entrada e resultados esperados
   - Incluir screenshots e vídeos quando relevante

2. **Testes Exploratórios:**

   - Realizar sessões de testes exploratórios estruturados
   - Documentar os cenários testados e resultados encontrados
   - Focar em áreas de maior risco

3. **Testes de Regressão Manual:**

   - Criar uma suíte de testes de regressão manual
   - Priorizar os cenários mais críticos
   - Estabelecer uma frequência de execução

4. **Monitoramento:**

   - Implementar logs detalhados no sistema
   - Criar dashboards para monitoramento
   - Estabelecer alertas para comportamentos inesperados

5. **Integração com Testes Automatizados:**
   - Integrar os testes manuais com os automatizados
   - Criar pontos de verificação onde os testes manuais e automatizados se encontram
   - Manter um registro claro do que é automatizado e o que é manual
