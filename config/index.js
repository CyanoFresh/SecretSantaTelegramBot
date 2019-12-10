module.exports = {
  adminChatId: process.env.ADMIN_CHAT_ID,
  errorReportChatId: process.env.ERROR_CHAT_ID,
  codeLength: 4,
  webhook: process.env.BOT_DOMAIN ? {
    domain: process.env.BOT_DOMAIN,
    port: process.env.BOT_PORT || 4000,
  } : undefined,
};
