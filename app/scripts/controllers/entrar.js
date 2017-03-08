'use strict';

angular.module('mercado_amigo')
	.controller('EntrarCtrl', EntrarCtrl);

EntrarCtrl.$inject = ['$http', '$window'];

function EntrarCtrl($http, $window) {
	
	this.login = function(login, senha) {

		if (!login || !senha) {
			return;
		}

		var scope = this;

		$http({
			url: '/admin/login.php',
			method: 'POST',
			data: {
				user_user: login,
				user_pass: senha
			},
			headers: {
				'Content-Type': 'Application/x-www-form-urlencoded'
			}
		}).then(function(success) {
			$window.location('/admin');
		}, function(error) {
			console.log(error);
			scope.erro = 'Usuário ou senhas incorretos.';
		});
	};

}