'use strict';

(function() {
  var picturesContainer = document.querySelector('.photogallery');
  var galleryContainer = document.querySelector('.overlay-gallery');
  var controlRight = document.querySelector('.overlay-gallery-control-right');
  var controlLeft = document.querySelector('.overlay-gallery-control-left');
  var closeBtn = document.querySelector('.overlay-gallery-close');
  var pictures = picturesContainer.querySelectorAll('img');
  var preview = document.querySelector('.overlay-gallery-preview');
  var galleryPictures = [];
  var currentNumber = 0;

  var getPictures = function(pictures) {
    for (var i = 0; i < pictures.length; i++) {
      console.log(typeof pictures[i]);
      galleryPictures.push(pictures[i]['src']);
    }
  };

  var showGallery = function(number) {
    galleryContainer.classList.remove('invisible');
    getPictures(pictures);
    
    showPicture(number);
    checkControlBounds(number);
  }; 

  var hideGallery = function() {
    galleryContainer.classList.add('invisible');
  };

  var showPicture = function(picNumber) {
    preview.style.backgroundImage = 'url(' + galleryPictures[picNumber] +')';
    preview.style.backgroundSize = 'cover';
    currentNumber = picNumber;
  };

  picturesContainer.addEventListener('click', function(evt) {
    showGallery(currentNumber);
  });

  window.addEventListener('keyup', function(evt) {
    if (evt.keyCode == 27) hideGallery();
  });

  closeBtn.addEventListener('click', function(evt) {
    hideGallery();
  });

  controlRight.addEventListener('click', function(evt) {
    currentNumber++;
    checkControlBounds(currentNumber);
    showPicture(currentNumber);
  });

  controlLeft.addEventListener('click', function(evt) {
    currentNumber--;
    checkControlBounds(currentNumber);
    showPicture(currentNumber);
  });

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
  } 

})();
