describe("Note app", function () {
  beforeEach(function () {
    // @ts-ignore
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Justin",
      username: "root",
      password: "root1947",
    };
    cy.request("POST", "http://localhost:3001/api/users", user);
    cy.visit("http://localhost:3000");
  });
  it("front page can be opened", function () {
    // @ts-ignore
    cy.contains("Notes");
    // @ts-ignore
    cy.contains(
      "Note app, Department of Computer Science, University of Helsinki 2020"
    );
  });

  it("login form can be opened", function () {
    // @ts-ignore
    cy.contains("login").click();
  });

  it("user can login", function () {
    // @ts-ignore
    cy.contains("login").click();
    // @ts-ignore
    cy.get("#username").type("root");
    // @ts-ignore
    cy.get("#password").type("root1947");
    // @ts-ignore
    cy.get("#login-button").click();
    // @ts-ignore
    cy.contains("Justin logged in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "root", password: "root1947" });
    });

    it("a new note can be created", function () {
      cy.contains("new Note").click();
      cy.get("input").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });

    describe("and several note exists", function () {
      beforeEach(function () {
        cy.createNote({ content: "first note", important: false });
        cy.createNote({ content: "second note", important: false });
        cy.createNote({ content: "third Note", important: false });
      });

      it("it can be made important", function () {
        cy.contains("second note").contains("make important").click();
        cy.contains("second note").contains("make not important");
      });
    });
  });

  it("login fails with wrong password", function () {
    cy.contains("login").click();
    cy.get("#username").type("root");
    cy.get("#password").type("roots");
    cy.get("#login-button").click();
    cy.get(".error").contains("wrong credentials");

    cy.get("html").should("not.contain", "Justin logged in");
  });
});
