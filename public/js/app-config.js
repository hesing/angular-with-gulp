angular.module('myApp')
    .config(function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: true
        });

        $stateProvider
            .state('home', {
                url: '/',
                title: 'Home',
                templateUrl: 'components/home/home.html',
                controller: 'HomeCtrl',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                name: 'appCss',
                                insertBefore: 'appStyles',
                                files: [
                                    'components/home/home.css'
                                ]
                            },
                            // {
                            //     name: 'vendors',
                            //     insertBefore: '#vendors',
                            //     files: [
                            //         'components/common/pagination/paginate.js',
                            //         'components/common/clipboard/angular-clipboard.js',

                            //     ]
                            // }, 
                            {
                                name: 'appFiles',
                                insertBefore: '#appScripts',
                                files: [
                                    'components/home/HomeCtrl.js'
                                ]
                            }
                            // {
                            //     name: 'breadcrumb',
                            //     insertBefore: '#vendors',
                            //     serie: true,
                            //     files: [
                            //         'components/common/screenfull/screenfull.js',
                            //         'components/common/breadcrumb/uiBreadcrumbs.js'
                            //     ]
                            // }
                        ]);
                    }
                }
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'components/contact/contact.html',
                controller: 'ContactCtrl',
                title: 'Contact',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: 'appCss',
                            insertBefore: 'appStyles',
                            files: [
                                'components/contact/contact.css'
                            ]
                        }, {
                            name: 'appFiles',
                            insertBefore: '#appScripts',
                            files: [
                                'components/contact/ContactCtrl.js'
                            ]
                        }]);
                    }
                }
            })
            .state('users', {
                url: '/users',
                templateUrl: 'components/users/users.html',
                controller: 'UsersCtrl',
                title: 'Users',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: 'appCss',
                            insertBefore: 'appStyles',
                            files: [
                                'components/users/users.css'
                            ]
                        }, {
                            name: 'appFiles',
                            insertBefore: '#appScripts',
                            files: [
                                'components/users/UsersCtrl.js',
                                'components/users/UserService.js'
                            ]
                        }]);
                    }
                }
            });


        $urlRouterProvider.otherwise('home');
    });
