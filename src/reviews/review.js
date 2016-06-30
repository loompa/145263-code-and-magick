'use strict';

var reviewsMethods = require('./reviewsMethods');

var Review = function(data, container) {

  this.data = data;
  this.element = reviewsMethods.getElement(this.data, container);

  var quizAnswerNo = this.element.querySelector('.review-quiz-answer-no');
  var quizAnswerYes = this.element.querySelector('.review-quiz-answer-yes');

  this.onYesClick = function() {
    quizAnswerNo.classList.remove('review-quiz-answer-active');
    quizAnswerYes.classList.add('review-quiz-answer-active');
  };

  this.onNoClick = function() {
    quizAnswerYes.classList.remove('review-quiz-answer-active');
    quizAnswerNo.classList.add('review-quiz-answer-active');
  };

  this.remove = function() {
    quizAnswerNo.removeEventListener('click', this.onYesClick);
    quizAnswerYes.removeEventListener('click', this.onNoClick);
    this.element.parentNode.removeChild(this.element);
  };

  quizAnswerNo.addEventListener('click', this.onNoClick);
  quizAnswerYes.addEventListener('click', this.onYesClick);
};

module.exports = Review;
