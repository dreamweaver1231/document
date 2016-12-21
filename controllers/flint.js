exports.getHello = (bot, trigger) => {
  bot.say((trigger.args).toString());
};