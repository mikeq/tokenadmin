const mongoClient = require('mongodb').MongoClient;
const chalk = require('chalk');

const config = require('../config');

const output = async (clientDesc, base64 = false) => {
  const client = new mongoClient(config.mongoUrl, {
    useNewUrlParser: true,
  });
  try {
    await client.connect();
    const db = client.db(config.tokenDB);
    const result = await db.collection(config.clientCollection).findOne({
      client_tag: clientDesc,
    });

    console.log(chalk.blue('client: '), chalk.green(result.client_tag));
    console.log(chalk.blue('client_id: '), chalk.green(result.client_id));
    console.log(
      chalk.blue('client_secret: '),
      chalk.green(result.client_secret),
    );
    if (base64) {
      console.log(chalk.blue('public key: '));
      console.log(
        chalk.green(Buffer.from(result.public_key).toString('base64')),
      );
      console.log(chalk.blue('private key: '));
      console.log(
        chalk.green(Buffer.from(result.private_key).toString('base64')),
      );
    } else {
      console.log(chalk.blue('public key: '));
      console.log(chalk.green(result.public_key));
      console.log(chalk.blue('private key: '));
      console.log(chalk.green(result.private_key));
    }
  } catch (err) {
    console.error(err.message);
  }

  client.close();
};

module.exports = output;
