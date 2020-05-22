//Author: ZATYGOLD - 11 May 2020
//Last Update: ZATYGOLD - 11 MAY 2020

const Dates = require("./dates.js");

var days;
var games;

let self = module.exports = {
  punishment: function (data) {
    quit = data.quit;
    tier = quit.tier;

    self.updateTier();
    self.updateSuspension();
    self.extraDetails();

    var updatedDocument = {
      _id: data._id,
      quit: {
        name: quit.name,
        tagged: quit.tagged,
        tier: tier,
        suspension: days + " Days + " + games + " Games with Quitter Tag",
        previous: quit.recent,
        recent: Date.now(),
        timeWithoutQuit: Dates.getTimeInMS(quit.recent),
        quitter: quitter,
        comments: comment
      }
    };
    return updatedDocument;
  },

  updateTier: function () {
    var daysWithoutQuitting = 0;
    //Decreases the tier level for days without a quit
    if ((tier -= Math.floor(daysWithoutQuitting / 90)) <= 0) {
      tier = 1;
    }
    else {
      tier += 1;
    }
  },

  updateSuspension: function () {
    //The punishments for a quit based on tier level
    switch (tier) {
      case 2:
        days = 3;
        games = 3;
        break;
      case 3:
        days = 7;
        games = 5;
        break;
      case 4:
        days = 14;
        games = 7;
        break;
      case 5:
        days = 21;
        games = 10;
        break;
      case 6:
        days = 30;
        games = 15;
        break;
      case 7:
        console.log("Banned");
        days = 180;
        break;
      default:
        days = 1;
        games = 1;
    }
  },

  extraDetails: function () {
    //Adds 3 to the quitter tag days if tagged as a quitter
    if (quit.tagged.charAt(0) == 'Y' || quit.tagged.charAt(0) == 'T' || quit.tagged == true) {
      quitter = "with Quitter Tag";
      comment = "Added 3 days to punishment for having quitter tag.";
      days += 3;
    }
    else {
      quitter = "";
      comment = "";
    }
  },
}