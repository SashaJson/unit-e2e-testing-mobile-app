//
describe('End Two End Testing app', () => {
	beforeEach(async () => {
		await device.reloadReactNative();
	});
	it('0. Check that "Default Screen" has text "Enter"', async () => {
		await expect(element(by.text('Enter'))).toExist();
	}); // it (0. Check that "Default Screen" has text "Enter")
	it('1. Insert text in title', async () => {
		await element(by.id('titleInput')).typeText('passcode');
		await element(by.id('titleInputEnter')).tap();
	}); // it (1. Insert text in title)
	it('2. Tap "Enter" and check page has component "Avatar"', async () => {
		await expect(element(by.text('Exit'))).toExist();
		await expect(element(by.text('WEATHER'))).toExist();
		await expect(element(by.text('HOME'))).toExist();
		await waitFor(element(by.id('avatar'))).toExist().withTimeout(5000);
	}); // it (2. Tap "Enter" and check page has component "Avatar")
	it('2. Go to the screen "Weather Screen" and check that screen "Weather Screen" has text "Your weather for the next 12 hours"', async () => {
		// while testing with configuration ‘android.emu.debug’ there is debug message which overflows the button
		// required for this step. I encountered problem with detox tests running with configuration ‘android.emu.release’.
		// Tests just stuck on first step and never go further. Anna told me that you want to check E2E tests ASAP
		// so I decided to not waste my time on debugging and implemented the first workaround that came to my mind
		await element(by.id('WEATHER')).tap();
		await element(by.id('WEATHER')).tap();
		await element(by.id('WEATHER')).tap();
		await element(by.id('show')).tap();
		await waitFor(element(by.text('Your weather for the next 12 hours'))).toExist().withTimeout(6000);
	}) // it (2. Go to the screen "Weather Screen" and check that screen "Weather Screen" has text "Your weather for the next 12 hours")
}); // describe(End Two End Testing app)
