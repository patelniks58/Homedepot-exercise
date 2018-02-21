/* 
Check value exist in an array or no and return according to them
*/
function isInArray(array, item) {
	try {
		for (var i = 0; i < array.length; i++) {
			if (array[i] === item)
				return i;
		}
	} catch (err) {
		console.log(err);
		return -1;
	}
	return -1;
}

/*
Function to make an url http request and recive result 
*/
function httpRequest(url, method) {
	return new Promise(function (resolve, reject) {
		var httpRequest = new XMLHttpRequest()
		httpRequest.onreadystatechange = function () {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200 && httpRequest.responseText)
					resolve(httpRequest.responseText)
				else
					reject("Please trty again later. We are not able to get latest conversion rates.");
			}
		};
		httpRequest.open(method, url, true);
		httpRequest.send();
	});
}