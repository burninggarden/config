import FS from 'fs';
import Settings from 'interfaces/settings';
import { FileEncoding } from '@burninggarden/enums';
import SettingsFactory from 'factories/settings';

describe('SettingsFactory', () => {
	describe('.buildSettings()', () => {
		it('returns the expected settings when the specified settings file exists', () => {
			const filepath = '/tmp/bg-settings.json';

			const expectedSettings: Settings = {
				tempDirectoryPath: '/weathertop',
				mysql: {
					username: 'gandalf',
					hostname: 'https://google.com',
					password: 'speak-friend-and-enter',
					port: 1234,
				},
			};

			const contents = JSON.stringify(expectedSettings);

			FS.writeFileSync(filepath, contents, FileEncoding.UTF8);

			const factory = new SettingsFactory(filepath);
			const actualSettings = factory.buildSettings();

			expect(actualSettings).toEqual(expectedSettings);
		});

		it('returns the expected settings when the specified settings file does not exist', () => {
			const factory = new SettingsFactory('/non/existent/filepath.json');
			const actualSettings = factory.buildSettings();

			expect(actualSettings).toEqual({
				tempDirectoryPath: '/tmp',
				mysql: {
					username: 'bgdev',
					hostname: 'localhost',
					password: 'balrog',
					port: 3306,
				},
			});
		});
	});
});
