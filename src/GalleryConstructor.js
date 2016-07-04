'use strict';

var Gallery = function(picturesContainer, galleryContainer) {
  var self = this;

  this.hostUrl = 'http://localhost:8080/';
  this.ESCAPE = 27;
  this.galleryPictures = picturesContainer.querySelectorAll('img');
  this.controlRight = document.querySelector('.overlay-gallery-control-right');
  this.controlLeft = document.querySelector('.overlay-gallery-control-left');
  this.closeBtn = document.querySelector('.overlay-gallery-close');
  this.currentImage = new Image();

  var currentNumber = 0;

  this.pictures = [];

  this.hashChange = function() {
    var hashContent = location.hash.match(/#photo\/(\S+)/);
    if (hashContent) {
      self.showGallery(self.pictures.indexOf(hashContent[1]));
    }
  };

  this.pageReady = function() {
    var hashContent = location.hash.match(/#photo\/(\S+)/);
    if (hashContent) {
      self.showGallery(null, hashContent[1]);
    }
  };

  this.getHashFromString = function(imageUrl) {
    var mySplitString = imageUrl.match(/img\/(\S+)/);
    return mySplitString[0];
  };

  this.picturesContainerClick = function(evt) {
    self.setHash(evt.target.getAttribute('src'));
  };

  this.fillPictures = function(pics) {
    pics.forEach(function(picture) {
      self.pictures.push(picture['src']);
    });
    
    self.pictures = self.pictures.map(function(picturesUrl) {
      return picturesUrl.substr(self.hostUrl.length);
    });
  };

  this.fillPictures(this.galleryPictures);

  this.showGallery = function(number, picUrl) {
    galleryContainer.classList.remove('invisible');

    currentNumber = (picUrl) ? (self.pictures.indexOf(picUrl)) : number;
    self.showPicture(number, picUrl);
    self.checkControlBounds(number);

    self.closeBtn.addEventListener('click', self.hideGallery);
    self.controlRight.addEventListener('click', self.switchRight);
    self.controlLeft.addEventListener('click', self.switchLeft);
    window.addEventListener('keyup', self.clickEscape);
  };

  this.showPicture = function(picNumber, picUrl) {
    var preview = document.querySelector('.overlay-gallery-preview');
    if (picUrl) {
      self.currentImage.setAttribute('src', picUrl);
      preview.appendChild(self.currentImage);
    } else {
      self.currentImage.setAttribute('src', self.pictures[currentNumber]);
      preview.appendChild(self.currentImage);
    }

    self.changePicNumber();
  };

  this.setHash = function(myUrl) {
    location.hash = (myUrl) ? ('#photo/' + myUrl) : '';
  };

  this.changePicNumber = function() {
    var previewCurrentNumber = document.querySelector('.preview-number-current');
    var previewTotalNumber = document.querySelector('.preview-number-total');
    previewCurrentNumber.innerHTML = currentNumber + 1;
    previewTotalNumber.innerHTML = this.pictures.length;
  };

  this.hideGallery = function() {
    galleryContainer.classList.add('invisible');

    self.setHash();
    currentNumber = 0;

    self.closeBtn.removeEventListener('click', self.hideGallery);
    self.controlRight.removeEventListener('click', self.switchRight);
    self.controlLeft.removeEventListener('click', self.switchLeft);
    window.removeEventListener('keyup', self.clickEscape);
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
    currentNumber++;
    self.checkControlBounds(currentNumber);
    var currentHash = self.getHashFromString(self.pictures[currentNumber]);
    self.setHash(currentHash);
  };

  this.switchLeft = function() {
    currentNumber--;
    self.checkControlBounds(currentNumber);
    var currentHash = self.getHashFromString(self.pictures[currentNumber]);
    self.setHash(currentHash);
  };

  picturesContainer.addEventListener('click', this.picturesContainerClick);
  window.addEventListener('hashchange', this.hashChange);
  document.addEventListener('DOMContentLoaded', this.pageReady);
};

module.exports = Gallery;
