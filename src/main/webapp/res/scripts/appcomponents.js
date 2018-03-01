var app=angular.module('sbAdminApp');

app.directive("bnModals",function( $rootScope, modals ) {
	return( link );
            // I bind the JavaScript events to the scope.
	function link( scope, element, attributes ) {
		scope.subview = null;
        element.on("click",function handleClickEvent( event ) {
        	if ( element[ 0 ] !== event.target ) {
        		return;
            }
            scope.$apply( modals.reject );
        });
                // Listen for "open" events emitted by the modals service object.
        $rootScope.$on("modals.open",function handleModalOpenEvent( event, modalType ) {
        	scope.subview = modalType;
        });
                // Listen for "close" events emitted by the modals service object.
        $rootScope.$on("modals.close",function handleModalCloseEvent( event ) {
        	scope.subview = null;
        });
	}
});
app.directive('preventRightClick', function() {  
    return {  
        restrict: 'A',  
        link: function(scope, element, attr) {  
            element.bind('contextmenu', function(e) {  
                e.preventDefault();  
            })  
        }  
    }  
})  

app.service("modals",function( $rootScope, $q ) {
	// I represent the currently active modal window instance.
	var modal = {
			deferred: null,
			params: null
	};
    return({
    	open: open,
        params: params,
        proceedTo: proceedTo,
        reject: reject,
        resolve: resolve
    });

    function open( type, params, pipeResponse ) {
    	var previousDeferred = modal.deferred;
    	// Setup the new modal instance properties.
    	modal.deferred = $q.defer();
    	modal.params = params;

    	if ( previousDeferred && pipeResponse ) {
    		modal.deferred.promise.then( previousDeferred.resolve, previousDeferred.reject );
    	} else if ( previousDeferred ) {
    		previousDeferred.reject();
    	}
    	$rootScope.$emit( "modals.open", type );
    	return( modal.deferred.promise );
    }
    // I return the params associated with the current params.
    function params() {
    	return( modal.params || {} );
    }

    function proceedTo( type, params ) {
    	return( open( type, params, true ) );
    }
            // I reject the current modal with the given reason.
    function reject( reason ) {
    	if ( ! modal.deferred ) {
                    return;
        }
    	modal.deferred.reject( reason );
    	modal.deferred = modal.params = null;
        // Tell the modal directive to close the active modal window.
    	$rootScope.$emit( "modals.close" );
    }
            // I resolve the current modal with the given response.
    function resolve( response ) {
    	if ( ! modal.deferred ) {
    		return;
    	}
    	modal.deferred.resolve( response );
    	modal.deferred = modal.params = null;
                // Tell the modal directive to close the active modal window.
    	$rootScope.$emit( "modals.close" );
    }
});

app.filter('pagination', function()
		{
	 return function(input, start)
	 {
	  start = +start;
	  return input.slice(start);
	 };
	}	
);

app.directive('multiSelect', function() {


	  function link(scope, element,attributes) {
	    var options = {
	      enableClickableOptGroups: true,
	      onChange: function() {
	        element.change();
	      }
	    };
	    element.multiselect(options);
	    scope.$watch(attributes.ngModel, function () {
            element.multiselect('refresh');
        });
	  }

	  return {
	    restrict: 'A',
	    link: link
	  };
	});

	app.config(['$provide', function($provide) {
	  $provide.decorator('selectDirective', ['$delegate', function($delegate) {
	    var directive = $delegate[0];

	    directive.compile = function() {

	      function post(scope, element, attrs, ctrls) {
	        directive.link.post.apply(this, arguments);

	        var ngModelController = ctrls[1];
	        if (ngModelController && attrs.multiSelect !== null) {
	          originalRender = ngModelController.$render;
	          ngModelController.$render = function() {
	            originalRender();
	            element.multiselect('refresh');
	          };
	        }
	      }

	      return {
	        pre: directive.link.pre,
	        post: post
	      };
	    };

	    return $delegate;
	  }]);
	}]);
	app.directive('datepicker', function() {
	    return {
	        restrict: 'A',
	        require : 'ngModel',
	        link : function (scope, element, attrs, ngModelCtrl) {
	            $(function(){
	                element.datepicker({
	                    dateFormat:'dd/mm/yy',
	                    onSelect:function (date) {
	                        ngModelCtrl.$setViewValue(date);
	                        scope.$apply();
	                    }
	                });
	            });
	        }
	    }
	});