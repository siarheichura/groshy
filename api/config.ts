export const config = {
  DB_URL:
    'mongodb+srv://siarhei:qwerty123@cluster0.bxsyh.mongodb.net/groshy?retryWrites=true&w=majority',

  PORT: process.env.PORT || 5000,

  ACCESS_TOKEN_SECRET_KEY: 'ACCESS_TOKEN_SECRET_KEY',
  REFRESH_TOKEN_SECRET_KEY: 'REFRESH_TOKEN_SECRET_KEY',
  ACCESS_TOKEN_EXPIRE_TIME: '10m',
  REFRESH_TOKEN_EXPIRE_TIME: '10d',
  REFRESH_TOKEN_COOKIE_KEY: 'refreshToken',
  REFRESH_TOKEN_COOKIE_MAX_AGE: 1000 * 60 * 60 * 24 * 10,

  SMTP_HOST: 'smtp.gmail.com',
  SMTP_PORT: 587,
  SMTP_USER: 'groshy.info@gmail.com',
  SMTP_PASSWORD: 'groshy123',
};
