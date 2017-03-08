'use strict';

angular.module('mercado_amigo.controllers')
	.controller('FaleConoscoCtrl', FaleConoscoCtrl);

FaleConoscoCtrl.$inject = [ '$http' ];

function FaleConoscoCtrl($http) {
	
	this.submit = function(nome, email, mensagem) {

		if (!nome || !email || !mensagem) {
			alert('Preencha corretamente todos os campos!');
			return;
		}

		$http({
			url: './mail.php?action=contact',
			method: 'POST',
			data: {
				'name': nome,
				'email': email,
				'message': mensagem
			}
		});
	};

}