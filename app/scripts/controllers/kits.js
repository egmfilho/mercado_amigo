'use strict';

angular.module('mercado_amigo.controllers')
	.controller('KitsCtrl', KitsCtrl);

KitsCtrl.$inject = ['$http'];

function KitsCtrl($http) {

	var self = this;

	this.array = [];

	function obterKits() {
		$http({
			method: 'GET',
			url: 'api.php?action=get_kits'
		}).then(function(success) {
			self.array = [];
			angular.forEach(success.data.data, function(item) {
				var kit = { 
					id: item.kit_id,
					nome: item.kit_name,
					value: item.kit_value,
					itens: [ ]
				};

				angular.forEach(item.KitItem, function(produto) {
					kit.itens.push(produto.kit_item_amount + ' ' + produto.Product.product_name);
				});

				self.array.push(kit);
			});
			console.log(self.array);
		}, function(error) {
			console.log(error);
		});
	};

	obterKits();
}