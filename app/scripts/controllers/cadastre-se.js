'use strict';

angular.module('mercado_amigo.controllers')
	.controller('CadastroCtrl', CadastroCtrl);

CadastroCtrl.$inject = ['$scope', '$http', '$httpParamSerializerJQLike'];

function CadastroCtrl($scope, $http, $httpParamSerializerJQLike) {

	var self = this,
		repetirEnderecoEntrega = true;

	self.dados = { };
	self.endereco = { };
	self.entrega = { };
	self.contato = { };
	self.bancario = { };
	self.rede = { };

	function initDados() {
		self.dados = { 
			nome: '',
			cpf: '',
			rg: '',
			nascimento: '',
			sexo: ''
		};
	}

	function initEndereco() {
		self.endereco = {
			endereco: '',
			numero: '',
			complemento: '',
			bairro: '',
			cep: '',
			referencia: '',
			cidade: '',
			uf: ''
		};
	}

	function initEntrega() {
		self.entrega = {
			endereco: '',
			numero: '',
			complemento: '',
			bairro: '',
			cep: '',
			referencia: '',
			cidade: '',
			uf: ''
		};
	}

	function initContato() {
		self.contato = {
			email: '',
			telefone: '',
			cel1: {
				numero: '',
				operadora: '',
				whatsapp: ''
			},
			cel2: {
				numero: '',
				operadora: '',
				whatsapp: ''
			}
		};
	}

	function initBancario() {
		self.bancario = {
			banco: '',
			agencia: '',
			conta: '',
			tipo: ''
		};
	}

	function initRede() {
		self.rede = {
			nomeIndicador: '',
			cpfIndicador: '',
			nivel1: '',
			derramamento: ''
		};
	}

	(function init() {
		initDados();
		initEndereco();
		initEntrega();
		initContato();
		initBancario();
		initRede();

		$scope.$watch(function(scope) {
			return self.endereco;
		}, function(newVal, oldVal) {
			if (repetirEnderecoEntrega) {
				angular.copy(newVal, self.entrega);
			}
		}, true);
	}());

	self.bindEnderecos = function(val) {
		repetirEnderecoEntrega = val;

		if (val) {
			angular.copy(self.endereco, self.entrega);
		} else {
			initEntrega();
		}
	};

	function validarDados() {
		var flag = true;

		if (!self.dados.nome) {
			jQuery('input[ng-model="cadastro.dados.nome"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.dados.cpf) {
			jQuery('input[ng-model="cadastro.dados.cpf"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.dados.rg) {
			jQuery('input[ng-model="cadastro.dados.rg"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.dados.nascimento) {
			jQuery('input[ng-model="cadastro.dados.nascimento"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.dados.sexo) {
			jQuery('.custom-select[name="selectSexo"]').css('border', '1px solid red');
			flag = false;
		}

		return flag;
	};

	function validarEndereco() {
		var flag = true;

		if (!self.endereco.endereco) {
			jQuery('input[ng-model="cadastro.endereco.endereco"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.endereco.numero) {
			jQuery('input[ng-model="cadastro.endereco.numero"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.endereco.bairro) {
			jQuery('input[ng-model="cadastro.endereco.bairro"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.endereco.cep) {
			jQuery('input[ng-model="cadastro.endereco.cep"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.endereco.cidade) {
			jQuery('input[ng-model="cadastro.endereco.cidade"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.endereco.uf) {
			jQuery('input[ng-model="cadastro.endereco.uf"]').css('border', '1px solid red');
			flag = false;
		}

		return flag;
	}

	function validarEntrega() {
		var flag = true;

		if (!self.entrega.endereco) {
			jQuery('input[ng-model="cadastro.entrega.endereco"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.entrega.numero) {
			jQuery('input[ng-model="cadastro.entrega.numero"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.entrega.bairro) {
			jQuery('input[ng-model="cadastro.entrega.bairro"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.entrega.cep) {
			jQuery('input[ng-model="cadastro.entrega.cep"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.entrega.cidade) {
			jQuery('input[ng-model="cadastro.entrega.cidade"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.entrega.uf) {
			jQuery('input[ng-model="cadastro.entrega.uf"]').css('border', '1px solid red');
			flag = false;
		}

		return flag;
	}

	function validarContato() {
		var flag = true;

		if (!self.contato.email) {
			jQuery('input[ng-model="cadastro.contato.email"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.contato.telefone) {
			jQuery('input[ng-model="cadastro.contato.telefone"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.contato.cel1.numero) {
			jQuery('input[ng-model="cadastro.contato.cel1.numero"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.contato.cel1.operadora) {
			jQuery('input[ng-model="cadastro.contato.cel1.operadora"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.contato.cel1.whatsapp) {
			jQuery('.custom-select[name="cel1.whatsapp"]').css('border', '1px solid red');
			flag = false;
		}

		return flag;
	}

	function validarBancario() {
		var flag = true;

		if (!self.bancario.banco) {
			jQuery('input[ng-model="cadastro.bancario.banco"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.bancario.agencia) {
			jQuery('input[ng-model="cadastro.bancario.agencia"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.bancario.conta) {
			jQuery('input[ng-model="cadastro.bancario.conta"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.bancario.tipo) {
			jQuery('.custom-select[name="tipo"]').css('border', '1px solid red');
			flag = false;
		}

		return flag;
	}

	function validarRede() {
		var flag = true;

		if (!self.rede.nivel1) {
			jQuery('.custom-select[name="nivel1"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.rede.derramamento) {
			jQuery('.custom-select[name="derramamento"]').css('border', '1px solid red');
			flag = false;
		}

		return flag;
	}

	function validar() {
		jQuery('input, .custom-select').css('border', 'none');

		var dados = validarDados(),
			endereco = validarEndereco(),
			entrega = validarEntrega(),
			contato = validarContato(),
			bancario = validarBancario(),
			rede = validarRede();

		return (dados && endereco && entrega && contato && bancario && rede);
	}

	self.submit = function() {

		if (!validar()) {
			alert('Preencha todos os campos corretamente!');
			return;
		};

		var data = { };
		data['dados'] = self.dados;
		data['endereco'] = self.endereco;
		data['entrega'] = self.entrega;
		data['contato'] = self.contato;
		data['bancario'] = self.bancario;
		data['rede'] = self.rede;

		$http({
			url: './mail.php?action=register',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: $httpParamSerializerJQLike(data)			
		}).then(function(success) {
			alert('Mensagem enviada!');
		}, function(error) {
			alert('Não foi possível enviar a mensagem. Tente novamente mais tarde.');
		});
	};

	self.limpar = function() {
		if (confirm('Deseja limpar todos os campos?')) {
			initDados();
			initEndereco();
			initEntrega();
			initContato();
			initBancario();
			initRede();
		}
	};

}