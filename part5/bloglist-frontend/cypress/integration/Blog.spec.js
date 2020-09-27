describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Jon Doe",
      username: "Jon",
      password: "Doe",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  // eslint-disable-next-line jest/expect-expect
  it("login form is shown", function () {
    cy.visit("http://localhost:3000");
    cy.contains("Log in to application");
    cy.contains("username");
  });

  describe("Login", function () {
    // eslint-disable-next-line jest/expect-expect
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("Jon");
      cy.get("#password").type("Doe");
      cy.get("#login-button").click();
      cy.contains("Jon Doe logged in");
    });
    it("fails with wrong credentials", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("test");
      cy.get("#login-button").click();
      cy.contains("Log in to application");
      cy.get(".errorMessage")
        .should("contain", "wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)");
    });
  });
});
