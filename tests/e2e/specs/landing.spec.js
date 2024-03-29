describe("Landing Page", () => {
  describe("when desktop view", () => {
    beforeEach(() => {
      cy.viewport("macbook-13");
    });

    it("should show loading content when fetch users are in progress", () => {
      cy.intercept("api/*", {
        fixture: "random-user",
      }).as("fetchUsers");

      cy.visit("/");

      cy.get(".Landing-loading")
        .find("span")
        .should("contain.text", "Loading data, please wait...");
    });

    it("should show contact when fetch is success", () => {
      cy.intercept("api/*", {
        fixture: "random-user",
      }).as("fetchUsers");

      cy.visit("/");
      cy.wait("@fetchUsers");

      cy.get(".LandingDesktop")
        .find(".LandingDesktop-card")
        .should("exist");
    });

    it("should show 10 users if the page query is `1`", () => {
      cy.intercept("api/*", {
        fixture: "random-user",
      }).as("fetchUsers");

      cy.visit("/");
      cy.wait("@fetchUsers");

      cy.get(".LandingDesktop")
        .find(".LandingDesktop-card")
        .should("have.length", 10);
    });

    it("should show 20 users if the page query is `2`", () => {
      cy.intercept("api/*", {
        fixture: "random-user",
      }).as("fetchUsers");

      cy.visit("/landing?page=2");
      cy.wait("@fetchUsers");

      cy.get(".LandingDesktop")
        .find(".LandingDesktop-card")
        .should("have.length", 20);
    });

    it("should show error content when fetch user is failed", () => {
      cy.intercept("api/*", {
        statusCode: 500,
      });

      cy.visit("/");

      cy.get(".Landing-error")
        .find("p")
        .should("contain.text", "Something wrong.");
    });
  });

  describe("when mobile view", () => {
    beforeEach(() => {
      cy.viewport("iphone-6");
    });

    it("should show loading content when fetch users are in progress", () => {
      cy.intercept("api/*", {
        fixture: "random-user",
      }).as("fetchUsers");

      cy.visit("/");

      cy.get(".Landing-loading")
        .find("span")
        .should("contain.text", "Loading data, please wait...");
    });

    it("should show contact when fetch is success", () => {
      cy.intercept("api/*", {
        fixture: "random-user",
      }).as("fetchUsers");

      cy.visit("/");
      cy.wait("@fetchUsers");

      cy.get(".LandingMobile")
        .find(".LandingMobile-card")
        .should("exist");
    });

    it("should show 10 users if the page query is `1`", () => {
      cy.intercept("api/*", {
        fixture: "random-user",
      }).as("fetchUsers");

      cy.visit("/");
      cy.wait("@fetchUsers");

      cy.get(".LandingMobile")
        .find(".LandingMobile-card")
        .should("have.length", 10);
    });

    it("should show 20 users if the page query is `2`", () => {
      cy.intercept("api/*", {
        fixture: "random-user",
      }).as("fetchUsers");

      cy.visit("/landing?page=2");
      cy.wait("@fetchUsers");

      cy.get(".LandingMobile")
        .find(".LandingMobile-card")
        .should("have.length", 20);
    });

    it("should show error content when fetch user is failed", () => {
      cy.intercept("api/*", {
        statusCode: 500,
      });

      cy.visit("/");

      cy.get(".Landing-error")
        .find("p")
        .should("contain.text", "Something wrong.");
    });
  });
});
