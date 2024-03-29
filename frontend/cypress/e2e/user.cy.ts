/// <reference types="cypress" />

describe("Contacts tests", () => {
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

  it.only("Create New Contact", () => {
    cy.get('[data-test="new-contact-btn"]').click();
    cy.get('[data-test="new-name"]').type("Stephanie Schmidt Coelho");
    cy.get('[data-test="new-phone"]').type("5181429137");
    cy.get('[data-test="new-email"]').type("stephanie@email.com");
    cy.get('[data-test="new-address"]').type(
      "rua professora leonor de barros, 215"
    );
    cy.get('[data-test="add-contact-btn"]').click();
  });

  it("Deleting contact",
    () => {
      cy.get("li")
        .its("length")
        .then((inicialSize) => {
          cy.get('[data-test="delete-btn"]').first().click();
          cy.get("li").should("have.length", inicialSize - 1);
        });
    })

    it("Editing contact", () => {
     cy.get('[data-test="edit-btn"]').first().click()
     cy.get('[data-test="name-input"]').invoke('val').then((oldValue) => {
      cy.get('[data-test="name-input"]').clear().type('Edit Test')

      cy.get('[data-test="save-btn"]').click()

      cy.get('[data-test="name-txt"]').should('contain', (newValue) => {
        expect(newValue).not.to.eq(oldValue)
        expect(newValue).to.eq('Edit Test')
      })
     })
});
})
