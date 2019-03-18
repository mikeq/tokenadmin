const mongoClient = require('mongodb').MongoClient;
const nodemailer = require('nodemailer');

const config = require('../config');

const email = async (clientDesc, email, base64 = false) => {
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
    ${base64 ? Buffer.from(public_key).toString('base64') : public_key}
    private_key:
    ${base64 ? Buffer.from(private_key).toString('base64') : private_key}
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
