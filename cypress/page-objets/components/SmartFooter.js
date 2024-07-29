const CHECKOUT_BUTTON_SELECTOR = '.smart-footer__checkout-btn';
export default class SmartFooter {

    checkoutButtonElement() {
        return cy.get(CHECKOUT_BUTTON_SELECTOR)
    }

    submit() {
        this.checkoutButtonElement()
            .should('not.have.class', 'smart-footer__checkout-btn--disabled')
            .click()
    }

    counterElement() {
        return cy.get('.smart-footer__content .v-basket-tickets__counter').first()
    }

    priceElement() {
        return cy.get('.smart-footer__total-amount')
    }
}