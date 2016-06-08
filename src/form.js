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

  document.getElementById('review-name').required = true;

  form.oninput = function() {
    changeVisible();
  }

  var changeVisible = function() {
    if (name.value != '') {
      namePrompt.classList.add('invisible');
    } else {
      namePrompt.classList.remove('invisible');
    }

    if (text.value != '') {
      textPrompt.classList.add('invisible');
    } else {
      textPrompt.classList.remove('invisible');
    }
  }

  field.onchange = function() {
    if (radio.value <= 3) {
      document.getElementById('review-text').required = true;
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
