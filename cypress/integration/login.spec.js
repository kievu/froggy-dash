/// <reference types="Cypress" />

context('Login', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.server();
  });

  it('Should not be able to login with invalid email address', () => {
    cy.get('[data-cypress="login-button"]').click();
    cy.get('[data-cypress="email-input"] input').type('invalid@email');
    cy.get('[data-cypress="password-input"] input').type('pa$$w0rd');
    cy.get('[data-cypress="login-button"]').click();
    cy.wait(500);
    cy.get('p').contains(
      'There is no user record corresponding to this identifier. The user may have been deleted.',
    );
    cy.get('[data-cypress="login-button"]').click();
    cy.get('[data-cypress="email-input"] input')
      .clear()
      .type('another invalid@email.com');
    cy.get('[data-cypress="password-input"] input')
      .clear()
      .type('pa$$w0rd');
    cy.wait(500);
    cy.get('p').contains(
      'There is no user record corresponding to this identifier. The user may have been deleted.',
    );
  });

  it('Should not be able to login with wrong credentials', () => {
    cy.get('[data-cypress="login-button"]').click();
    cy.get('[data-cypress="email-input"] input').type('wrong@email.com');
    cy.get('[data-cypress="password-input"] input').type('pa$$w0rd');
    cy.get('[data-cypress="login-button"]').click();
    cy.wait(500);
    cy.get('p').contains(
      'There is no user record corresponding to this identifier. The user may have been deleted.',
    );
  });

  it('Should be able to login with correct credentials', () => {
    // https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword
    cy.route('POST', '**/identitytoolkit/v3/relyingparty/**', {
      kind: 'identitytoolkit#VerifyPasswordResponse',
      localId: 'balbalal',
      email: 'correct@email.com',
      displayName: '',
      idToken: 'blablabla',
      registered: true,
      refreshToken: 'blabla',
      expiresIn: '3600',
    });
    cy.get('[data-cypress="login-button"]').click();
    cy.get('[data-cypress="email-input"] input').type('correct@email.com');
    cy.get('[data-cypress="password-input"] input').type('pa$$w0rd');
    cy.get('[data-cypress="login-button"]').click();
    cy.visit('/sensors');
    cy.get('.recharts-wrapper')
      .first()
      .scrollIntoView({ duration: 3000 });
  });
});
