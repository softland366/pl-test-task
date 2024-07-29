export default class HallMapPage {

    availableSectionElementList() {
        return cy.get('.zone.highlighted')
    }

    header() {
        return cy.get('.container-btn-back')
    }

    selectAvailableSection() {
        this.availableSectionElementList().first().click()
    }

    availableSeatElement() {
        return cy.get('.seats .available').first()
    }

    selectAvailableSeat() {
        this.availableSeatElement().click({ force: true });
    }
}
