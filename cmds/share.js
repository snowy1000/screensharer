const Discord = require('discord.js');
const client = new Discord.Client();
exports.run = function(client, msg, args) {
  if(!msg.member.voice.channel) return msg.channel.send("You have to join a voice channel first.");
  let Embed = new Discord.MessageEmbed()
  .setColor("#2294D5")
  .setDescription(`Click [here](https://discordapp.com/channels/${msg.guild.id}/${msg.member.voice.channelID}) and join to screenshare session.`)
  .setFooter("Screenshare link for " + msg.member.voice.channel.name)
  .setTimestamp()
  msg.channel.send(Embed);
};

exports.conf = {
  aliases: ["ss", "screenshare", "screen-share", "sharescreen", "share-screen"],
};

exports.help = {
  name: 'share',
  cg: 'main',
  description: 'Sends you a link of screenshare in the voice channel that you are in.'
};