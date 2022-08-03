const config = require("./config.json");
const Discord = require('discord.js');
const pathfinder = require("mineflayer-pathfinder");
const antiAFK = require("mineflayer-antiafk");
const mcProtocol = require("minecraft-protocol");
const dbot = new Discord.Client({disableEveryone: true, intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]});
let cooldown = new Set();
let cdseconds = 2;
let joinseconds = 10;

var mineflayer = require('mineflayer');
var bot = mineflayer.createBot({
  host: config.ip,
  port: config.port,
  username: config.username,
  password: config.password,
  auth: config.auth,
  version: config.version,
});
dbot.on("ready", async () => {
    console.log(`Bot create by juancitocubo#0833`);
  });
  ({
});
dbot.on("ready", async () => {
    console.log(`Discord bot ${dbot.user.username} is ready!`);
    

    dbot.user.setActivity(`${config.activity}`, {type: "WATCHING"});
    dbot.user.setStatus(`${config.status}`)
    bot.setControlState(`forward`, false) 

});
bot.on('login', () => {
    bot.chat(config.loginmessage)
    console.log(`Minecraft bot is ready!`);
});
bot.on('chat', function(username, message) {
  if(!message.startsWith(config.prefix)) return;
  if(cooldown.has("active")){
	return console.log("active")
  }
  if (message.startsWith(config.prefix + 'coords')){
	console.log(username, message)
    if (username === bot.username) {
      return;
  }
    bot.chat(`> My coords are ${Math.floor(bot.entity.position.x)} ${Math.floor(bot.entity.position.y)} ${Math.floor(bot.entity.position.z)}`)
  cooldown.add("active")
  setTimeout(() => {
    cooldown.delete("active")
  }, cdseconds * 1000)
}

  if (message.startsWith(config.prefix + 'sleep')){
    console.log(username, message)

  if (username === bot.username) {
      return;
  }
  if (bot.time.day >= 12541 && bot.time.day <= 23458) {
    bot.chat(`>You can sleep right now.`)
    cooldown.add("active")
    setTimeout(() => {
      cooldown.delete("active")
    }, cdseconds * 1000)
  } else {
  bot.chat(`>You can't sleep right now.`)
  cooldown.add("active")
  setTimeout(() => {
    cooldown.delete("active")
  }, cdseconds * 1000)
};
  }

  if (message.startsWith(config.prefix + 'time')){
    console.log(username, message)

  if (username === bot.username) {
      return;
  }
  if (bot.time.day >= 12541 && bot.time.day <= 23458) {
    bot.chat(`>The world time in ticks is ${bot.time.day} and you can sleep right now.`)
    cooldown.add("active")
    setTimeout(() => {
      cooldown.delete("active")
    }, cdseconds * 1000)
  } else {
  bot.chat(`>The world time in ticks is ${bot.time.day}, but you can't sleep right now.`)
  cooldown.add("active")
  setTimeout(() => {
    cooldown.delete("active")
  }, cdseconds * 1000)
};
  }
});
bot.on('playerJoined', (player) => {
if (player.username !== bot.username) {
bot.chat(`>Welcome ${player.username}! to a peaceful christian server, be sure to read the rules using /kill`)
  }
})
bot.on('playerLeft', (player) => {
if (player.username === bot.username) return
bot.chat(`>Bay ${player.username} he went to jerk off <=3`)
})
dbot.on("messageCreate", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  if(!message.channel.id == config.chatchannelid) return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0]
  let args = messageArray.slice(1);
  let botmessage = args.join(" ");
  if(message.author.id == config.userid) {
  if(cmd === `${prefix}send`){
    bot.chat(botmessage)
    message.channel.send("sent")
  };
  if(cmd === `${prefix}look`){
    bot.look(botmessage,0,false);
  };
}
  if (username === bot.username) return
  bot.chat(`>Welcome ${player.username}! to a peaceful christian server, be sure to read the rules using /kill`)
  cooldown.add("joins")
  setTimeout(() => {
    cooldown.delete("joins")
  }, joinseconds * 1000)
})
function bindEvents(bot) {

  bot.on('error', function(err) {
      console.log('Error attempting to reconnect: ' + err.errno + '.');
      process.exit(1)
      if (err.code == undefined) {
          console.log('Invalid credentials OR bot needs to wait because it relogged too quickly.');
      }
  });
}
bot.on('kicked', function(reason) {
  console.log("I got kicked for ", reason, " :(");
  let chatChannel = dbot.channels.cache.get(config.chatchannelid);
  if (chatChannel) {
  	let kicked = new Discord.MessageEmbed();
    kicked.setDescription(`I got kicked for ${reason} :(`);
    chatChannel.send({embeds: [kicked]});
  }
});

  bot.on('end', function() {
    console.log("Bot has ended");
    process.exit(1)
});
bot.on('error', err => console.log(err));

dbot.login(config.token);

bot.on("message", msg => {
    let m = msg.toString();
    if (m.match("/login")) {
        bot.chat(`/login ${config.password_server}`);
    }
    else if (m.match("/register")) {
        bot.chat(`/register ${config.password_server} ${config.password_server}`);
    }
    
    let chatChannel = dbot.channels.cache.get(config.chatchannelid);
    if (chatChannel) {
        let messageEmbed = new Discord.MessageEmbed();
        messageEmbed.setDescription(m);
        messageEmbed.setColor("GREY");
        if (m.trim() == "") return;
        chatChannel.send({embeds: [messageEmbed]});
    }
      });
  