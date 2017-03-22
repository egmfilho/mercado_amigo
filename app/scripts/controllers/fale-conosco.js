'use strict';

angular.module('mercado_amigo.controllers')
	.controller('FaleConoscoCtrl', FaleConoscoCtrl);

FaleConoscoCtrl.$inject = [ '$rootScope', '$scope', '$http', '$httpParamSerializerJQLike' ];

function FaleConoscoCtrl($rootScope, $scope, $http, $httpParamSerializerJQLike) {

	function validar() {
		var isValid = true;

		jQuery('input, textarea').css('border', 'none');

		if (!$scope.nome) {
			jQuery('input[ng-model="nome"]').css('border', '1px solid red');
			isValid = false;
		}

		if (!$scope.email) {
			jQuery('input[ng-model="email"]').css('border', '1px solid red');
			isValid = false;
		}

		if (!$scope.mensagem) {
			jQuery('textarea[ng-model="mensagem"]').css('border', '1px solid red');
			isValid = false;
		}

		return isValid;
	}

	this.submit = function() {

		if (!validar()) {
			jQuery('#modal-warning').modal('show');
			return;
		}

		$rootScope.loading.load();
		$http({
			url: './mail.php?action=contact',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: $httpParamSerializerJQLike({
				'name': $scope.nome,
				'email': $scope.email,
				'message': $scope.mensagem
			})
		}).then(function(success) {
			$scope.nome = '';
			$scope.email = '';
			$scope.mensagem = '';
			$rootScope.loading.unload();
			jQuery('#modal-confirm').modal('show');
		}, function(error) {		
			$rootScope.loading.unload();
			jQuery('#modal-error').modal('show');
		});
	};

}