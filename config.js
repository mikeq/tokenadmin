module.exports = {
  mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017",
  tokenDB: process.env.TOKEN_DB || "token",
  clientCollection: process.env.CLIENT_COLLECTION || "clients",
  randomText: "y78wdhwjhk48whf",
  mailFrom: process.env.TOKEN_EMAIL_FROM || "tokens@example.com",
  mailHost: process.env.TOKEN_MAIL_HOST || "localhost",
  mailPort: process.env.TOKEN_MAIL_PORT || 25
};
