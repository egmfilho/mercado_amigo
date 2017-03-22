'use strict';

angular.module('mercado_amigo')
	.controller('EntrarCtrl', EntrarCtrl);

EntrarCtrl.$inject = [ '$rootScope', '$http', '$window', '$httpParamSerializerJQLike'];

function EntrarCtrl($rootScope, $http, $window, $httpParamSerializerJQLike) {
	
	this.login = function(login, senha) {

		if (!login || !senha) {
			return;
		}

		var scope = this;

		$rootScope.loading.load();
		$http({
			url: '/admin/login.php?site=1',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: $httpParamSerializerJQLike({
				user_user: login,
				user_pass: senha
			})
		}).then(function(success) {
			$rootScope.loading.unload();
			$window.location.href = '/admin';
		}, function(error) {
			console.log(error);
			scope.erro = 'Usuário ou senhas incorretos.';
			$rootScope.loading.unload();
		});
	};

}