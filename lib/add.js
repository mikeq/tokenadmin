const mongoClient = require('mongodb').MongoClient;
const uuid = require('uuid/v1');
const crypto = require('crypto');

const config = require('../config');
const generateKeys = require('../keys');
const table = require('./table');

const add = async clientDesc => {
  const hash = crypto.createHash('sha256');
  hash.update(`${Date.now()}${clientDesc}${config.randomText}${Math.random()}`);

  const client = new mongoClient(config.mongoUrl, {
    useNewUrlParser: true,
  });
  try {
    const keys = generateKeys();
    const client_id = uuid();
    const client_secret = hash.digest('hex');

    await client.connect();
    const db = client.db(config.tokenDB);
    const result = await db.collection(config.clientCollection).insertOne({
      client_tag: clientDesc,
      client_id,
      client_secret,
      public_key: keys.public,
      private_key: keys.private,
    });

    if (result.insertedCount === 1)
      console.log(
        table([{ client_tag: clientDesc, client_id, client_secret }]),
      );
  } catch (err) {
    console.error(err.message);
  }

  client.close();
};

module.exports = add;
