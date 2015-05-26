var Tweeter = angular.module("myApp", ['ngRoute'])

Tweeter.controller("NavCtrl", ['$scope', function($scope) {
		$scope.nav = "I am a nav, choose the following:";
}]);		

Tweeter.controller("UserCtrl", ['$scope', '$routeParams', 'User', function($scope, $routeParams, User) {
		
		User.find($routeParams.username, function(user) {
			if (user) {
				$scope.username = user.username;
				$scope.name = user.name;
				$scope.age = user.age;
			} else {
				$scope.username = "No such user exists."
			}
		
		});
		
		User.all(function(users){
			$scope.users = users;
		});
}]);

Tweeter.controller("TweetCtrl", ['$scope', '$routeParams', 'Tweet', function($scope, $routeParams, Tweet) {
		

		Tweet.all(function(tweets){
			$scope.tweets = tweets;
		});

		$scope.newTweet = function() {
			var tweet = {
				tweeter: $scope.tweeter,
				content: $scope.content
			};


			$scope.tweeter = "";
			$scope.content = "";

			Tweet.addTweet(tweet, function(tweets) {
				$scope.tweets = tweets;
			});
		};

	}]);



Tweeter.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
	$routeProvider
		.when("/user/:username", {
			templateUrl: '/views/user.html',
			controller: 'UserCtrl'
		})
		.when("/tweet/:tweetId",{
			templateUrl: '/views/tweet.html',
			controller: "TweetCtrl"
		});

	$locationProvider.html5Mode(true);
}])

Tweeter.factory("User", ['Tweet', function(Tweet) {
	var users = [
		{username: "Mike", name: "Michael", age: 24, id: 1},
		{username: "Del", name: "Delmer", age: 25, id: 2}
];


this.tweets = function(username, cb) {
	Tweet.find(username, cb);
};
		

	//cb = callback
	this.all = function(cb) {
		return cb(users);
	};

	this.find = function(username, cb) {
		for (var i = 0; i < users.length; i++) {
			var user = users[i];
			if (user.username === username) {
				return cb(user);
		}
	}
	return cb(false);
};

	return this; 
}]);


Tweeter.factory("Tweet", [function() {
	var tweets = [
		{tweeter: "Mike", content: "Hello, this is my first tweet"},
		{tweeter: "Del", content: "this is my second tweet."}
];

	//cb = callback
	this.all = function(cb) {
		return cb(tweets);
	};

	this.find = function(username, cb) {

		var usersTweets = [];

		for (var i = 0; i < users.length; i++) {
			var tweet = tweets[i];
			if (tweet.tweeter === username) {
				usersTweets.push(tweet);
		}
	}
	return cb(usersTweets);
};
	this.addTweet = function(tweet, cb) {
		tweets.push(tweet);
	};

	return this; 
}]);



