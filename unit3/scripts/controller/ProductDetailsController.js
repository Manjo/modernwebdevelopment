(function () {
  'use strict';
  var ProductDetailsController = function (product) {
    	this.product = product;
  };
  angular.module('auction')
  	.controller('ProductDetailsController', ['product', ProductDetailsController]);
})();
