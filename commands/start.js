const { Markup } = require('telegraf');
const { generate } = require('../services/code');
const { User } = require('../models');

module.exports = bot => {
  bot.start(async (ctx) => {
    let user = await User.findOne({
      where: { chat_id: ctx.update.message.chat.id },
    });

    if (!user) {
      user = await User.create({
        chat_id: ctx.update.message.chat.id,
        first_name: ctx.update.message.chat.first_name,
        second_name: ctx.update.message.chat.second_name,
        username: ctx.update.message.chat.username,
        code: await generate(),
      });
    }

    return ctx.replyWithMarkdown(
      `Welcome\nTo become a Santa fill the form below`,
      Markup.inlineKeyboard([
        Markup.urlButton('Заполнить анкету', `https://docs.google.com/forms/d/e/1FAIpQLSevVHxC0PIgpQnEISphMZYKqTTUpb7HggZYUr1yJvyqRSaiDQ/viewform?usp=pp_url&entry.1755769369=${user.code}`),
      ]).extra(),
    );
  });
};
