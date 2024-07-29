const { defineConfig } = require('cypress');

module.exports = defineConfig({
	fixturesFolder: 'cypress/fixtures',
	screenshotsFolder: 'cypress/screenshots',
	videosFolder: 'cypress/videos',
	chromeWebSecurity: false,
	e2e: {
		baseUrl: 'https://laperle.platinumlist.net',
		// retries: {
		// 	runMode: 1,
		// 	openMode: 1
		// },
		watchForFileChanges: false,
		waitForAnimations: false,
		animationDistanceThreshold: 20,
		defaultCommandTimeout: 5000,
		execTimeout: 60000,
		pageLoadTimeout: 60000,
		requestTimeout: 15000,
		responseTimeout: 15000,
		video: false,
		testIsolation: false,
		setupNodeEvents(on, config) {
			
		},
	},
});
