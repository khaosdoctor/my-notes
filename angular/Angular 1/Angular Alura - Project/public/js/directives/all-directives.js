(function () {
  angular.module('allDirectives', [])
    .directive('painelFotos', function () {
    
      return {
        restrict: "AE",
        transclude: true,
        scope: {
          titulo: '@'
        },
        templateUrl: "../partials/painel-fotos.html"
      };

    })
})()