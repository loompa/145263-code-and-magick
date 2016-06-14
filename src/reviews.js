'use strict';

var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.querySelector('template');
var reviewsFilter = document.querySelector('.reviews-filter');
var IMAGE_WIDTH = 120;
var IMAGE_HEIGHT = 120;
var ratingList = ['one', 'two', 'three', 'four', 'five'];

reviewsFilter.classList.add('invisible');

var elementToClone = templateElement.content.querySelector('.review');

var getReviewElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  element.querySelector('.review-text').textContent = data.description;

  var ratingValue = data.rating;
  element.querySelector('span').className = 'review-rating-' + ratingList[ratingValue-1];

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

window.reviews.forEach(function(review) {
  getReviewElement(review, reviewsContainer);
});
