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
			spamSites(sites, length);

			i += 1;
			log('Requests sent: ' + i);
		}
	});
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
