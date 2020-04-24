const Discord = require('discord.js');
exports.run = function(client, msg, args) {
  if(args[0]) {
    if(client.commands.has(args[0]) || client.aliases.has(args[0])) {
      let cmd;
      if(client.aliases.has(args[0]) && !client.commands.has(args[0])) cmd = client.commands.get(client.alises.get(args[0]));
      if(!client.aliases.has(args[0]) && client.commands.has(args[0])) cmd = client.commands.get(args[0]);
      let aliases;
      if(cmd.conf.aliases.length == 0) aliases = "";
      if(cmd.conf.aliases.length) {
        function splitAliases(x) {
          return x.conf.aliases.map(alias => `\`${alias}\``).join(", ")
        };  
        aliases = splitAliases(cmd)
      }
      let embed = new Discord.MessageEmbed()
      .setDescription(cmd.help.description).setColor("#2294D5").setFooter(`Help for sys ` + args[0]);
      if(aliases != "") {
        embed.addField(`Aliases`, aliases);
      }
      msg.channel.send(embed).catch(e => {})
    } else {
      msg.channel.send("I couldn't find `" + args[0] + "` in my commands. Maybe a typo?")
    }
  } else {
    function categorizedByMain(x) {
      return client.commands.filter(cmd => cmd.help.cg == "main").map(cmd => `\`${cmd.help.name}\``).join(", ")
    };
    function categorizedByUtility(x) {
      return client.commands.filter(cmd => cmd.help.cg == "utility").map(cmd => `\`${cmd.help.name}\``).join(", ")
    };  
    let mainCommands = categorizedByMain(client.commands);
    let utilityCommands = categorizedByUtility(client.commands);
    let embed = new Discord.MessageEmbed()
    .setColor("#2294D5")
    .setDescription(`You can get detailed help in our support server, join it by clicking [here](https://discord.gg/JajWkmj), if you want detailed to see description of a command type  \`sys help <command>\`.`)
    .addField(`Main commands`, mainCommands)
    .addField(`Utility commands`, utilityCommands)
    msg.channel.send(embed).catch(e => {});
  }
};

exports.conf = {
  aliases: [],
};

exports.help = {
  name: 'help',
  cg: 'main',
  description: 'Shows the help menu.'
};