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
			url: 'http://172.16.4.17/mercado-amigo/public/api.php?action=get_kits'
		}).then(function(success) {
			self.array = [];
			angular.forEach(success.data.data, function(item) {
				var kit = { 
					nome: item.kit_name,
					id: item.kit_id,
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