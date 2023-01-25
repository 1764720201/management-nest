export default () => ({
  database: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT) || 3306,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
  },
  port: process.env.PORT || 8000,
});
