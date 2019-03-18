const mongoClient = require('mongodb').MongoClient;
const nodemailer = require('nodemailer');

const config = require('../config');

const email = async (clientDesc, email) => {
  const transporter = nodemailer.createTransport({
    host: config.mailHost,
    port: config.mailPort,
    ignoreTLS: true,
  });

  const client = new mongoClient(config.mongoUrl, {
    useNewUrlParser: true,
  });

  try {
    await client.connect();
    const db = client.db(config.tokenDB);
    const result = await db.collection(config.clientCollection).findOne({
      client_tag: clientDesc,
    });

    const {
      client_tag,
      client_id,
      client_secret,
      public_key,
      private_key,
    } = result;
    const text = `
    client_tag: ${client_tag}
    client_id: ${client_id}
    client_secret: ${client_secret}
    public_key:
    ${public_key}
    private_key:
    ${private_key}
    `;

    const mailOptions = {
      from: config.mailFrom,
      to: email,
      subject: `Details for ${clientDesc}`,
      text: text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(info);
  } catch (err) {
    console.error(err.message);
  }

  client.close();
};

module.exports = email;
