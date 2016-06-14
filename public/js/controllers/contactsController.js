


var myApp = angular.module('myApp',['ngMaterial','ngMessages','ngTagsInput']);


myApp.controller('contactsController', function ($http) {


// geet all contacts from server
	


// angular material autocomplete





})

myApp.controller('MainCtrl', function($scope, $http) {
  $scope.tags = [];
  
  $scope.loadCountries = function($query) {
  	
  	 
  	
  	console.log('aaaa');
    return data = $http({url:'/profile', method:'GET',params: {searsh: $query}}).success(function(response) {
    	});

   
  };
});

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