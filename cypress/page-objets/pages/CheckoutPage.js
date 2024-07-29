export default class CheckoutPage {
    titleElement() {
        return cy.get('.checkout-header-title')
    }

    eventNameElement() {
        return cy.get('.order-summary-block .event-name')
    }

    eventDateTimeElement() {
        return cy.get('.order-summary-block .show-datetime')
    }

    orderInfoElement() {
        return cy.get('.order-summary-block .order-info')
    }

    seatingDetailsInfoElement() {
        return cy.get('.order-summary-block .item-seating-details')
    }

    ticketDeliveryTitleElement() {
        return cy.get('.ticket-delivery__title')
    }

    ticketDeliveryWayElement() {
        return cy.get('.ticket-delivery__email')
    }

    termsElement() {
        return cy.get('.terms input')
    }

    summaryBoxElement() {
        return cy.get('.summary-block')
    }
}