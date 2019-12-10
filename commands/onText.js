const config = require('../config');
const { User } = require('../models');

module.exports = bot => {
  bot.on('text', async (ctx) => {
    const isFromAdminChat = ctx.update.message.chat.id.toString() === config.adminChatId;

    if (isFromAdminChat) {
      if (ctx.update.message.text.startsWith('/send')) {
        const parts = ctx.update.message.text.split(' ');
        let [, userCode, ...message] = parts;

        if (!userCode) {
          return ctx.reply('Неправильный синтаксис');
        }

        if (userCode.length === config.codeLength && (userCode === Number(userCode).toString())) {
          const user = await User.findOne({ where: { code: userCode } });

          if (!user) {
            return ctx.reply(`Пользователь с кодом ${userCode} не найден`);
          }

          const text = message.join(' ');
          await ctx.tg.sendMessage(user.chat_id, text);

          return ctx.reply(`Сообщение отправлено [${user.first_name || user.username}](tg://user?id=${user.chat_id}) : ${text}`, {
            parse_mode: 'markdown',
          });
        } else {
          const text = [userCode, ...message].join(' ');

          const users = await User.findAll();

          await Promise.all(users.map(user => ctx.tg.sendMessage(user.chat_id, text)));

          return ctx.reply(`Сообщение отправлено всем: ${text}`, {
            parse_mode: 'markdown',
          });
        }
      }

      if (ctx.update.message.reply_to_message && ctx.update.message.reply_to_message.forward_from) {
        const originalMsg = ctx.update.message.reply_to_message;
        return ctx.tg.sendCopy(originalMsg.forward_from.id, ctx.message);
      }
    } else if (ctx.update.message.chat.id < 0) {
      return;
    }

    const user = await User.findOne({
      where: { chat_id: ctx.update.message.chat.id },
    });

    await ctx.forwardMessage(config.adminChatId);
    await ctx.tg.sendMessage(config.adminChatId, user.code);
  });
};
