var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.querySelector('template');

//if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.review');
//} else {
//  elementToClone = template.querySelector('.review');
//}

var getReviewElement = function(data, container) {
	var element = elementToClone.cloneNode(true);
	element.querySelector('.review-text').textContent = data.description;
	element.querySelector('.review-rating').textContent = data.rating;
	element.querySelector('img').src = data.author.picture;
	element.querySelector('img').alt = data.author.name;

    container.appendChild(element);
    return element;
};

window.reviews.forEach(function(review, i, arr) {
	getReviewElement(review, reviewsContainer);
});
