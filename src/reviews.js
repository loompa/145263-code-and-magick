'use strict';

var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.querySelector('template');
var reviewsFilter = document.querySelector('.reviews-filter');
var IMAGE_WIDTH = 120;
var IMAGE_HEIGHT = 120;
var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';
var ratingList = ['one', 'two', 'three', 'four', 'five'];

reviewsFilter.classList.add('invisible');

var elementToClone = templateElement.content.querySelector('.review');

var getReviewElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  element.querySelector('.review-text').textContent = data.description;

  element.querySelector('span').className = 'review-rating-' + ratingList[data.rating - 1];

  container.appendChild(element);

  var reviewImage = new Image();

  reviewImage.onload = function() {
    element.querySelector('img').src = data.author.picture;
    element.querySelector('img').width = IMAGE_WIDTH;
    element.querySelector('img').height = IMAGE_HEIGHT;
  };

  reviewImage.onerror = function() {
    element.classList.add('invisible');
  };

  reviewImage.src = data.author.picture;

  return element;
};

var getReviews = function(callback) {
  var xhr = new XMLHttpRequest();

  xhr.onload = function(evt) {
    reviewsContainer.classList.remove('reviews-list-loading');
    var loadedData = JSON.parse(evt.target.response);
    callback(loadedData);
  };

  xhr.onloadstart = function() {
    reviewsContainer.classList.add('reviews-list-loading');
    console.log('kash');
  };

  xhr.onerror = function() {
    reviewsContainer.classList.remove('reviews-list-loading');
    reviewsContainer.classList.add('reviews-load-failure');
  };

  xhr.timeout = 10000;

  xhr.ontimeout = function() {
    reviewsContainer.classList.remove('reviews-list-loading');
    reviewsContainer.classList.add('reviews-load-failure');
  };

  xhr.open('GET', REVIEWS_LOAD_URL);
  xhr.send();
};

var drawReviews = function(reviews) {
  reviews.forEach(function(review) {
    getReviewElement(review, reviewsContainer);
  });
};

getReviews(function(loadedReviews) {
  var reviews = loadedReviews;
  drawReviews(reviews);
});
