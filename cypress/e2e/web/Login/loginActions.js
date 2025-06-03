import { loginElements } from "./loginElements";

export const loginActions = {
  visitLoginPage: () => {
    cy.visit("/login");
  },

  fillLoginForm: (username, password) => {
    cy.get(loginElements.username).type(username);
    cy.get(loginElements.password).type(password);
  },

  submitLoginForm: () => {
    cy.get(loginElements.submitButton).click();
  },

  doLogin: (username, password) => {
    loginActions.fillLoginForm(username, password);
    loginActions.submitLoginForm();
  },

  doLogout: () => {
    cy.get(loginElements.logoutButton).click();
  },

  checkSuccessMessage: (message) => {
    cy.get(loginElements.successMessage)
      .should("be.visible")
      .should("contain", message);
  },

  checkErrorMessage: (message) => {
    cy.get(loginElements.errorMessage)
      .should("be.visible")
      .should("contain", message);
  },
};
