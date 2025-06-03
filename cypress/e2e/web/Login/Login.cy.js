import { loginActions } from "./loginActions";

describe("Login Page", () => {
  beforeEach(() => {
    loginActions.visitLoginPage();
  });

  it("should successfully login with valid credentials", () => {
    const username = "tomsmith";
    const password = "SuperSecretPassword!";

    loginActions.doLogin(username, password);

    cy.url().should("include", "/secure");
    loginActions.checkSuccessMessage("You logged into a secure area!");
  });

  it("should display error with invalid credentials", () => {
    const username = "invalid_user";
    const password = "invalid_password";

    loginActions.doLogin(username, password);

    cy.url().should("include", "/login");
    loginActions.checkErrorMessage("Your username is invalid!");
  });

  it("should validate required fields", () => {
    loginActions.submitLoginForm();

    cy.url().should("include", "/login");
    cy.get(".flash.error").should("be.visible");
  });

  it("should validate email format", () => {
    const invalidEmail = "invalid_email";

    loginActions.doLogin(invalidEmail, "any_password");

    cy.url().should("include", "/login");
    cy.get(".flash.error").should("be.visible");
  });

  it("should keep user on login page after logout", () => {
    loginActions.doLogin("tomsmith", "SuperSecretPassword!");
    loginActions.doLogout();

    cy.url().should("include", "/login");
    loginActions.checkSuccessMessage("You logged out of the secure area!");
  });
});
