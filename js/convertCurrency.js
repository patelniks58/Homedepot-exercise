/*
define all page control variable
*/
var controls = {
	txtFromRate: "txtFromRate",
	txtToRate: "txtToRate",
	crFromRate: "crFromRate",
	crToRate: "crToRate",
	disclaimerInfo: "disclaimerInfo"
}

var rates = ["CAD", "USD", "EUR"];

/*
Call fixer RestAPI and received latest rates and calculate exchange rate according to the entered
currencyValue.
*/
function convertCurrency(currencyValue, base, rate) {
	return new Promise(function (resolve, reject) {
		var conversionValue = parseFloat(currencyValue);
		if (currencyValue != NaN && currencyValue >= 0) {
			if (isInArray(rates, base) > -1 && isInArray(rates, rate) > -1) {
				if (base !== rate) {
					httpRequest("https://api.fixer.io/latest?base=" + base + "&symbols=" + rate, "GET").then(function (responseText) {
						var responseJson = JSON.parse(responseText);
						resolve(conversionValue * responseJson.rates[rate]);
					}).catch(function (err) {
						reject(err);
					});
				} else
					resolve(conversionValue);
			} else {
				reject("Invalid conversion types.");
			}
		} else
			reject("Invalid conversion values.");
	});
}

/*  Converting currency rates Event */
function convertCurrencyEvent() {
	if (txtFromRate.value.length !== 0) {
		convertCurrency(txtFromRate.value, crFromRate.value, crToRate.value).then(function (convertedCurrency) {
			txtToRate.value = convertedCurrency;
		}).catch(function (err) {
			alert(err);
		});
	}
}

window.onload = function () {
	try {

		var crFromRate = document.getElementById(controls.crFromRate);
		var crToRate = document.getElementById(controls.crToRate);
		var txtFromRate = document.getElementById(controls.txtFromRate);
		var txtToRate = document.getElementById(controls.txtToRate);
		var disclaimerInfo = document.getElementById(controls.disclaimerInfo);
		var txtFromRateValue = "";

		crFromRate.onchange = function () {
			convertCurrencyEvent();
		};

		crToRate.onchange = function () {
			convertCurrencyEvent();
		};

		txtFromRate.onchange = function () {
			if (txtFromRate.value.length === 0) {
				txtFromRate.value = 0;
				txtToRate.value = 0;
			} else if (txtFromRateValue !== txtFromRate.value)
				convertCurrencyEvent();
			txtFromRateValue = txtFromRate.value;
		};

		txtFromRate.onkeyup = function () {
			convertCurrencyEvent();
			txtFromRateValue = txtFromRate.value;
		};

		/* Validating user input */
		txtFromRate.onkeypress = function (event) {
			if (event.charCode == 46 && txtFromRate.value.indexOf(".") > -1)
				return false;
			return (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46
		};

		disclaimerInfo.onclick = function () {
			alert("The data on this site is gathered from open sources. These values and dates are believed to be reliable but we do not guarantee their accuracy, completeness or correctness. Rounding or software errors may occur on this site. The Foreign Exchange rates shown and used in the exchange calculations may be derived from the from the following open sources:http://api.fixer.io/latestFixer.io is a free JSON API for current and historical foreign exchange rates published by the European Central Bank. The rates are updated daily around 4PM CET.");
			return false;
		};
	} catch (err) {
		console.log(err);
		alert("Something went wrong. Please Help your self.")
	}
};