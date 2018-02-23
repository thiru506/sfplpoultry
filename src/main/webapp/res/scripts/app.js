'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
var app=angular
  .module('sbAdminApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar' 
    
  ])
  .run(
  [          '$rootScope', '$state', '$stateParams','$http','$window','$anchorScroll','$location','$timeout','$sce',
    function ($rootScope,   $state,   $stateParams,$http,$window,$anchorScroll,$location,$timeout,$sce) {
	  
	  

	  $http.post("user/currentUser").success(function(data,status){
		  $rootScope.userInfo=data;
		  console.log("rootScope.userInfo",data);
 	  }).error(function(data,status){
				
	  });
	  
	  $rootScope.usertype={};
	  $rootScope.usertype[0]="Admin";
	  $rootScope.usertype[1]="User";
	  $rootScope.usertype[2]="HOD";
	  $rootScope.usertype[3]="Manager";
	  
	  $rootScope.years={};
	  $rootScope.years[1]="2017-18";
	  $rootScope.years[2]="2018-19";
	  $rootScope.years[3]="2019-20";
  
	  $rootScope.quartersList={};
	  $rootScope.quartersList[0]="Yearly";
	  $rootScope.quartersList[1]="Jan-Mar";
	  $rootScope.quartersList[2]="Apr-Jun";
	  $rootScope.quartersList[3]="Jul-Sep";
	  $rootScope.quartersList[4]="Oct-Dec";
	  
	  $rootScope.status={};
	  $rootScope.status[0]="in review ";
	  $rootScope.status[1]="approved by HOD";
	  $rootScope.status[2]="Rejected by HOD";
	  $rootScope.status[3]="approved by manager";
	  $rootScope.status[4]="Rejected by manager";

	  
	  $rootScope.collapseVar = 0;
	  $rootScope.multiCollapseVar = 0;
      
	  $rootScope.check = function(x){
        
        if(x==$rootScope.collapseVar)
        		$rootScope.collapseVar = 0;
        else
        		$rootScope.collapseVar = x;
      };
      
      $rootScope.multiCheck = function(y){
        
        if(y==$rootScope.multiCollapseVar)
        		$rootScope.multiCollapseVar = 0;
        else
        		$rootScope.multiCollapseVar = y;
      };
	
	  $rootScope.notify={
			  error:false,
			  success:false,
			  msg:"",
			  handleError:function(error){
				  this.showError(error.message);
			  },
			  showError:function(message){
				  this.msg=message;
				  this.error=true;
				  $timeout(function(){
					  $rootScope.notify.error=false;$rootScope.notify.msg="";
				  },3000);
			  },
			  showSuccess:function(message){
				  this.msg=message;
				  this.success=true;
				  $timeout(function(){
					  $rootScope.notify.success=false;
					  $rootScope.notify.msg="";
				  },2000);
			  }
	  };
	  
	
	  $rootScope.getById=function(list,id){
		  var selected=null;
			angular.forEach(list, function(obj){
	        		if(obj.id==id){
	        			selected=obj;
	        		}
			});
			return selected;
	  }
	  
	  $rootScope.pagination={
			  pageSize:10,
			  limit:5,
			  list:[],
			  curPage:0,
			  pageCount:0,
			  setPageSize:function(size){
				 this.pageSize= size;
				 this.pageCount=Math.ceil(this.list.length / this.pageSize);
			  },
			  init:function(list){
				  this.list=list;
				  this.pageCount=Math.ceil(list.length / this.pageSize);
				  this.curPage=0;
				  return this;
			  },
			  getPages:function(){
					var pageDetails=[];
					if(this.pageCount>this.limit){
						if((this.curPage+this.limit)<this.pageCount){
							for(var i=1;i<=this.limit;i++){
								pageDetails.push(this.curPage+i);
							}
						}else{
							var diff=this.curPage+this.limit-this.pageCount;
							for(i=diff-1;i>=0;i--){
								pageDetails.push(this.curPage-i);
							}
							for(var i=1;i<=this.limit-diff;i++){
								pageDetails.push(this.curPage+i);
							}
							
						}
					}else{
						for(var i=1;i<=this.pageCount;i++){
							pageDetails.push(i);
						}
					}
					return pageDetails;
			}
	  };
	  
	  
	  $rootScope.$on('$stateChangeStart',function(event,toState,toParams,fromState,fromParams){
		  if($rootScope.userInfo==null){
			  event.preventDefault();
			  $http.post("user/currentUser").success(function(data,status){
				  $rootScope.userInfo=data;
				  $state.go(toState, toParams);
			  }).error(function(data,status){
					
			  }); 
		  }
	  });
	  
	  $rootScope.$on('$stateChangeSuccess',function(event,toState,toParams,fromState,fromParams){
		 
	  });
	  
	  $rootScope.$on("$stateChangeError", console.log.bind(console));
	  
	  
	  $rootScope.setUnsave=function(){
	    	$rootScope.unsave=true;
	  }
		$rootScope.resetUnsave=function(){
		 	$rootScope.unsave=false;
		}
		
		$rootScope.saveAsFile=function(byteArray,fileName){
	    	var a = window.document.createElement('a');
			a.href = window.URL.createObjectURL(new Blob([byteArray], { type: 'application/octet-stream' }));
			a.download = fileName;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
	    }
 
  }]);
  
  
  
   
   





