import {EnvironmentType} from '@burninggarden/enums';

let CACHED_INSTANCE: Config | null = null;

class Config {

	public static getInstance(): Config {
		if (CACHED_INSTANCE === null) {
			CACHED_INSTANCE = new this();
		}

		return CACHED_INSTANCE;
	}

	public static isDevelopment(): boolean {
		return this.getInstance().isDevelopment();
	}

	public static isProduction(): boolean {
		return this.getInstance().isProduction();
	}

	public static isTest(): boolean {
		return this.getInstance().isTest();
	}

	public static getEnvironmentType(): EnvironmentType {
		return this.getInstance().getEnvironmentType();
	}

	public static getManagerPort(): number {
		return this.getInstance().getManagerPort();
	}

	public static getProcessId(): number {
		return this.getInstance().getProcessId();
	}

	public isDevelopment(): boolean {
		return this.getEnvironmentType() === EnvironmentType.DEVELOPMENT;
	}

	public isProduction(): boolean {
		return this.getEnvironmentType() === EnvironmentType.PRODUCTION;
	}

	public isTest(): boolean {
		return this.getEnvironmentType() === EnvironmentType.TEST;
	}

	public getManagerPort(): number {
		return 3000;
	}

	public getProcessId(): number {
		return process.pid;
	}

	public getEnvironmentType(): EnvironmentType {
		switch (process.env.NODE_ENV) {
			case 'development':
				return EnvironmentType.DEVELOPMENT;
			case 'production':
				return EnvironmentType.PRODUCTION;
			case 'test':
				return EnvironmentType.TEST;
			default:
				throw new Error(
					`Unsupported environment type set: ${process.env.NODE_ENV}`
				);
		}
	}

}

export default Config;
