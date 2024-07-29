const LOGO_SELECTOR = '.header-logo__image'
const CURRENSY_SWITCHER_SELECTOR = '.no-mobile .currency-switcher-modern__current'
const LANGUAGE_SWITCHER_SELECTOR = '.no-mobile .language-switcher-modern__current'

export default class PageHeader {
    constructor() {
        
    }
    
    logo() {
        return cy.get(LOGO_SELECTOR)
    }

    currency() {
        return cy.get(CURRENSY_SWITCHER_SELECTOR)
    }

    language() {
        return cy.get(LANGUAGE_SWITCHER_SELECTOR)
    }
}