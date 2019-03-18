const mongoClient = require('mongodb').MongoClient;

const config = require('../config');
const table = require('./table');

const output = async clientDesc => {
  const client = new mongoClient(config.mongoUrl, {
    useNewUrlParser: true,
  });
  try {
    await client.connect();
    const db = client.db(config.tokenDB);
    const result = await db
      .collection(config.clientCollection)
      .find(clientDesc ? { client_tag: clientDesc } : '')
      .project({ client_tag: 1, client_id: 1, client_secret: 1, _id: 0 })
      .toArray();

    console.log(table(result));
  } catch (err) {
    console.error(err.message);
  }

  client.close();
};

module.exports = output;
