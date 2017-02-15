'use strict';

angular.module('mercado_amigo.controllers')
	.controller('CadastroCtrl', CadastroCtrl);

CadastroCtrl.$inject = ['$http'];

function CadastroCtrl($http) {

	this.submit = function(nome, email, telefone) {
		$http({
			url: './mail.php?action=register',
			method: 'POST',
			data: {
				'name': nome,
				'email': email,
				'tel': telefone
			},
			headers: {
				'Content-Type': 'Application/x-www-form-urlencoded'
			}
		});
	};

}