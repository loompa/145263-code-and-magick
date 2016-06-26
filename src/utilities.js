'use strict';

var BIRTH_DAY = 19;
var BIRTH_MONTH = 11;

var textPrompt = document.querySelector('.review-fields-text');
var namePrompt = document.querySelector('.review-fields-name');
var formPrompt = document.querySelector('.review-fields');

module.exports = {
  changeVisible: function(nameValue, textValue) {
    if (nameValue) {
      namePrompt.classList.add('invisible');
    } else {
      namePrompt.classList.remove('invisible');
    }

    if (textValue) {
      textPrompt.classList.add('invisible');
    } else {
      textPrompt.classList.remove('invisible');
    }

    if (nameValue && textValue) {
      formPrompt.classList.add('invisible');
    } else {
      formPrompt.classList.remove('invisible');
    }
  },

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
