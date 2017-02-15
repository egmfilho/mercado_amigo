'use strict';

angular.module('mercado_amigo.controllers')
	.controller('FaleConoscoCtrl', FaleConoscoCtrl);

FaleConoscoCtrl.$inject = [ '$http' ];

function FaleConoscoCtrl($http) {
	
	this.submit = function(nome, email, mensagem) {
		$http({
			url: './mail.php?action=contact',
			method: 'POST',
			data: {
				'name': nome,
				'email': email,
				'message': mensagem
			},
			headers: {
				'Content-Type': 'Application/x-www-form-urlencoded'
			}
		});
	};

}