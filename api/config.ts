export const config = {
  dbUrl:
    'mongodb+srv://siarhei:qwerty123@cluster0.bxsyh.mongodb.net/groshy?retryWrites=true&w=majority',

  PORT: process.env.PORT || 5000,

  tokenSecretKey: 'TOKEN_SECRET_KEY',

  corsOptions: {
    origin: 'http://localhost:4200',
  },
};
