import Tap               from 'tap';
import Config            from 'config';
import {EnvironmentType} from '@burninggarden/enums';
import EnvironmentMocker from '@burninggarden/environment-mocker';


Tap.test('.isDevelopment()', suite => {
	suite.test('returns expected value when not in development environment', test => {
		EnvironmentMocker.mock(EnvironmentType.PRODUCTION, () => {
			test.notOk((new Config()).isDevelopment());
		});

		test.end();
	});

	suite.test('returns expected value when in development environment', test => {
		EnvironmentMocker.mock(EnvironmentType.DEVELOPMENT, () => {
			test.ok((new Config()).isDevelopment());
		});

		test.end();
	});

	suite.test('is aliased as static method', test => {
		test.equals(Config.isDevelopment(), (new Config()).isDevelopment());
		test.end();
	});

	suite.end();
});

Tap.test('.isProduction()', suite => {
	suite.test('returns expected value when not in production environment', test => {
		EnvironmentMocker.mock(EnvironmentType.DEVELOPMENT, () => {
			test.notOk((new Config()).isProduction());
		});

		test.end();
	});

	suite.test('returns expected value when in production environment', test => {
		EnvironmentMocker.mock(EnvironmentType.PRODUCTION, () => {
			test.ok((new Config()).isProduction());
		});

		test.end();
	});

	suite.test('is aliased as static method', test => {
		test.equals(Config.isProduction(), (new Config()).isProduction());
		test.end();
	});

	suite.end();
});

Tap.test('.isTest()', suite => {
	suite.test('returns expected value when not in test environment', test => {
		EnvironmentMocker.mock(EnvironmentType.DEVELOPMENT, () => {
			test.notOk((new Config()).isTest());
		});

		test.end();
	});

	suite.test('returns expected value when in test environment', test => {
		EnvironmentMocker.mock(EnvironmentType.TEST, () => {
			test.ok((new Config()).isTest());
		});

		test.end();
	});

	suite.test('is aliased as static method', test => {
		test.equals(Config.isTest(), (new Config()).isTest());
		test.end();
	});

	suite.end();
});

Tap.test('.getEnvironmentType()', suite => {
	suite.test('returns expected environment type', test => {
		EnvironmentMocker.mock(EnvironmentType.PRODUCTION, () => {
			const environmentType = (new Config()).getEnvironmentType();

			test.equals(environmentType, EnvironmentType.PRODUCTION);
			test.end();
		});
	});

	suite.test('is aliased as static method', test => {
		test.equals(
			Config.getEnvironmentType(),
			(new Config()).getEnvironmentType()
		);

		test.end();
	});

	suite.end();
});

Tap.test('.getManagerPort()', suite => {
	suite.test('returns expected port value', test => {
		const port = (new Config()).getManagerPort();

		test.equals(port, 3000);
		test.end();
	});

	suite.test('is aliased as static method', test => {
		test.equals(Config.getManagerPort(), (new Config()).getManagerPort());
		test.end();
	});

	suite.end();
});

Tap.test('.getHttpsPort()', suite => {
	suite.test('returns expected port value', test => {
		const port = (new Config()).getHttpsPort();

		test.equals(port, 8080);
		test.end();
	});

	suite.test('is aliased as static method', test => {
		test.equals(Config.getHttpsPort(), (new Config()).getHttpsPort());
		test.end();
	});

	suite.end();
});

Tap.test('.getProcessId()', suite => {
	suite.test('returns expected pid value', test => {
		const processId = (new Config()).getProcessId();

		test.equals(processId, process.pid);
		test.end();
	});

	suite.test('is aliased as static method', test => {
		test.equals(Config.getProcessId(), (new Config()).getProcessId());
		test.end();
	});

	suite.end();
});

Tap.test('.getUid()', suite => {
	suite.test('returns expected uid value', test => {
		const uid = (new Config()).getUid();

		test.equals(uid, process.getuid());
		test.end();
	});

	suite.test('is aliased as static method', test => {
		test.equals(Config.getUid(), (new Config()).getUid());
		test.end();
	});

	suite.end();
});

Tap.test('.getGid()', suite => {
	suite.test('returns expected gid value', test => {
		const gid = (new Config()).getGid();

		test.equals(gid, process.getgid());
		test.end();
	});

	suite.test('is aliased as static method', test => {
		test.equals(Config.getGid(), (new Config()).getGid());
		test.end();
	});

	suite.end();
});
