'use strict';

(function() {
  var ESCAPE = 27;
  var picturesContainer = document.querySelector('.photogallery');
  var galleryContainer = document.querySelector('.overlay-gallery');
  var controlRight = document.querySelector('.overlay-gallery-control-right');
  var controlLeft = document.querySelector('.overlay-gallery-control-left');
  var closeBtn = document.querySelector('.overlay-gallery-close');
  var previewCurrentNumber = document.querySelector('.preview-number-current');
  var previewTotalNumber = document.querySelector('.preview-number-total');
  var pictures = picturesContainer.querySelectorAll('img');
  var preview = document.querySelector('.overlay-gallery-preview');
  var galleryPictures = [];
  var currentNumber = 0;

  module.exports = {
    getPictures: function(pics) {
      pics.forEach(function(picture) {
        galleryPictures.push(picture['src']);
      });
    },

    showGallery: function(number) {
      galleryContainer.classList.remove('invisible');

      showPicture(number);
      checkControlBounds(number);

      closeBtn.addEventListener('click', hideGallery);
      controlRight.addEventListener('click', switchRight);
      controlLeft.addEventListener('click', switchLeft);
      window.addEventListener('keyup', clickEscape);
    }
  };

  var gallery = require('./gallery');

  var hideGallery = function() {
    galleryContainer.classList.add('invisible');

    closeBtn.removeEventListener('click', hideGallery);
    controlRight.removeEventListener('click', switchRight);
    controlLeft.removeEventListener('click', switchLeft);
    window.removeEventListener('keyup', clickEscape);
    galleryPictures = [];
  };

  var showPicture = function(picNumber) {
    preview.style.backgroundImage = 'url(' + galleryPictures[picNumber] + ')';
    preview.style.backgroundSize = 'cover';
    currentNumber = picNumber;
    changePicNumber();
  };

  picturesContainer.addEventListener('click', function(evt) {
    var clickedElement = evt.target.src;
    gallery.getPictures(pictures);

    currentNumber = galleryPictures.indexOf(clickedElement);

    gallery.showGallery(currentNumber);
  });

  var clickEscape = function(evt) {
    if (evt.keyCode === ESCAPE) {
      hideGallery();
    }
  };

  var switchRight = function() {
    currentNumber++;
    checkControlBounds(currentNumber);
    showPicture(currentNumber);
  };

  var switchLeft = function() {
    currentNumber--;
    checkControlBounds(currentNumber);
    showPicture(currentNumber);
  };

  var changePicNumber = function() {
    previewCurrentNumber.innerHTML = currentNumber + 1;
    previewTotalNumber.innerHTML = galleryPictures.length;
  };

  var checkControlBounds = function(index) {
    if (index === galleryPictures.length - 1) {
      controlRight.classList.add('invisible');
    } else {
      controlRight.classList.remove('invisible');
    }

    if (index === 0) {
      controlLeft.classList.add('invisible');
    } else {
      controlLeft.classList.remove('invisible');
    }
  };
})();
