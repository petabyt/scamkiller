var chars = "1234567890QWERTYUIOASDFGHJKLPZXCVBNM";

var websites = [
	{url: "https://rbxpro.xyz/?confirmation=", timeouts: 0},
	{url: "https://ixware.dev/l/CSJS/send-JSCS.php?t=", timeouts: 0},
	{url: "https://sitetest-roblox.com/send.php?t=", timeouts: 0}
];

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

function nextSite() {
	site++;
	if (site == websites.length) {
		site = 0;
	}	
}

var requester;
requester = function() {
	if (websites[site].timeouts > 5) {
		if (site == websites.length) {
          	console.log("All sites down");
			return;
		}	
		site++;
	}

	timeout(10000, fetch(websites[site].url + randomString())).then(result => {
		console.log(i, result);
		i++;
		
		setTimeout(function() {
			nextSite();
			requester();
		}, 100);
	}).catch(function(error) {
		websites[site].timeouts++;
		console.log("Timeout error for " + websites[site].url);

		setTimeout(function() {
			nextSite();
			requester();
		}, 100);
	});
};

requester();