(function() {
	var app = angular.module('store-products', [ ]);

	app.directive('productTitle', function() {
		return {
			restrict: 'E',
			templateUrl: 'product-title.html'
		};
	});

	app.directive('productPanels', function() {
		return {
			restrict: 'E',
			templateUrl: 'product-panels.html',
			controller: function() {
				this.tab = 1;
				this.selectTab = function(tab) {
					this.tab = tab;
				};
				this.isSelected = function(tab) {
					return this.tab === tab;
				};
			},
			controllerAs: 'panel'
		};
	});
})();