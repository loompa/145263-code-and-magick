'use strict';

(function() {
  var utils = require('./utilities');
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var form = document.querySelector('.review-form');
  var field = form.querySelector('.review-form-group-mark');
  var radio = form.elements['review-mark'];
  var name = form.elements['review-name'];
  var text = form.elements['review-text'];
  var reviewButton = document.querySelector('.review-submit');
  var RADIO_MIDDLE_VALUE = 3;

  var cookies = require('browser-cookies');

  document.getElementById('review-name').required = true;
  document.getElementById('review-text').required = true;
  reviewButton.disabled = true;
  radio.value = cookies.get('radioValue') || RADIO_MIDDLE_VALUE;
  name.value = cookies.get('nameValue');

  form.oninput = function() {
    utils.changeVisible(name.value, text.value);
    controlButton();
  };

  var controlButton = function() {
    if (radio.value <= RADIO_MIDDLE_VALUE) {
      reviewButton.disabled = !(text.value && name.value);
    } else {
      reviewButton.disabled = !name.value;
    }
  };

  form.onsubmit = function() {
    cookies.set('radioValue', radio.value, {expires: Date.now + utils.daysToExpire()});
    cookies.set('nameValue', name.value, {expires: Date.now + utils.daysToExpire()});
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
