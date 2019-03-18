const mongoClient = require('mongodb').MongoClient;

const config = require('../config');
const generateKeys = require('../keys');

const generate = async clientDesc => {
  const keys = generateKeys();
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
        { $set: { public_key: keys.public, private_key: keys.private } },
      );

    console.log(result);
  } catch (err) {
    console.error(err.message);
  }

  client.close();
};

module.exports = generate;
