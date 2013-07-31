'use strict';




angular.module( 'doneApp',
               ['mainModule',
                'userModule',
                'todosModule',
                'helpModule',
                'md5',
                'ui.bootstrap',
                'ui-gravatar']);

angular.bootstrap(document, ["doneApp"]);
