const userData = require('/cypress/fixtures/user.data.json')
const testData = require('/cypress/fixtures/test.data.json')

import 'cypress-wait-until';

let section
let seatingRow
let seatingPlaceNumber

describe('Open event page', () => {
	before(function () {
		cy.clearAllCookies()
			.clearLocalStorage()
			.visit('/')
	})

	it('URL should have paht to tickets event like "/event/tickets?id_event_show"', () => {
		cy.url().should('include', '/event/tickets?id_event_show');
	});

	it(`title should be equal "${testData.eventName}"`, () => {
		cy.title().should('include', testData.eventName)
	})

	it('logo image should be visible', () => {
		cy.get('.header-logo__image').should('be.visible');
	})
	it(`default currency should be equal "${userData.currency}"`, () => {
		cy.get('.no-mobile .currency-switcher-modern__current')
			.should('be.visible')
			.and('have.text', userData.currency);
		})

	it(`default language should be equal "${userData.language}"`, () => {
		cy.get('.no-mobile .language-switcher-modern__current')
			.should('be.visible')
			.and('have.text', userData.language);
	})

	it('button "Next" should not be displayed', () => {
		cy.get('.smart-footer__checkout-btn').should('not.exist')
	})

	it('page information footer should not be displayed', () => {
		cy.get('.smart-footer').should('not.exist');
	})

	describe('Verify elements after date and time option selecting', () => {
		const monthYear = `${testData.date.year}-${testData.date.month}`

		before(function () {
			cy.get(`[data-tabbed-layout = "${monthYear}"]`).click();
			cy.get(`[data-tabbed-layout-target="${monthYear}"] .event-calendar-day-available`)
				.contains(`${testData.date.day}`)
				.click()
			
			cy.get('.show-selection-time')
				.contains(`${testData.time.text}`)
				.click();
		})

		it(`Month ${testData.month} of Year ${testData.year} tab should be active`, () => {
			cy.get(`[data-tabbed-layout = "${monthYear}"]`).should('have.class', 'active');
		})

		it(`Day ${testData.date.day} should be selected`, () => {
			cy.get(`.event-calendar-day-selected`).should('be.visible')
				.and('have.text', `${testData.date.day}`);
		})

		it('Offers for the selected date and time should be available', () => {
			cy.get('.offers .ready .toggle-section button')
				.should('be.visible')
				.its('length')
				.should('be.greaterThan', 0)
		})

		describe('Select seats offer and open hall map', () => {
			before(function () {
				cy.get('.offers .ready .toggle-section button').first().click();
				cy.get('.offers-section-content[style *= "visible"] .offer-action button')
					.first().click();
			})

			it('URL should contain "hall-map"', () => {
				cy.url().should('include', 'event/tickets/hall-map?id_event_show');
			})

			it('hall map should contain active zones', () => {
				cy.get('.zone.highlighted').its('length').should('be.greaterThan', 0);
			})

			it(`hall map title should contain a name`, () => {
				cy.get('.container-btn-back').should('contain', testData.eventName)
			})

			it('hall map title should contain a date', () => {
				cy.get('.container-btn-back')
					.should('contain', testData.time.text)
					.and('contain', testData.date.text)
			})

			describe('Select seat and create offer', () => {

				before(function () {
					cy.get('.zone.highlighted').first().click()

					cy.get('.seats .available').first().then($el => {
						seatingRow = $el.attr('r')
					})
	
					cy.get('.seats .available').first().then($el => {
						seatingPlaceNumber = $el.attr('p')
					})

					cy.get('.seats .available').first().click({ force: true });

					iframe().get('[class *= contentTop] > span').first().then($el => {
						section = $el.text()
					})
				})

				it('seating place data should be displayed on offer popup', () => {
					iframe().get('[class *= seatingRow]').should('have.text', seatingRow)
					iframe().get('[class *= seatingColumn]').should('have.text', seatingPlaceNumber)
				})

				it('list should contain offers', () => {
					iframe().get('[class *= offerItemBtn]').its('length').should('be.greaterThan', 0)
				})

				describe('Select offer and verify footer details', () => {
					let offerPrice
					let offerName

					before(function () {
						cy.log(`section = ${section}`)
						cy.log(`seatingRow = ${seatingRow}`)
						cy.log(`seatingPlace = ${seatingPlaceNumber}`)

						iframe().get('[class *= nameRow]').first().then($el => {
							offerName = $el.text()
						})
						
						iframe().get('[class *= price]').first().then($el => {
							offerPrice = $el.text()
						})

						iframe().get('button[class *= offerItemBtn]').first().click();
						
						iframe().get('button[class *= contentBottomBtn]').click();
					})

					it('seat should be marked as selected', () => {
						cy.get('.seats .available').first().should('have.class', 'selected')
					})

					it('tickets counter should be equal "1"', () => {
						cy.get('.smart-footer__content .v-basket-tickets__counter').first().should('contain.text', 'x1')
					})

					it('should have valid total price', () => {
						cy.get('.smart-footer__total-amount').should('contain.text', offerPrice.replace(' ', ''))
					})

					it('button "Next" should be displayed', () => {
						cy.get('.smart-footer__content .smart-footer__checkout-btn')
							.should('be.visible')
							.and('have.text', 'Next')
					})

					describe('Fill order details', () => {
						before(function () {
							cy.get('.smart-footer__content .smart-footer__checkout-btn').click()
						})

						it('fill order details form', () => {
							cy.get('#email').clear().type(userData.email);
							cy.get('#name_full').clear().type(userData.name);
							cy.get('#phone-country_code').select(userData.country_code, { force: true });
							cy.get('#phone').type(userData.phone);
							cy.get('#id_country').select(userData.consider_country_box_id, {
								force: true
							});
						})

						it('Terms&Conditions should be checked and disabled', () => {
							cy.get('#auth_form #terms_and_conditions_for_service')
								.should('be.checked')
								.and('be.disabled')
						})

						describe('', () => {
							before(function () {
								cy.get('.smart-footer button').contains('Next')
									.should('not.have.class', 'smart-footer__checkout-btn--disabled').click();
							})

							it('checkout header should be displayed', () => {
								cy.get('.checkout-header-title').should('be.visible').and('have.text', 'Check out')
							})

							it('Event card should containt event name', () => {
								cy.get('.order-summary-block .event-name').should('have.text', testData.eventName)
							})

							it('Event card should containt event date', () => {
								cy.get('.order-summary-block .show-datetime').should('contain.text', testData.date.short_text)
							})

							it('event card should containt event time', () => {
								cy.get('.order-summary-block .show-datetime').should('contain.text', testData.time.text)
							})

							it('order info should contain sitting place information', () => {
								cy.get('.order-summary-block .order-info').should('contain.text', section)
							})

							it('order info should contain sitting offer information', () => {
								cy.get('.order-summary-block .order-info').should('contain.text', offerName)
							})

							it('ordet info should contain seating details', () => {
								cy.get('.order-summary-block .item-seating-details').should('contain.text', `Row:\u00a0${seatingRow}`)
								cy.get('.order-summary-block .item-seating-details').should('contain.text', `Seat:\u00a0${seatingPlaceNumber}`)
							}) 

							it('delivery title should contain the client email', () => {
								cy.get('.ticket-delivery__title').should('contain.text', 'Ticket delivery method')
								cy.get('.ticket-delivery__email')
									.should('be.visible')
									.and('contain.text', userData.email)
							})

							it('Terms&Conditions should be checked and enabled', () => {
								cy.get('.terms input')
									.should('be.enabled')
									.and('be.checked')
							})

							it('summary shoud contain ticket price', () => {
								cy.get('.summary-block').should('contain.text', offerPrice)
							})
						})
					})
				})
			})
		})
	})

});


const iframe = () => {
	return cy.get('iframe').its('0.contentDocument').its('body').then(cy.wrap);
}