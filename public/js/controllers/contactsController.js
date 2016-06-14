


var myApp = angular.module('myApp',['ngMaterial','ngMessages','ngTagsInput']);




myApp.controller('WidthDemoCtrl',function ($mdDialog,$scope) {

  var vm = this;

  

  /*this.announceClick = function(index) {
    $mdDialog.show(
      $mdDialog.alert()
        .title('You clicked!')
        .textContent('You clicked the menu item at index ' + index)
        .ok('Nice')
    );
  };*/
})



myApp.controller('contactsController', function ($http) {


// geet all contacts from server
	


// angular material autocomplete





})

myApp.controller('MainCtrl', function($scope,$mdDialog, $http) {

	$scope.desti = 'All friends';
  console.log($scope.destina);

  $scope.aficher = function(index){

  	


  	if(index == '0'){
  		$scope.desti = 'All friends';
  		  $scope.loadCountries = function($query) {
		    return data = $http({url:'/profile', method:'GET',params: {searsh: $query}}).success(function(response) {
		    	});
		  };
  	}
  	if(index == '1'){
  		$scope.desti = 'Friends in the app';
  		$scope.loadCountries = function($query) {
		    return data = $http({url:'/friendsApp', method:'GET',params: {searsh: $query}}).success(function(response) {
		    	});
		  };

  	}
  	if(index == '2'){
  		$scope.desti = 'Friends online';
  	}

  }





			$scope.sendMessage = function(){

				console.log($scope.message);

				if($scope.message == "undefined"){
					$mdDialog.show(
			      $mdDialog.alert()
			        .title('You clicked!')
			        .textContent('You clicked the menu item at index ')
			        .ok('Nice')
			    );
							}

				var data = {
								to: [String],
								message:String
							}
				console.log($scope.tags);

				$http({
				    url: "/send",
				    method: "POST",
				    data: data
				}).success(function(response) {

				 console.log('yes');
				
				}).error(function(response) {
				    console.log(response);
				});
			
		}


				
  

});




myApp.controller('WidthDemoCtrl', DemoCtrl);

function DemoCtrl($mdDialog) {
  var vm = this;

  this.announceClick = function(index) {
    $mdDialog.show(
      $mdDialog.alert()
        .title('You clicked!')
        .textContent('You clicked the menu item at index ' + index)
        .ok('Nice')
    );
  };
}



/**
Copyright 2016 Google Inc. All Rights Reserved. 
Use of this source code is governed by an MIT-style license that can be in foundin the LICENSE file at http://material.angularjs.org/license.
**/

/*

myApp.controller('MainCtrl', function($scope, tags,$http) {

  $scope.tags = [
    { text: 'Tag1' },
    { text: 'Tag2' },
    { text: 'Tag3' }
  ];

    function call(callback){ $http({
				    url: "/profile",
				    method: "GET"
				}).then(function(response) {
				
				 contactss = response.data.google.contacts ;
				 contacts = contactss;
				 callback(contacts);
				 var tags = [
    { "text": 'Tag1' },
    { "text": 'Tag2' },
    { "text": 'Tag3' }
  ];
				callback(tags);			 
 // display contacts in the view  
				
				});
				}
			
	function callback(par){
		
	}
   
  $scope.loadTags = function(query) {
    return tags.load();
  };






});

myApp.service('tags', function($q,$http) {



  
  this.load = function() {

  

  	 function call(callback){ $http({
				    url: "/profile",
				    method: "GET",params: {searsh: $q}
				}).success(function(response) {
				console.log(response.data);
				 contactss = response.google.contacts ;
				 contacts = contactss;
				 
				var tags = createTags(contacts);

				console.log('aaaaa');
				callback(tags);	
				 
 // display contacts in the view  
				
				});

		}

function callback(req){
	deferred.resolve(req);
}

    var deferred = $q.defer();
    call(callback);
    return deferred.promise;
  };

function createTags(array){
 	var tags =[];
 	for(var i = 0 ; i< array.length ; i++){
 		var add = {
 			text:String
 		};
 		add.text = array[i];
 		tags.push(add);
 	}
 	return tags;
 }


});*/








/*$http({
				    url: "/profile",
				    method: "GET"
				}).success(function(response) {

				 contactss = response.google.contacts ;
				 contacts = contactss;
				 $scope.name = 'aaaaa';
				 console.log(contacts);

				
				 $scope.contacts = response.google.contacts; // display contacts in the view  
				
				}).error(function(response) {
				    console.log(response);
				});
			
		}*/