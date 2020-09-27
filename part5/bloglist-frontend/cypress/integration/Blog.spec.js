describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Jon Doe",
      username: "Jon",
      password: "Doe",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
  });

  it("login form is shown", function () {
    cy.visit("http://localhost:3000");
    cy.contains("Log in to application");
    cy.contains("username");
  });
});
