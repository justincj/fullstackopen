/* eslint-disable jest/expect-expect */
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
  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "Jon", password: "Doe" });
    });
    it("A blog can be created", function () {
      cy.contains("create new").click();
      cy.get("#title").type("dummy title");
      cy.get("#url").type("dummy url");
      cy.get("#author").type("dummy author");
      cy.get(".create").click();
      cy.wait(500);
      cy.contains("dummy title");
    });
    describe("after blog creation", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "dummy title",
          url: "dummy url",
          author: "dummy author",
        });
      });

      it("user can like a blog", function () {
        cy.get(".View").click();
        cy.contains("likes");
        cy.contains("like").click();
        cy.contains("likes 1");
      });
      it("can remove the blog", function () {
        cy.get(".View").click();
        cy.contains("remove").click();
        cy.get(".View").should("not.exist");
      });
      it("blogs are sorted in order", function () {
        cy.createBlog({
          title: "dummy title2",
          url: "dummy url2",
          author: "dummy author2",
          likes: 3,
        });
        cy.createBlog({
          title: "dummy title3",
          url: "dummy url3",
          author: "dummy author3",
          likes: 2,
        });
        // eslint-disable-next-line jest/valid-expect-in-promise
        cy.get(".Blog").then((blogs) => {
          expect(blogs[0].textContent).contains("likes 3");
          expect(blogs[1].textContent).contains("likes 2");
          expect(blogs[2].textContent).contains("likes 0");
        });
      });
    });
  });
});
