import OS from 'os';
import Config from 'config';
import SettingsFactory from 'factories/settings';
import { EnvironmentType } from '@burninggarden/enums';
import EnvironmentMocker from '@burninggarden/environment-mocker';

describe('Config', () => {
	describe('.isDevelopment()', () => {
		it('returns expected value when not in development environment', () => {
			EnvironmentMocker.mock(EnvironmentType.PRODUCTION, () => {
				expect(new Config().isDevelopment()).toBe(false);
			});
		});

		it('returns expected value when in development environment', () => {
			EnvironmentMocker.mock(EnvironmentType.DEVELOPMENT, () => {
				expect(new Config().isDevelopment()).toBe(true);
			});
		});

		it('is aliased as static method', () => {
			expect(Config.isDevelopment()).toBe(false);
		});
	});

	describe('.isProduction()', () => {
		it('returns expected value when not in production environment', () => {
			EnvironmentMocker.mock(EnvironmentType.DEVELOPMENT, () => {
				expect(new Config().isProduction()).toBe(false);
			});
		});

		it('returns expected value when in production environment', () => {
			EnvironmentMocker.mock(EnvironmentType.PRODUCTION, () => {
				expect(new Config().isProduction()).toBe(true);
			});
		});

		it('is aliased as static method', () => {
			expect(Config.isProduction()).toBe(false);
		});
	});

	describe('.isTest()', () => {
		it('returns expected value when not in test environment', () => {
			EnvironmentMocker.mock(EnvironmentType.DEVELOPMENT, () => {
				expect(new Config().isTest()).toBe(false);
			});
		});

		it('returns expected value when in test environment', () => {
			EnvironmentMocker.mock(EnvironmentType.TEST, () => {
				expect(new Config().isTest()).toBe(true);
			});
		});

		it('is aliased as static method', () => {
			expect(Config.isTest()).toBe(true);
		});
	});

	describe('.getEnvironmentType()', () => {
		it('returns expected environment type for production', () => {
			EnvironmentMocker.mock(EnvironmentType.PRODUCTION, () => {
				const environmentType = new Config().getEnvironmentType();

				expect(environmentType).toStrictEqual(EnvironmentType.PRODUCTION);
			});
		});

		it('returns expected environment type for test', () => {
			EnvironmentMocker.mock(EnvironmentType.TEST, () => {
				const environmentType = new Config().getEnvironmentType();

				expect(environmentType).toStrictEqual(EnvironmentType.TEST);
			});
		});

		it('returns expected environment type for development', () => {
			EnvironmentMocker.mock(EnvironmentType.DEVELOPMENT, () => {
				const environmentType = new Config().getEnvironmentType();

				expect(environmentType).toStrictEqual(EnvironmentType.DEVELOPMENT);
			});
		});

		it('throws an exception for other environment values', () => {
			const environment = 'nonsense';

			EnvironmentMocker.mock(environment as EnvironmentType, () => {
				const config = new Config();

				expect(() => {
					config.getEnvironmentType();
				}).toThrow('Unsupported environment type: nonsense');
			});
		});

		it('is aliased as static method', () => {
			expect(Config.getEnvironmentType()).toStrictEqual(EnvironmentType.TEST);
		});
	});

	describe('.getManagerPort()', () => {
		it('returns expected port value', () => {
			const port = new Config().getManagerPort();

			expect(port).toStrictEqual(3000);
		});

		it('is aliased as static method', () => {
			expect(Config.getManagerPort()).toStrictEqual(
				new Config().getManagerPort()
			);
		});
	});

	describe('.getHttpsPort()', () => {
		it('returns expected port value', () => {
			const port = new Config().getHttpsPort();

			expect(port).toStrictEqual(8080);
		});

		it('is aliased as static method', () => {
			expect(Config.getHttpsPort()).toStrictEqual(new Config().getHttpsPort());
		});
	});

	describe('.getProcessId()', () => {
		it('returns expected pid value', () => {
			const processId = new Config().getProcessId();

			expect(processId).toStrictEqual(process.pid);
		});

		it('is aliased as static method', () => {
			expect(Config.getProcessId()).toStrictEqual(process.pid);
		});
	});

	describe('.getUid()', () => {
		it('returns expected uid value', () => {
			const uid = new Config().getUid();

			expect(uid).toStrictEqual(process.getuid());
		});

		it('is aliased as static method', () => {
			expect(Config.getUid()).toStrictEqual(process.getuid());
		});
	});

	describe('.getGid()', () => {
		it('returns expected gid value', () => {
			const gid = new Config().getGid();

			expect(gid).toStrictEqual(process.getgid());
		});

		it('is aliased as static method', () => {
			expect(Config.getGid()).toStrictEqual(new Config().getGid());
		});
	});

	describe('.getTempDirectoryPath()', () => {
		it('returns expected value', () => {
			const config = new Config();
			const homedir = config.getHomeDirectoryPath();
			const settingsFilepath = homedir + '/.burninggarden/settings.json';
			const settingsFactory = new SettingsFactory(settingsFilepath);
			const settings = settingsFactory.buildSettings();

			expect(config.getTempDirectoryPath()).toStrictEqual(
				settings.tempDirectoryPath
			);
		});

		it('is aliased as a static method', () => {
			expect(Config.getTempDirectoryPath()).toStrictEqual(
				new Config().getTempDirectoryPath()
			);
		});
	});

	describe('.getHomeDirectoryPath()', () => {
		it('returns expected gid value', () => {
			const path = new Config().getHomeDirectoryPath();

			expect(path).toStrictEqual(OS.homedir());
		});

		it('is aliased as static method', () => {
			expect(Config.getHomeDirectoryPath()).toStrictEqual(
				new Config().getHomeDirectoryPath()
			);
		});
	});

	describe('.isBrowser()', () => {
		it('returns true when window is defined', () => {
			const config = new Config();

			Object.assign(global, {
				window: {},
			});

			expect(config.isBrowser()).toBe(true);

			Object.assign(global, {
				window: undefined,
			});
		});

		it('returns false when window is not defined', () => {
			const config = new Config();

			expect(config.isBrowser()).toBe(false);
		});
	});
});
