import OS from 'os';
import Settings from 'interfaces/settings';
import { EnvironmentType } from '@burninggarden/enums';
import SettingsFactory from 'factories/settings';

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

	public static getHttpsPort(): number {
		return this.getInstance().getHttpsPort();
	}

	public static getProcessId(): number {
		return this.getInstance().getProcessId();
	}

	public static getUid(): number {
		return this.getInstance().getUid();
	}

	public static getGid(): number {
		return this.getInstance().getGid();
	}

	public static getTempDirectoryPath(): string {
		return this.getInstance().getTempDirectoryPath();
	}

	public static getHomeDirectoryPath(): string {
		return this.getInstance().getHomeDirectoryPath();
	}

	private settings: Settings | undefined;

	public isDevelopment(): boolean {
		return this.getEnvironmentType() === EnvironmentType.DEVELOPMENT;
	}

	public isProduction(): boolean {
		return this.getEnvironmentType() === EnvironmentType.PRODUCTION;
	}

	public isTest(): boolean {
		return this.getEnvironmentType() === EnvironmentType.TEST;
	}

	public isBrowser(): boolean {
		return typeof window !== 'undefined';
	}

	public getManagerPort(): number {
		return 3000;
	}

	public getHttpsPort(): number {
		return 8080;
	}

	public getProcessId(): number {
		return process.pid;
	}

	public getUid(): number {
		return process.getuid();
	}

	public getGid(): number {
		return process.getgid();
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
					`Unsupported environment type: ${process.env.NODE_ENV}`
				);
		}
	}

	public getTempDirectoryPath(): string {
		return this.getSettings().tempDirectoryPath;
	}

	public getHomeDirectoryPath(): string {
		return OS.homedir();
	}

	private getSettings(): Settings {
		if (this.settings === undefined) {
			this.settings = this.buildSettings();
		}

		return this.settings;
	}

	private buildSettings(): Settings {
		const directoryPath = this.getHomeDirectoryPath(),
			filepath = directoryPath + '/.burninggarden/settings.json',
			factory = new SettingsFactory(filepath);

		return factory.buildSettings();
	}
}

export default Config;
