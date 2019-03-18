const mongoClient = require('mongodb').MongoClient;
const crypto = require('crypto');

const config = require('../config');
const table = require('./table');

const secret = async clientDesc => {
  const hash = crypto.createHash('sha256');
  hash.update(`${Date.now()}${clientDesc}${config.randomText}${Math.random()}`);
  const client_secret = hash.digest('hex');

  const client = new mongoClient(config.mongoUrl, {
    useNewUrlParser: true,
  });
  try {
    await client.connect();
    const db = client.db(config.tokenDB);
    const result = await db
      .collection(config.clientCollection)
      .findOneAndUpdate(
        { client_tag: clientDesc },
        { $set: { client_secret } },
      );

    console.log(table([result.value]));
  } catch (err) {
    console.error(err.message);
  }

  client.close();
};

module.exports = secret;
