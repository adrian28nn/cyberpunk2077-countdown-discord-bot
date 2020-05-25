const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const timendate = new Date(Date.now()).toLocaleString("en-US", {timeZone: "Europe/Bucharest"});
const config = require("./config.json");
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

client.on("ready", () => {
  console.log(`ONLINE!`); 
  client.user.setActivity(`COUNTING THE TIME DUDE!`, { type: 'WATCHING' });
});

client.on("message", async message => {
if(message.channel instanceof Discord.DMChannel) return;
if(message.content.indexOf(config.prefix) !== 0) return;
const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
var zile = args[1];
var ore = args[2];
var minute = args[3];
var secunde = 0;
var zilems = zile*86400000;
var orems = ore*3600000;
var minutems = minute*60000;
var combinatie = zilems+orems+minutems;
var refreshrate = 60000; 
var timerchannelID = args[0];
var mesajembed = args.slice(4).join(' ');
var interval;
  if(command === "ping") {
    message.delete(message.content);
    const m = await message.channel.send("Collecting...");
    m.edit(`[SystemTCP] Network ${m.createdTimestamp - message.createdTimestamp - 180} ms || API ${Math.round(client.ping / 4)} ping`);
    }

  if(command === "countdown") {
  	message.delete(message.content);
  	if(!zile || !ore || !minute || !mesajembed || !timerchannelID) return message.reply("[CountDown System]\nSyntax: /countdown <channel ID> <days> <hours> <minutes> <message>").then(msg => {msg.delete(5000)});
    const countdown = new Discord.RichEmbed()
      .setColor("#f7df1e")      
  		.setTitle('wanna be countdown')
  		.setAuthor('Release Date: 17.09.2020', 'https://i.imgur.com/c3vPxxY.png')
  		.addField(`Time left: `, `**Days**: ${zile}, **Hours**: ${ore}, **Minutes**: ${minute}`)
      .addField(`Message:`, `${mesajembed}`);
  	const countdownchannel = client.channels.find(channel => channel.id === timerchannelID);
    countdownchannel.send(countdown)
                    .then(sendmsg => {
                      interval = setInterval(function () {
                        var ziles = zile*86400;
                        var ores = ore*3600;
                        var minutes = minute*60;

                        var totals = ziles + ores + minutes - refreshrate/1000;
                        zile = Math.floor(totals/86400);
                        totals = totals - zile*86400;
                        ore = Math.floor(totals/3600);
                        totals = totals - ore*3600;
                        minute = Math.floor(totals/60);
                        sendmsg.edit(new Discord.RichEmbed().setColor("#f7df1e")      
                        .setTitle('wanna be countdown')
                        .setAuthor('Release Date: 17.09.2020', 'https://i.imgur.com/c3vPxxY.png')
                        .addField(`Time left: `, `**Days**: ${zile}, **Hours**: ${ore}, **Minutes**: ${minute}`)
                        .addField(`Message:`, `${mesajembed}`));
                        }, refreshrate);
                    });
   }



});
client.login(config.token);