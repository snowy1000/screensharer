const Discord = require("discord.js");
const client = new Discord.Client();
client.conf = {
  "token": "Your token here",
  "activity": "new features",
}

function getIdFromMention(mention) {
  if(!mention) return;
  if(mention.startsWith("<@") && mention.endsWith(">")) {
    mention = mention.slice(2, -1);
    if(mention.startsWith("!")) {
      mention = mention.slice(1);
    };
    return mention;
  }
}
const talkedRecently = new Set();
const mentionedRecently = new Set();
client.on("message", async msg => {
  let query = ["<@698228126265901116>", "<@698228126265901116> ", "<@!698228126265901116>", "<!@698228126265901116> "];
  if(msg.author.bot) return;
  let client = msg.client;
  let a = msg.content.split(" ")[0];
  let id = getIdFromMention(a);
  if(!id) return;
  if(id != client.user.id) return;
  let cmd;
  let params = msg.content.split(" ").slice(2);
  let command = msg.content.split(" ").slice(1).shift()
  if(!command) return;
  if (client.commands.has(command.toLowerCase())) {
    cmd = client.commands.get(command.toLowerCase());
  } else if (client.aliases.has(command.toLowerCase())) {
    cmd = client.commands.get(client.aliases.get(command.toLowerCase()));
  }
  if (cmd) {
    if (talkedRecently.has(msg.author.id)) return msg.channel.send("🛑 Please wait 5 seconds between commands.")
    cmd.run(client, msg, params);
    talkedRecently.add(msg.author.id);
    setTimeout(() => {
      talkedRecently.delete(msg.author.id);
    }, 5000);
  } else {
    if(query.includes(msg.content)) {
      if(mentionedRecently.has(msg.author.id)) {
        setTimeout(() => {
          mentionedRecently.delete(msg.author.id)
        }, 2500);
        return;
      }
    }
  }
});

client.on("ready", () => {
  console.log(`[Snowy ✨#1000] Ready as ${client.user.username} !`);
  client.user.setStatus(client.conf.durum);
  client.user.setActivity(client.conf.activity, { type: 'WATCHING' });
})

const fs = require("fs");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./cmds/", (err, files) => {
  if (err) console.error(err);
  files.forEach(f => {
    let props = require(`./cmds/${f}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.login(client.conf.token)