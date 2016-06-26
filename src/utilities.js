'use strict';

var BIRTH_DAY = 19;
var BIRTH_MONTH = 11;

module.exports = {
  daysToExpire: function() {
    var now = new Date();
    var myBirthday = new Date();
    myBirthday.setFullYear(now.getFullYear(), BIRTH_MONTH, BIRTH_DAY);

    var difference = now - myBirthday;

    if (difference < 0) {
      myBirthday.setFullYear(now.getFullYear() - 1, BIRTH_MONTH, BIRTH_DAY);
      difference = now - myBirthday;
    }

    return difference;
  }
};
