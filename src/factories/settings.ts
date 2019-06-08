import FS             from 'fs';
import Settings       from 'interfaces/settings';
import MysqlSettings  from 'interfaces/settings/mysql';
import {FileEncoding} from '@burninggarden/enums';

class SettingsFactory {

	private filepath     : string;
	private fileContents : Settings;

	public constructor(filepath: string) {
		this.filepath = filepath;
	}

	public buildSettings(): Settings {
		return {
			tempDirectoryPath: this.buildTempDirectoryPath(),
			mysql:             this.buildMysqlSettings()
		};
	}

	private buildTempDirectoryPath(): string {
		const path = this.getFileContents().tempDirectoryPath;

		if (path) {
			return path;
		} else {
			return '/tmp';
		}
	}

	private buildMysqlSettings(): MysqlSettings {
		return {
			username: 'bgdev',
			hostname: 'localhost',
			password: 'balrog',
			port:     3306,
			...this.getFileContents().mysql
		};
	}

	private getFileContents(): Settings {
		if (!this.fileContents) {
			this.fileContents = this.readFileContents();
		}

		return this.fileContents;
	}

	private readFileContents(): Settings {
		const filepath = this.getFilepath();

		if (!FS.existsSync(filepath)) {
			return {} as Settings;
		}

		const contents = FS.readFileSync(filepath, FileEncoding.UTF8);

		return JSON.parse(contents) as Settings;
	}

	private getFilepath(): string {
		return this.filepath;
	}

}

export default SettingsFactory;
