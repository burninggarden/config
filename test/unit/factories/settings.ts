import FS from 'fs';
import Tap from 'tap';
import Settings from 'interfaces/settings';
import {FileEncoding} from '@burninggarden/enums';
import SettingsFactory from 'factories/settings';

Tap.test('.buildSettings()', suite => {
	suite.test('returns the expected settings when the specified settings file exists', test => {
		const filepath = '/tmp/bg-settings.json';

		const expectedSettings: Settings = {
			tempDirectoryPath: '/weathertop',
			mysql: {
				username: 'gandalf',
				hostname: 'https://google.com',
				password: 'speak-friend-and-enter',
				port: 1234
			}
		};

		const contents = JSON.stringify(expectedSettings);

		FS.writeFileSync(filepath, contents, FileEncoding.UTF8);

		const factory = new SettingsFactory(filepath);
		const actualSettings = factory.buildSettings();

		test.deepEqual(actualSettings, expectedSettings);
		test.end();
	});

	suite.test('returns the expected settings when the specified settings file does not exist', test => {
		const factory = new SettingsFactory('/non/existent/filepath.json');
		const actualSettings = factory.buildSettings();

		test.deepEqual(actualSettings, {
			tempDirectoryPath: '/tmp',
			mysql: {
				username: 'bgdev',
				hostname: 'localhost',
				password: 'balrog',
				port: 3306
			}
		});

		test.end();
	});

	suite.end();
});
