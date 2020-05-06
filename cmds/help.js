const Discord = require('discord.js');

exports.run = async function(client, msg, args) {
  if(args[0]) {
    let cmd;

    if(client.aliases.has(args[0]) && !client.commands.has(args[0])) cmd = client.commands.get(client.aliases.get(args[0]));
    if(!client.aliases.has(args[0]) && client.commands.has(args[0])) cmd = client.commands.get(args[0]);
    if(typeof cmd != "undefined") {
      let embed = new Discord.MessageEmbed();
      embed.setDescription(cmd.help.description);
      embed.setColor("#2294D5");
      embed.setFooter(`Help for sys ${args[0]}`);

      if(cmd.conf.aliases.length != 0) {
        embed.addField("Aliases", cmd.conf.aliases.map(alias => `\`${alias}\``));
      }

      await msg.channel.send(embed);
      return;
    } else {
      await msg.channel.send(`I couldn't find \`${args[0]}\` in my commands. Maybe a typo?`);
      return;
    }
  } else {
    let categories = new Object();
    
    for(let i = 0; i < client.commands.array().size; i++) {
      if(!categories.hasOwnProperty(client.commands.array()[i].cg)) {
        categories[client.commands.array()[i].cg] = new Array();
      }

      categories[client.commands.array()[i].cg].push(`\`${client.commands.array()[i].name}\``)
    }

    let embed = new Discord.MessageEmbed()
    embed.setColor("#2294D5")
    embed.setDescription(`You can get detailed help in our support server, join it by clicking [here](https://discord.gg/JajWkmj), if you want detailed to see description of a command type  \`sys help <command>\`.`)
    
    for(let i = 0; i < Object.keys(categories).length; i++) {
      embed.addField(`${Object.keys(categories)[i].charAt(0).toUpperCase()}${Object.keys(categories)[i].slice(1)}`, Object.values(categories)[i].join(" **|** "));
    }

    await msg.channel.send(embed);
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
