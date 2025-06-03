Cypress.Commands.add("login", (username, password) => {
  cy.visit("https://the-internet.herokuapp.com/login");
  cy.get("#username").type(username);
  cy.get("#password").type(password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add("logout", () => {
  cy.get(".button.secondary.radius").click();
});
