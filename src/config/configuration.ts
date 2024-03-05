export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  databaseUrl: process.env.DATABASE_URL,
});
