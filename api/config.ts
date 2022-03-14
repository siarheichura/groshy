export const config = {
  DB_URL:
    'mongodb+srv://siarhei:qwerty123@cluster0.bxsyh.mongodb.net/groshy?retryWrites=true&w=majority',

  PORT: process.env.PORT || 5000,

  ACCESS_TOKEN_SECRET_KEY: 'ACCESS_TOKEN_SECRET_KEY',
  REFRESH_TOKEN_SECRET_KEY: 'REFRESH_TOKEN_SECRET_KEY',
  ACCESS_TOKEN_EXPIRE_TIME: '30m',
  REFRESH_TOKEN_EXPIRE_TIME: '10d',

  SMTP_HOST: 'smtp.gmail.com',
  SMTP_PORT: 587,
  SMTP_USER: 'groshy.info@gmail.com',
  SMTP_PASSWORD: 'groshy123',
};
