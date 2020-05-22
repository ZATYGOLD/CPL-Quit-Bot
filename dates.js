
let self = module.exports = {

    getTimeInMS: function (previousDate) {
        return Date.now() - previousDate;
      },

    formatToUTC: function (time){
        return new Date(time).toUTCString();
    }
}