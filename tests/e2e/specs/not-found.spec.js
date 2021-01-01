describe("Not Found Page", () => {
  it("should show page when user access path besides `/` or `landing`", () => {
    cy.visit("/about");
    cy.contains("p", "Page Not Found");
  });

  it("should navigate to landing page when `Take me away` button clicked", () => {
    cy.visit("/about");
    cy.get("#BtnBackToLanding").click();
    cy.url().should("include", "/landing");
  });
});
