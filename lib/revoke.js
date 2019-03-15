const mongoClient = require("mongodb").MongoClient;

const config = require("../config");

const revoke = async clientDesc => {
  const client = new mongoClient(config.mongoUrl, {
    useNewUrlParser: true
  });
  try {
    await client.connect();
    const db = client.db(config.tokenDB);
    const result = await db
      .collection(config.clientCollection)
      .findOneAndDelete({
        client_tag: clientDesc
      });

    if (result.value === null)
      console.log(`${clientDesc} not removed. Possibly does not exist`);
    if (result.value !== null) console.log(`${clientDesc} removed`);
  } catch (err) {
    console.error(err.message);
  }

  client.close();
};

module.exports = revoke;
