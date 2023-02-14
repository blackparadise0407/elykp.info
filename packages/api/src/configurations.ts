export default () => ({
	oidc: {
		authority: process.env.OIDC_AUTHORITY || 'http://localhost:8080/realms/elykp',
	},
	port: parseInt(process.env.PORT!, 10) || 8081,
	database: {
		host: process.env.DATABASE_HOST || 'localhost',
		username: process.env.DATABASE_USERNAME || 'postgres',
		port: parseInt(process.env.DATABASE_PORT!, 10) || 5432,
		password: process.env.DATABASE_PASSWORD || '040799',
		name: process.env.DATABASE_NAME || 'elykp_com_dev',
	},
});
