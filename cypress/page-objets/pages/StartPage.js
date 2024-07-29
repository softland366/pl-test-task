export default class StartPage {
    selectEventTime(date, time) {
        this.selectMonth(date)
        this.selectDay(date)
        this.selectShowTime(time)
    }

    monthTabElement(date) {
        return cy.get(`[data-tabbed-layout = "${this.getMonthYear(date)}"]`)
    }

    calendarDayElement(date) {
        return cy.get(`[data-tabbed-layout-target="${this.getMonthYear(date)}"] .event-calendar-day-available`)
            .contains(`${date.day}`)
    }

    showTimeElement(time) {
        return cy.get('.show-selection-time').contains(`${time.text}`)
    }

    selectedCalendarDayElement() {
        return cy.get(`.event-calendar-day-selected`)
    }

    offerSectionElementsList() {
        return cy.get('.offers .ready .toggle-section button')
    }

    expandOfferSection() {
        this.offerSectionElementsList().first().click()
    }

    selectFirstOffer() {
        cy.get('.offers-section-content[style *= "visible"] .offer-action button')
            .first().click()
    }

    getMonthYear(date) {
        return `${date.year}-${date.month}`
    }

    selectMonth(date) {
        this.monthTabElement(date).click();
    }

    selectDay(date) {
        this.calendarDayElement(date).click()
    }

    selectShowTime(time) {
        this.showTimeElement(time).click()
    }
}