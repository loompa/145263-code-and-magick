'use strict';

var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.querySelector('template');
var reviewsFilter = document.querySelector('.reviews-filter');
var reviewsMore = document.querySelector('.reviews-controls-more');
var IMAGE_WIDTH = 120;
var IMAGE_HEIGHT = 120;
var PAGE_SIZE = 3;
var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';
var ratingList = ['one', 'two', 'three', 'four', 'five'];
var pageNumber = 0;

var getReviews = require('./getReviews');

var elementToClone = templateElement.content.querySelector('.review');

var reviews = [];
var filteredReviews = [];

reviewsMore.classList.remove('invisible');

var setFiltersEnabled = function() {
  reviewsFilter.addEventListener('click', function(evt) {
    if (evt.target.name === 'reviews') {
      setFilterEnabled(evt.target.id);
    }
  });
};

var setFilterEnabled = function(filter) {
  filteredReviews = getFilteredReviews(filter);
  pageNumber = 0;
  drawReviews(filteredReviews, pageNumber, true);
};

var getFilteredReviews = function(filter) {
  reviewsMore.classList.remove('invisible');
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

    default:
      reviewsToFilter = reviews;
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
    element.classList.add('review-load-failure');
  };

  reviewImage.src = data.author.picture;

  return element;
};

var drawReviews = function(reviewsToFilter, page, replace) {
  if (replace) {
    reviewsContainer.innerHTML = '';
  }

  var from = page * PAGE_SIZE;
  var to = from + PAGE_SIZE;

  reviewsToFilter.slice(from, to).forEach(function(review) {
    getReviewElement(review, reviewsContainer);
  });
};

var showMoreReviews = function() {
  reviewsMore.addEventListener('click', function() {
    pageNumber++;
    drawReviews(filteredReviews, pageNumber);
    if ((pageNumber + 1) === (Math.ceil(filteredReviews.length / PAGE_SIZE))) {
      reviewsMore.classList.add('invisible');
    }
  });
};

getReviews(function(loadedReviews) {
  reviews = loadedReviews;
  setFiltersEnabled();
  setFilterEnabled();
  showMoreReviews();
}, REVIEWS_LOAD_URL);
