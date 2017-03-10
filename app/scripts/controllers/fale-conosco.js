'use strict';

angular.module('mercado_amigo.controllers')
	.controller('FaleConoscoCtrl', FaleConoscoCtrl);

FaleConoscoCtrl.$inject = [ '$http', '$httpParamSerializerJQLike' ];

function FaleConoscoCtrl($http, $httpParamSerializerJQLike) {
	
	function validar(nome, email, mensagem) {
		var isValid = true;

		jQuery('input').css('border', 'none');

		if (!nome) {
			jQuery('input[ng-model="nome"]').css('border', '1px solid red');
			isValid = false;
		}

		if (!email) {
			jQuery('input[ng-model="email"]').css('border', '1px solid red');
			isValid = false;
		}

		if (!mensagem) {
			jQuery('textarea[ng-model="mensagem"]').css('border', '1px solid red');
			isValid = false;
		}

		return isValid;
	}

	this.submit = function(nome, email, mensagem) {

		if (!validar(nome, email, mensagem)) {
			alert('Preencha corretamente todos os campos!');
			return;
		}

		$http({
			url: './mail.php?action=contact',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: $httpParamSerializerJQLike({
				'name': nome,
				'email': email,
				'message': mensagem
			})
		}).then(function(success) {
			alert('Mensagem enviada!');
		}, function(error) {
			alert('Não foi possível enviar a mensagem. Tente novamente mais tarde.');
		});
	};

}