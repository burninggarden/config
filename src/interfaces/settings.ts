import MysqlSettings from 'interfaces/settings/mysql';

export default interface Settings {
	tempDirectoryPath: string;
	mysql: MysqlSettings;
}
