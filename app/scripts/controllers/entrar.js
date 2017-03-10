'use strict';

angular.module('mercado_amigo')
	.controller('EntrarCtrl', EntrarCtrl);

EntrarCtrl.$inject = ['$http', '$window', '$httpParamSerializerJQLike'];

function EntrarCtrl($http, $window, $httpParamSerializerJQLike) {
	
	this.login = function(login, senha) {

		if (!login || !senha) {
			return;
		}

		var scope = this;

		$http({
			url: '/admin/login.php',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: $httpParamSerializerJQLike({
				user_user: login,
				user_pass: senha
			})
		}).then(function(success) {
			$window.location('/admin');
		}, function(error) {
			console.log(error);
			scope.erro = 'Usuário ou senhas incorretos.';
		});
	};

}