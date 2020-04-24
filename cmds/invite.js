const Discord = require('discord.js');
exports.run = function(client, msg, args) {
  msg.channel.send(new Discord.MessageEmbed().setDescription(`Click [here](https://discordapp.com/oauth2/authorize?client_id=698203925580611585&scope=bot&permissions=0) and add bot to your server!`).setColor("#2294D5"))
};

exports.conf = {
  aliases: ["inv"],
};

exports.help = {
  name: 'invite',
  cg: 'utility',
  description: 'Sends you an invitation link of bot, for you to add it to your servers.'
};