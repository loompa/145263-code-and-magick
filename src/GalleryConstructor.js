'use strict';

var Gallery = function(picturesContainer, galleryContainer) {
  var self = this;

  this.ESCAPE = 27;
  this.galleryPictures = picturesContainer.querySelectorAll('img');
  this.controlRight = document.querySelector('.overlay-gallery-control-right');
  this.controlLeft = document.querySelector('.overlay-gallery-control-left');
  this.closeBtn = document.querySelector('.overlay-gallery-close');

  this.currentNumber = 0;

  this.pictures = [];

  this.picturesContainerClick = function(evt) {
    var clickedElement = evt.target.src;

    self.fillPictures(self.galleryPictures);
    this.currentNumber = self.pictures.indexOf(clickedElement);
    self.showGallery(this.currentNumber);

    self.closeBtn.addEventListener('click', self.hideGallery);
    self.controlRight.addEventListener('click', self.switchRight);
    self.controlLeft.addEventListener('click', self.switchLeft);
    window.addEventListener('keyup', self.clickEscape);
  };

  this.fillPictures = function(pics) {
    pics.forEach(function(picture) {
      self.pictures.push(picture['src']);
    });
  };

  this.showGallery = function(number) {
    galleryContainer.classList.remove('invisible');

    self.showPicture(number);
    self.checkControlBounds(number);
  };

  this.showPicture = function(picNumber) {
    var preview = document.querySelector('.overlay-gallery-preview');
    preview.style.backgroundImage = 'url(' + self.pictures[picNumber] + ')';
    preview.style.backgroundSize = 'cover';
    this.currentNumber = picNumber;

    self.changePicNumber();
  };

  this.changePicNumber = function() {
    var previewCurrentNumber = document.querySelector('.preview-number-current');
    var previewTotalNumber = document.querySelector('.preview-number-total');
    previewCurrentNumber.innerHTML = this.currentNumber + 1;
    previewTotalNumber.innerHTML = this.pictures.length;
  };

  this.hideGallery = function() {
    galleryContainer.classList.add('invisible');

    self.closeBtn.removeEventListener('click', self.hideGallery);
    self.controlRight.removeEventListener('click', self.switchRight);
    self.controlLeft.removeEventListener('click', self.switchLeft);
    window.removeEventListener('keyup', self.clickEscape);
    self.pictures = [];
  };

  this.checkControlBounds = function(index) {
    if (index === this.pictures.length - 1) {
      this.controlRight.classList.add('invisible');
    } else {
      this.controlRight.classList.remove('invisible');
    }

    if (index === 0) {
      this.controlLeft.classList.add('invisible');
    } else {
      this.controlLeft.classList.remove('invisible');
    }
  };

  this.clickEscape = function(evt) {
    if (evt.keyCode === self.ESCAPE) {
      self.hideGallery();
    }
  };

  this.switchRight = function() {
    self.currentNumber++;
    self.checkControlBounds(self.currentNumber);
    self.showPicture(self.currentNumber);
  };

  this.switchLeft = function() {
    self.currentNumber--;
    self.checkControlBounds(self.currentNumber);
    self.showPicture(self.currentNumber);
  };

  picturesContainer.addEventListener('click', this.picturesContainerClick);
};

module.exports = Gallery;
