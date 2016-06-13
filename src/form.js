'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var form = document.querySelector('.review-form');
  var field = form.querySelector('.review-form-group-mark');
  var radio = form.elements['review-mark'];
  var name = form.elements['review-name'];
  var text = form.elements['review-text'];
  var textPrompt = document.querySelector('.review-fields-text');
  var namePrompt = document.querySelector('.review-fields-name');
  var formPrompt = document.querySelector('.review-fields');
  var reviewButton = document.querySelector('.review-submit');
  var RADIO_MIDDLE_VALUE = 3;
  var BIRTH_DAY = 19;
  var BIRTH_MONTH = 11;
  var cookies = require('browser-cookies');

  document.getElementById('review-name').required = true; //поле Имя должно быть обязательным
  document.getElementById('review-text').required = true; //по умолчанию оценка - 3, поэтому сначала отзыв обязательный
  reviewButton.disabled = true; //кнопка в начале выключена
  radio.value = cookies.get('radioValue') || 3;
  name.value = cookies.get('nameValue');

  form.oninput = function() {
    changeVisible();
    controlButton();
  };

  var controlButton = function() {
    if (radio.value <= RADIO_MIDDLE_VALUE) {
      reviewButton.disabled = !(text.value && name.value);
    } else {
      reviewButton.disabled = !name.value;
    }
  };

  var changeVisible = function() {
    if (name.value) {
      namePrompt.classList.add('invisible');
    } else {
      namePrompt.classList.remove('invisible');
    }

    if (text.value) {
      textPrompt.classList.add('invisible');
    } else {
      textPrompt.classList.remove('invisible');
    }

    if (name.value && text.value) {
      formPrompt.classList.add('invisible');
    } else {
      formPrompt.classList.remove('invisible');
    }
  };

  var daysToExpire = function() {
    var now = new Date();
    var myBirthday = new Date();
    myBirthday.setFullYear(now.getFullYear(), BIRTH_MONTH, BIRTH_DAY);

    var difference = now - myBirthday;

    if (difference < 0) {
      myBirthday.setFullYear(now.getFullYear() - 1, BIRTH_MONTH, BIRTH_DAY);
      difference = now - myBirthday;
    }

    return difference;
  };

  form.onsubmit = function() {
    cookies.set('radioValue', radio.value, {expires: Date.now + daysToExpire()});
    cookies.set('nameValue', name.value, {expires: Date.now + daysToExpire()});
  };

  field.onchange = function() {
    document.getElementById('review-text').required = (radio.value <= RADIO_MIDDLE_VALUE);
  };

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };
})();
