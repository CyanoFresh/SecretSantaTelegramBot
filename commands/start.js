const { Markup } = require('telegraf');
const { generate } = require('../services/code');
const { User } = require('../models');

module.exports = bot => {
  bot.start(async (ctx) => {
    const { username, second_name, id, first_name } = ctx.update.message.chat;

    let user = await User.findOne({
      where: { chat_id: id },
    });

    if (!user) {
      user = await User.create({
        chat_id: id,
        first_name: first_name,
        second_name: second_name,
        username: username,
        code: await generate(),
      });
    }

    return ctx.replyWithMarkdown(
      `🎅Привет, ХОХОХО🎅

А знаешь ли ты, что дарить подарки так же приятно, как получать?🤔

Я хочу помочь тебе убедиться в этом. 
Твоя задача: порадовать "незнакомца" подарком🎁
Если ты готов стать Тайным Сантой, то скорее заполняй форму и в скором времени мы отправим тебе данные человека, которому нужно будет отправить подарочек💫
Но самое главное не говори никому кто это, это же тайна🤐
А главное помни: добро возращается😌

P.S. Если у тебя остались вопросы, то обязательно задавай их.`,
      Markup.inlineKeyboard([
        Markup.urlButton('Заполнить анкету', `https://docs.google.com/forms/d/e/1FAIpQLSevVHxC0PIgpQnEISphMZYKqTTUpb7HggZYUr1yJvyqRSaiDQ/viewform?usp=pp_url&entry.1755769369=${user.code}`),
      ]).extra(),
    );
  });
};
