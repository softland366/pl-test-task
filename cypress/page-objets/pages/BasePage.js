export default class BasePage {
    static pause(ms) {
        cy.wait(ms)
    }

    static log(message) {
        cy.log(message)
    }
}