const Discord = require('discord.js');
exports.run = function(client, msg, args) {
  msg.channel.send(new Discord.MessageEmbed().setDescription(`Click [here](https://discord.gg/JajWkmj) and join to support server; get some nice help, chat with others submit suggestions.`).setColor("#2294D5"))
};

exports.conf = {
  aliases: [],
};

exports.help = {
  name: 'support',
  cg: 'utility',
  description: 'You get an invitation link for support server of bot to get functional and comprehensive help.'
};