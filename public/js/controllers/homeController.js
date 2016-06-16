

myApp.controller('AppCtrl',function($scope,$http){

	$http({
				    url: "/home",
				    method: "GET"
				}).success(function(response) {

				 $scope.name = response.google.name;
				 $scope.friends = response.google.contacts.length;
				 $scope.friendsApp = response.user.friends.length;
				 $scope.messageSent = response.messageSend.length;
				  $scope.inbox = response.messageReceive.length;



				
				
				}).error(function(response) {
				    console.log(response);
				});
			

	
		

});