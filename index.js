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
  client.user.setActivity(`with the time!`,);
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
var interval;


  if(command === "ping") {
    message.delete(message.content);
    const m = await message.channel.send("Collecting...");
    m.edit(`[SystemTCP] Network ${m.createdTimestamp - message.createdTimestamp - 180} ms || API ${Math.round(client.ping / 4)} ping`);
    }

  if(command === "countdown") {
  	message.delete(message.content);
  	if(!zile || !ore || !minute || !timerchannelID) return message.reply("[CountDown System]\nSyntax: /countdown <channel ID> <days> <hours> <minutes>").then(msg => {msg.delete(5000)});
        const countdown = new Discord.RichEmbed()
      .setColor("#f7df1e")      
      .setAuthor('Countdown to the Cyberpunk 2077 release date')                        
      .addField(`Time left: `, `**Days**: ${zile}, **Hours**: ${ore}, **Minutes**: ${minute}`)
      .setFooter(`This is a countdown to the release day. The actual hour can vary.`)
      .setImage('https://i.imgur.com/n8Qx1Ay.png');
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
                        sendmsg.edit(new Discord.RichEmbed()
                        .setColor("#f7df1e")  
                        .setAuthor('Countdown to the Cyberpunk 2077 release date')                        
                        .addField(`Time left: `, `**Days**: ${zile}, **Hours**: ${ore}, **Minutes**: ${minute}`)
                        .setFooter(`This is a countdown to the release day. The actual hour can vary.`)
                        .setImage('https://i.imgur.com/n8Qx1Ay.png'));
                        }, refreshrate);
                    });
   }



});
client.login(config.token);