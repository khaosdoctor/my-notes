(function() {
	var app = angular.module('store', ['store-products']);

	// Controller da loja
	app.controller('StoreController', ['$http', function($http) {

		// Propriedade do controller
		var store = this;

		store.products = [ ];

		$http.get('/data/gems.json').success(function(data) {
			store.products = data;
		});

	}]);

	app.controller('ReviewController', function() {
		this.review = {};
		this.addReview = function(product) {
			product.reviews.push(this.review);
			this.review = {};
		};
	});

})();