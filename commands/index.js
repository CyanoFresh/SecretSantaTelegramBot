const start = require('./start');
const onText = require('./onText');

module.exports = (bot) => {
  start(bot);
  onText(bot);
};
