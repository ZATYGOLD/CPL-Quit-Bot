//Author: ZATYGOLD - 26 October 2019
//Last Update: ZATYGOLD - 1 MAY 2020

//Packages
const Discord = require("discord.js");
const Config = require("./config/config.json");
const Client = require("mongodb").MongoClient;
const Player = require("./member.js");

//Client Objects
const Bot = new Discord.Client();
const Mongo = new Client(Config.url, { useNewUrlParser: true, useUnifiedTopology: true });

// Variables
var MSG;

//IDs
const notesModeratorId = '637851371986747402';
const moderatorId = '291753249361625089';
const quitBotChannel = '637745115489763331';
const botTestingChannel = '351127558143868928';

// Commands
const cmd_quit = '.quit';
const cmd_quit_usage = '`.quit`  `<@member>`';


//Connect to Database
Mongo.connect((err, result) => {
  console.log("Connected...");
  db = result.db('quits');
  collection = db.collection('quitter');
});

//The quit command
Bot.on("message", async msg => {
  if (msg.content.startsWith(cmd_quit)) {
    msg.delete();
    if (msg.member.roles.has(moderatorId) || msg.member.roles.has(notesModeratorId)  && msg.channel.id == botTestingChannel || msg.channel.id == quitBotChannel) {
      if (msg.mentions.users.size != 1) {
        return msg.reply('\n' + cmd_quit_usage).then(msg => { msg.delete(20000) });
      } else {
        user = msg.mentions.users.first();
        self.start(msg);
      }
    }
  }
});

let self  = module.exports = {
  start: function (msg) {
    //Checks database for matching player id
    collection.findOne({ _id: user.id }).then(result => {
      if (!result) {
        Player.create(msg);
      }
      else if (result) {
        Player.update(msg, result);
      }
    });
  },  
}

Bot.login(Config.token);