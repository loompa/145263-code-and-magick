'use strict';

var LOAD_TIME = 10000;
var reviewsContainer = document.querySelector('.reviews-list');

var getReviews = function(callback, URL) {
  var xhr = new XMLHttpRequest();

  xhr.onload = function(evt) {
    reviewsContainer.classList.remove('reviews-list-loading');
    var loadedData = JSON.parse(evt.target.response);
    callback(loadedData);
  };

  xhr.onloadstart = function() {
    reviewsContainer.classList.add('reviews-list-loading');
  };

  xhr.onerror = function() {
    reviewsContainer.classList.remove('reviews-list-loading');
    reviewsContainer.classList.add('reviews-load-failure');
  };

  xhr.timeout = LOAD_TIME;

  xhr.ontimeout = function() {
    reviewsContainer.classList.remove('reviews-list-loading');
    reviewsContainer.classList.add('reviews-load-failure');
  };

  xhr.open('GET', URL);
  xhr.send();
};

module.exports = getReviews;
