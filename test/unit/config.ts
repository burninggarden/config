import Tap               from 'tap';
import Config            from 'config';
import {EnvironmentType} from '@burninggarden/enums';
import EnvironmentMocker from '@burninggarden/environment-mocker';


Tap.test('.isDevelopment() returns expected value when not in development environment', test => {
	EnvironmentMocker.mock(EnvironmentType.PRODUCTION, () => {
		test.notOk((new Config()).isDevelopment());
	});

	test.end();
});

Tap.test('.isDevelopment() returns expected value when in development environment', test => {
	EnvironmentMocker.mock(EnvironmentType.DEVELOPMENT, () => {
		test.ok((new Config()).isDevelopment());
	});

	test.end();
});

Tap.test('.isProduction() returns expected value when not in production environment', test => {
	EnvironmentMocker.mock(EnvironmentType.DEVELOPMENT, () => {
		test.notOk((new Config()).isProduction());
	});

	test.end();
});

Tap.test('.isProduction() returns expected value when in production environment', test => {
	EnvironmentMocker.mock(EnvironmentType.PRODUCTION, () => {
		test.ok((new Config()).isProduction());
	});

	test.end();
});

Tap.test('.isTest() returns expected value when not in test environment', test => {
	EnvironmentMocker.mock(EnvironmentType.DEVELOPMENT, () => {
		test.notOk((new Config()).isTest());
	});

	test.end();
});

Tap.test('.isTest() returns expected value when in test environment', test => {
	EnvironmentMocker.mock(EnvironmentType.TEST, () => {
		test.ok((new Config()).isTest());
	});

	test.end();
});
