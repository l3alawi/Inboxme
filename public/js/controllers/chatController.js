myApp.controller('chatController',['$scope','Socket', function($scope, Socket){
	Socket.connect();
	$scope.users = [];
	$scope.messages = [];
	Socket.emit('add-user');

	$scope.sendMessage = function(msg){
		if(msg != null && msg!=''){
			Socket.emit('message1',{username: 'l3alawi', message:msg})
			$scope.msg='';
		}

		Notification.requestPermission(function(permission){
				var notification = new Notification("Inbox Me",{body:'New Message from l3alawi',dir:'auto'});
			});

	}

	Socket.emit('request-user',{});

	Socket.on('users', function(data){
		
		$scope.users = data.users;
	})

	Socket.on('message', function(data){
		
		$scope.messages.push(data)
	})

	Socket.on('add-user', function(data){
		$scope.users.push(data.usernam);
		$scope.messages.push({username:data.username, message:'has entred'})
	})

}])