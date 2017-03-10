'use strict';

angular.module('mercado_amigo.controllers', [ ]);

angular.module('mercado_amigo', [
		'ngAnimate',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'mercado_amigo.controllers',
		'ui.mask'
	])
	.config(['$locationProvider', function($locationProvider) {
		$locationProvider.hashPrefix('');
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
	}])
	.config(['$routeProvider', function($routeProvider) {

		$routeProvider
			.when('/', {
				name: 'home',
				templateUrl: 'views/home.html',
				controller: 'HomeCtrl',
				controllerAs: 'home'
			})
			.when('/quem-somos', {
				name: 'quem-somos',
				templateUrl: 'views/quem-somos.html'
			})
			.when('/sistema', {
				name: 'sistema',
				templateUrl: 'views/sistema.html'
			})
			.when('/kits', {
				name: 'kits',
				templateUrl: 'views/kits.html',
				controller: 'KitsCtrl',
				controllerAs: 'kits'
			})
			.when('/cadastre-se', {
				name: 'cadastre-se',
				templateUrl: 'views/cadastre-se.html',
				controller: 'CadastroCtrl',
				controllerAs: 'cadastro'
			})
			.when('/fale-conosco', {
				name: 'fale-conosco',
				templateUrl: 'views/fale-conosco.html',
				controller: 'FaleConoscoCtrl',
				controllerAs: 'faleConosco'
			})
			.when('/entrar', {
				name: 'entrar',
				templateUrl: 'views/entrar.html',
				controller: 'EntrarCtrl',
				controllerAs: 'entrar'
			})
			.otherwise({
				redirectTo: '/'
			});

	}])
	.run(['$rootScope', '$window', function($rootScope, $window) {
		var navbar = jQuery('nav.navbar.navbar-default'), 
			body   = jQuery('body');

		angular.element($window).bind("scroll", function(e) {
			if ($window.innerWidth < 768) {
				return;
			}

            if ($window.scrollY >= 150) {
        		navbar.addClass('navbar-fixed-top');
        		body.addClass('offset-top-50');
            } else {
            	navbar.removeClass('navbar-fixed-top');
            	body.removeClass('offset-top-50');
            }
        });

		$rootScope.getNumber = function(num) {
			return new Array(Math.max(0, Math.ceil(num)));
		};

		$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {			
			var nav = jQuery('#navbar-collapse ul:first-child');
			if (!previous || !previous.name) {
				jQuery(nav).find('li').removeClass('active');				
			} else {
				jQuery(nav).find('li[name="' + previous.name + '"]').removeClass('active');
			}			

			jQuery('#navbar-collapse ul li[name="' + current.name + '"]').addClass('active');
		});

		// Esconde o navbar collapse ao clicar em um link
		jQuery('.navbar-header .navbar-brand, #navbar-collapse a').on('click', function() {
			jQuery('.navbar-toggle').click();
		});
	}]);