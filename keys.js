const rsa = require('node-rsa');

const generateKeys = () => {
  const key = new rsa({ b: 2048 });
  return {
    private: key.exportKey('private'),
    public: key.exportKey('public'),
  };
};

module.exports = generateKeys;
