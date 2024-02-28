/// <reference types="cypress" />

describe("New account tests", () => {
  beforeEach(() => {
    cy.request("POST", "http://127.0.0.1:8000/api/token/", {
      username: "mateusceci12",
      password: "asdf!@#$",
    });
    cy.visit("http://localhost:5173/login");
    cy.get('[data-test="username-login"]').type("mateusceci12");
    cy.get('[data-test="password-login"]').type("asdf!@#$");
    cy.get("form").submit();
  });

  it("Creating first contact", () => {
    cy.get('[data-test="no-contacts"]').should("exist").contains("No contacts");
    cy.get('[data-test="new-contact-btn"]').click();
    cy.get('[data-test="new-name"]').type("Stephanie Schmidt Coelho");
    cy.get('[data-test="new-phone"]').type("5181429137");
    cy.get('[data-test="new-email"]').type("stephanie@email.com");
    cy.get('[data-test="new-address"]').type(
      "rua professora leonor de barros, 215"
    );
    cy.get('[data-test="add-contact-btn"]').click();
  });
});
