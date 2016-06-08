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

  document.getElementById('review-name').required = true;

  field.onchange = function () {
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
