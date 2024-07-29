const userData = require('/cypress/fixtures/user.data.json')
const testData = require('/cypress/fixtures/test.data.json')

import 'cypress-wait-until';
import {
	checkoutPage,
	hallMapPage,
	orderDetailsPage,
	selectOfferPopup,
	smartFooter,
	startPage
} from '../../page-objets/UiFacade';

import {
	pageHeader
} from '../../page-objets/UiFacade';

describe('Open event page', () => {
	before(function () {
		cy.clearAllCookies()
			.clearLocalStorage()
			.visit('/')
	})

	it(`title should be equal "${testData.eventName}"`, () => {
		cy.title().should('include', testData.eventName)
	})

	it('logo image should be visible', () => {
		pageHeader.logo().should('be.visible');
	})
	it(`default currency should be equal "${userData.currency}"`, () => {
		pageHeader.currency()
			.should('be.visible')
			.and('have.text', userData.currency);
	})

	it(`default language should be equal "${userData.language}"`, () => {
		pageHeader.language()
			.should('be.visible')
			.and('have.text', userData.language);
	})

	it('button "Next" should not be displayed', () => {
		smartFooter.checkoutButtonElement().should('not.exist')
	})

	describe('Verify elements after date and time option selecting', () => {

		before(function () {
			startPage.selectEventTime(testData.date, testData.time)
		})

		it(`month tab should be active`, () => {
			startPage.monthTabElement(testData.date).should('have.class', 'active');
		})

		it(`day should be selected`, () => {
			startPage.selectedCalendarDayElement().should('have.text', `${testData.date.day}`);
		})

		it('offers for the selected date and time should be available', () => {
			startPage.offerSectionElementsList().should('be.visible')
				.its('length')
				.should('be.greaterThan', 0)
		})

		describe('Select offer and open hall map', () => {
			before(function () {
				startPage.expandOfferSection();
				startPage.selectFirstOffer();
			})

			it('URL should contain "hall-map"', () => {
				cy.url().should('include', 'event/tickets/hall-map?id_event_show');
			})

			it('hall map should contain active zones', () => {
				hallMapPage.availableSectionElementList().its('length').should('be.greaterThan', 0);
			})

			it(`hall map title should contain a name`, () => {
				hallMapPage.header().should('contain', testData.eventName)
			})

			it('hall map title should contain a date', () => {
				hallMapPage.header()
					.should('contain', testData.time.text)
					.and('contain', testData.date.text)
			})

			describe('Select seat and create offer', () => {
				let sectionName
				let seatingRow
				let seatingPlaceNumber

				before(function () {
					hallMapPage.selectAvailableSection()

					hallMapPage.availableSeatElement().then($el => {
						seatingRow = $el.attr('r')
						seatingPlaceNumber = $el.attr('p')
					})

					hallMapPage.selectAvailableSeat()

					selectOfferPopup.sectionNameElement().then($el => {
						sectionName = $el.text()
					})
				})

				it('seating place data should be displayed on offer popup', () => {
					selectOfferPopup.seatingRowElement().should('have.text', seatingRow)
					selectOfferPopup.seatingPlaceElement().should('have.text', seatingPlaceNumber)
				})

				it('popup should contain offers', () => {
					selectOfferPopup.offersElementList().its('length').should('be.greaterThan', 0)
				})

				describe('Select offer and verify footer details', () => {
					let offerPrice
					let offerName

					before(function () {
						selectOfferPopup.offerNameElement().then($el => {
							offerName = $el.text()
						})

						selectOfferPopup.offerPriceElement().then($el => {
							offerPrice = $el.text()
						})

						selectOfferPopup.selectFirstOffer();

						selectOfferPopup.submit();
					})

					it('seat should be marked as selected', () => {
						hallMapPage.availableSeatElement().should('have.class', 'selected')
					})

					it('tickets counter value should be equal "1"', () => {
						smartFooter.counterElement().should('contain.text', 'x1')
					})

					it('stotal price should be displayed on page footer', () => {
						smartFooter.priceElement().should('contain.text', offerPrice.replace(' ', ''))
					})

					it('button "Next" should be displayed', () => {
						smartFooter.checkoutButtonElement()
							.should('be.visible')
							.and('have.text', 'Next')
					})

					describe('Fill order details', () => {
						before(function () {
							smartFooter.submit()
							orderDetailsPage.fillForm(userData)
						})

						it('Terms&Conditions should be checked and disabled', () => {
							orderDetailsPage.termsElement()
								.should('be.checked')
								.and('be.disabled')
						})

						describe('Verify checout page', () => {
							before(function () {
								smartFooter.submit();
							})

							it('checkout title should be displayed', () => {
								checkoutPage.titleElement()
									.should('be.visible')
									.and('have.text', 'Check out')
							})

							it('event card should contain event name', () => {
								checkoutPage.eventNameElement().should('have.text', testData.eventName)
							})

							it('event card should contain event date', () => {
								checkoutPage.eventDateTimeElement().should('contain.text', testData.date.short_text)
							})

							it('event card should contain event time', () => {
								checkoutPage.eventDateTimeElement().should('contain.text', testData.time.text)
							})

							it('order info should contain section name', () => {
								checkoutPage.orderInfoElement().should('contain.text', sectionName)
							})

							it('order info should contain offer information', () => {
								checkoutPage.orderInfoElement().should('contain.text', offerName)
							})

							it('order info should contain seating details', () => {
								checkoutPage.seatingDetailsInfoElement()
									.should('contain.text', `Row:\u00a0${seatingRow}`)
									.and('contain.text', `Seat:\u00a0${seatingPlaceNumber}`)
							})

							it('delivery title should contain the client email', () => {
								checkoutPage.ticketDeliveryTitleElement()
									.should('contain.text', 'Ticket delivery method')

								checkoutPage.ticketDeliveryWayElement()
									.should('be.visible')
									.and('contain.text', userData.email)
							})

							it('Terms&Conditions should be enabled and checked', () => {
								checkoutPage.termsElement()
									.should('be.enabled')
									.and('be.checked')
							})

							it('summary should contain ticket price', () => {
								checkoutPage.summaryBoxElement()
									.should('contain.text', offerPrice)
							})
						})
					})
				})
			})
		})
	})

});