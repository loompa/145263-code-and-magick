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

  document.getElementById('review-name').required = true; //поле Имя должно быть обязательным
  document.getElementById('review-text').required = true; //по умолчанию оценка - 3, поэтому сначала отзыв обязательный
  reviewButton.disabled = true; //кнопка в начале выключена

  form.oninput = function() {
    changeVisible();
    controlButton();
  };

  var controlButton = function() {
    if (radio.value <= RADIO_MIDDLE_VALUE) {
      if (text.value && name.value) {
        reviewButton.disabled = false;
      } else {
        reviewButton.disabled = true;
      }
    } else {
      if (name.value) {
        reviewButton.disabled = false;
      } else {
        reviewButton.disabled = true;
      }
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

  field.onchange = function() {
    if (radio.value <= RADIO_MIDDLE_VALUE) {
      document.getElementById('review-text').required = true;
    } else {
      document.getElementById('review-text').required = false;
    }
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
