describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'post-order.json' }).as(
      'createOrder'
    );
    cy.viewport(1300, 800);
    cy.visit('/');
  });

  describe('ingredient data', () => {
    it('should display the correct number of ingredients for each category', () => {
      cy.get('[data-cy=bun-ingredients] li').should('have.length', 2);
      cy.get('[data-cy=mains-ingredients] li').should('have.length', 2);
      cy.get('[data-cy=sauces-ingredients] li').should('have.length', 2);
    });
  });

  describe('add ingredients to constructor', () => {
    it('should add bun correctly', () => {
      cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
      cy.get('[data-cy=constructor-bun-1]').contains('Булка 1').should('exist');
      cy.get('[data-cy=constructor-bun-2]').contains('Булка 1').should('exist');
    });

    it('should add main and sauce ingredients to the constructor', () => {
      cy.get('[data-cy=mains-ingredients]')
        .find('button')
        .contains('Добавить')
        .click();
      cy.get('[data-cy=sauces-ingredients]')
        .find('button')
        .contains('Добавить')
        .click();
      cy.get('[data-cy=constructor-ingredients]')
        .contains('Начинка 1')
        .should('exist');
      cy.get('[data-cy=constructor-ingredients]')
        .contains('Соус 1')
        .should('exist');
    });
  });

  describe('ingredient modal', () => {
    it('should close modal by clicking on the cross', () => {
      cy.get('[data-cy=mains-ingredients] li').first().click();
      cy.get('[data-cy=modal]').contains('Начинка 1').should('be.visible');
      cy.get('[data-cy=modal-button-close]').click();
      cy.get('[data-cy=modal]').should('not.exist');
    });

    it('should close modal by clicking on overlay', () => {
      cy.get('[data-cy=bun-ingredients] li').first().click();
      cy.get('[data-cy=modal]').contains('Булка 1').should('be.visible');
      cy.get('[data-cy=modal-overlay]').click({ force: true });
      cy.get('[data-cy=modal]').should('not.exist');
    });
  });

  describe('order creation', () => {
    beforeEach(() => {
      window.localStorage.setItem(
        'refreshToken',
        JSON.stringify('mockRefreshToken')
      );
      cy.setCookie('accessToken', 'mockAccessToken');
    });
    afterEach(() => {
      cy.clearLocalStorage();
      cy.clearCookies();
    });

    it('should display the correct user data', () => {
      cy.get('[data-cy=user]').contains('Аня').should('exist');
    });

    it('should create an order successfully', () => {
      cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
      cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
      cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();

      cy.get('[type=button]').contains('Оформить заказ').click();

      cy.wait('@createOrder', { timeout: 10000 })
        .its('response.statusCode')
        .should('eq', 200);

      cy.get('[data-cy=modal]').contains('052816').should('be.visible');
      cy.get('[data-cy=modal-button-close]').click();
      cy.get('[data-cy=modal]').should('not.exist');

      cy.get('[data-cy=burger-constructor]')
        .should('contain', 'Выберите булки')
        .and('contain', 'Выберите начинку');
    });
  });
});
