export const config = {
  DB_URL:
    'mongodb+srv://siarhei:qwerty123@cluster0.bxsyh.mongodb.net/groshy?retryWrites=true&w=majority',

  PORT: process.env.PORT || 5000,

  CORS_OPTIONS: {
    origin: 'http://localhost:4200',
  },

  TOKEN_SECRET_KEY: 'TOKEN_SECRET_KEY',
  TOKEN_EXPIRE_TIME: '1h',
};
