const Discord = require("discord.js");
const Calculate = require("./calculate.js");
const Dates = require("./dates.js");
const Index = require("./index.js");

let self = module.exports = {
    create: function (msg) {
        var quit = {
          name: user.username,
          tagged: ('yes').toUpperCase(),
          tier: 1,
          suspension: "1 Day + " + "1 Game with Quitter Tag",
          previous: "N/A",
          recent: Date.now(),
          timeWithoutQuit: 0,
          quitter: "",
          comments: ""
        };
        collection.insertOne({ _id: user.id, quit }).then(found => {
          if (found) {
            collection.findOne({ _id: user.id }).then(doc => {
              self.punish(msg, doc);
            })
          }
        });
      },
    
      update: function (msg, data) {
        //Punish previous quitters
        var updated = Calculate.punishment(data);
        collection.findOneAndReplace({ _id: user.id }, updated).then(found => {
          if (found) {
            collection.findOne({ _id: user.id }).then(doc => {
              self.punish(msg, doc);
            })
          }
        });
      },
    
      //Formatted output
      punish: function (msg, data) {

        //Output for suspension
        data = data.quit;
        const embed = new Discord.RichEmbed()
          .setColor('#800000')
          .setTitle('Tier ' + data.tier + ' Quit Offense ' + data.quitter)
          .setDescription(user + ', please contact @Moderator when complete.')
          .addField('Suspension: ', data.suspension, true)
          .addField('Previous Quit: ', Dates.formatToUTC(data.previous), false)
          .setFooter(data.comments);
        return msg.channel.send(embed);
      },
}