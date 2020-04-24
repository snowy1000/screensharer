const Discord = require('discord.js');
const os = require('os');
exports.run = function(client, msg, args) {
  let devsString = "";
  let embed = new Discord.MessageEmbed()
  .addField("OS", os.type(), true)
  .addField("Servers", client.guilds.cache.size, true)
  .addField("Users", client.users.cache.size, true)
  .addField("Channels", client.channels.cache.size, true)
  .setColor("#2294D5")
  msg.channel.send(embed);
};

exports.conf = {
  aliases: ["st", "s"],
};

exports.help = {
  name: 'stats',
  cg: 'utility',
  description: 'Shows stats of bot.'
};