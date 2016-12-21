module.exports = function(flint) {
  flint.on('spawn', function(bot) {
    console.log('new bot spawned in room: %s', bot.myroom.title);
  });
  flint.on('despawn', function(bot) {
    console.log('bot despawned in room: %s', bot.myroom.title);
  });
  flint.on('messageCreated', function(message, bot) {
    console.log('"%s" said "%s" in room "%s"', message.personEmail, message.text, bot.myroom.title);
  });
  flint.on('log', function(message, bot) {
    console.log('Hello');
  });
};