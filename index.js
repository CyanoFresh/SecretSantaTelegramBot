if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const Telegraf = require('telegraf');
const session = require('telegraf/session');
const config = require('./config');
const { sequelize } = require('./models');
const errorHandler = require('./middlewares/errorHandler');
const commands = require('./commands');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.catch((err) => console.error(err));

bot.use(errorHandler);
bot.use(session());

// Register commands
commands(bot);

sequelize
  .authenticate()
  .then(() => {
    console.log('DB connected');

    bot.launch({ webhook: config.webhook })
      .then(() => console.log('Bot started'))
      .catch(err => {
        console.error('Bot launch error:', err);
        process.exit(5);
      });
  })
  .catch(err => {
    console.error('Unable to connect to the DB:', err);
    process.exit(4);
  });
