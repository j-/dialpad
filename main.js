(function () {

/* global phoneUtils */

var settings = {
	region: 'AU',
};

function isValid (input, region) {
	try {
		phoneUtils.isValidNumber(input, region);
		return true;
	}
	catch (_) {
		return false;
	}
}

/* Initialization */

var form = document.querySelector('.phone');
var input = document.querySelector('.phone-input');
var buttons = document.querySelectorAll('.dialpad-button');

form.addEventListener('submit', handleSubmit);

Array.prototype.forEach.call(buttons, function (button) {
	button.addEventListener('click', handleButtonClick);
});

/* Handlers */

function handleSubmit (e) {
	e.preventDefault();
	var value = input.value;
	var international = phoneUtils.formatInternational(value, settings.region);
	window.location = 'tel:' + international;
}

function handleButtonClick (e) {
	e.preventDefault();
	input.value += this.dataset.input;
}

})();
