export default class SelectOfferPopup {
    sectionNameElement() {
        return iframe().get('[class *= contentTop] > span').first()
    }

    seatingRowElement() {
        return iframe().get('[class *= seatingRow]')
    }

    seatingPlaceElement() {
        return iframe().get('[class *= seatingColumn]')
    }

    offersElementList() {
        return iframe().get('[class *= offerItemBtn]')
    }

    offerNameElement() {
        return iframe().get('[class *= nameRow]').first()
    }

    offerPriceElement() {
        return iframe().get('[class *= price]').first()
    }

    selectFirstOffer() {
        iframe().get('button[class *= offerItemBtn]').first().click()
    }

    submit() {
        iframe().get('button[class *= contentBottomBtn]').click()
    }
}

const iframe = () => {
    return cy.get('iframe').its('0.contentDocument').its('body').then(cy.wrap);
}