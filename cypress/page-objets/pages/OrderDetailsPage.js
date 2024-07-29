export default class OrderDetailsPage {
    fillForm(userData) {
        cy.get('#email').clear().type(userData.email);
        cy.get('#name_full').clear().type(userData.name);
        cy.get('#phone-country_code').select(userData.country_code, {
            force: true
        });
        cy.get('#phone').type(userData.phone);
        cy.get('#id_country').select(userData.consider_country_box_id, {
            force: true
        });
    }

    termsElement() {
        return cy.get('#auth_form #terms_and_conditions_for_service')
    }
}