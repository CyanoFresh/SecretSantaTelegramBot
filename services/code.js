const config = require('../config');
const { User } = require('../models');

module.exports.generate = async (length = config.codeLength) => {
  let code;

  do {
    code = Math.floor(Math.random() * (9 * Math.pow(10, length - 1))) + Math.pow(10, length - 1);
  } while ((await User.count({ where: { code } })) > 0);

  return code;
};
