const mongoClient = require("mongodb").MongoClient;

const config = require("../config");
const schema = require("../schema/jsonschema.json");

const init = async () => {
  const client = new mongoClient(config.mongoUrl, {
    useNewUrlParser: true
  });

  try {
    await client.connect();
    const db = client.db(config.tokenDB);

    let result = await db.createCollection(config.clientCollection, {
      validator: {
        $jsonSchema: {
          ...schema
        }
      },
      validationLevel: "strict",
      validationAction: "error"
    });

    result = await db.createIndex(
      config.clientCollection,
      { client_tag: 1 },
      { unique: true }
    );

    console.log(`${config.tokenDB}.${config.clientCollection} initialised`);
  } catch (err) {
    console.error(err.message);
  }

  client.close();
};

module.exports = init;
