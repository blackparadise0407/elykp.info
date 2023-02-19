require('dotenv').config();
const { DataSource } = require('typeorm');
console.log(__dirname);

const ds = new DataSource({
	type: 'postgres',
	host: process.env.ELYKP_DATABASE_HOST || 'localhost',
	port: process.env.ELYKP_DATABASE_PORT || 5432,
	username: process.env.ELYKP_DATABASE_USERNAME || 'postgres',
	password: process.env.ELYKP_DATABASE_PASSWORD || '040799',
	database: process.env.ELYKP_DATABASE_NAME || 'elykp_com_dev_local',
	migrations: [__dirname + '/src/migrations/*'],
});

console.log(ds.initialize());

module.exports = ds;
