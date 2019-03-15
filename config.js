module.exports = {
  mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017",
  tokenDB: process.env.TOKEN_DB || "token",
  clientCollection: process.env.CLIENT_COLLECTION || "clients",
  randomText: "y78wdhwjhk48whf",
  mailFrom: "tokens@example.com",
  mailHost: "localhost",
  mailPort: 25
};
