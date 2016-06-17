'use strict';

var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.querySelector('template');
var reviewsFilter = document.querySelector('.reviews-filter');
var IMAGE_WIDTH = 120;
var IMAGE_HEIGHT = 120;
var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';
var ratingList = ['one', 'two', 'three', 'four', 'five'];

var elementToClone = templateElement.content.querySelector('.review');

var reviews = [];

var setFiltration = function() {
  var filters = reviewsFilter.querySelectorAll('input');
  for (var i = 0; i < filters.length; i++) {
    filters[i].onclick = function() {
      setFilterEnabled(this.id);
    };
  }
};

var setFilterEnabled = function(filter) {
  var filteredReviews = getFilteredReviews(filter);
  drawReviews(filteredReviews);
};

var getFilteredReviews = function(filter) {
  var reviewsToFilter = reviews.slice(0);

  switch (filter) {
    case 'reviews-bad':
      reviewsToFilter = reviewsToFilter.filter(function(review) {
        return review.rating < 3;
      }).sort(function(a, b) {
        return a.rating - b.rating;
      });
      break;

    case 'reviews-recent':
      reviewsToFilter.sort(function(a, b) {
        return Date.parse(b.date) - Date.parse(a.date);
      });
      break;

    case 'reviews-good':
      reviewsToFilter = reviewsToFilter.filter(function(review) {
        return review.rating > 2;
      }).sort(function(a, b) {
        return b.rating - a.rating;
      });
      break;

    case 'reviews-popular':
      reviewsToFilter.sort(function(a, b) {
        return b.usefulness - a.usefulness;
      });
      break;
  }

  return reviewsToFilter;
};

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
  reviewsContainer.innerHTML = '';
  reviews.forEach(function(review) {
    getReviewElement(review, reviewsContainer);
  });
};

getReviews(function(loadedReviews) {
  var reviews = loadedReviews;
  setFiltration();
  drawReviews(reviews);
});
