var chars = "1234567890QWERTYUIOASDFGHJKLPZXCVBNM";
var websites = ["https://rbxpro.xyz/?confirmation="];
var site = 0;
var i = 0;

function timeout(ms, promise) {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			reject(new Error("timeout"));
		}, ms);

		promise.then(resolve, reject);
	});
}

function randomString() {
	var randomString = "";
	for (var c = 0; c < 360; c++) {
		randomString += chars[Math.floor(Math.random() * chars.length)];
	}

	return randomString;
}

var requester;
requester = function() {
	timeout(10000, fetch(websites[site] + randomString())).then(result => {
		console.log(i, result);
		setTimeout(function() {
			site++;
			if (site == websites.length) {
				site = 0;
			}			

			requester();
		}, 100);
		i++;
	}).catch(function(error) {
		console.log("Timeout error");
	});
}

requester();