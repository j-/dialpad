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

function getButton (ch) {
	ch = String(ch);
	var result;
	Array.prototype.forEach.call(buttons, function (button) {
		if (button.dataset.input === ch) {
			result = button;
			return false; // break
		}
	});
	return result || null;
}

/* Initialization */

var form = document.querySelector('.phone');
var input = document.querySelector('.phone-input');
var buttons = document.querySelectorAll('.dialpad-button');
var backspace = document.querySelector('.action-button--backspace');

form.addEventListener('submit', handleSubmit);
backspace.addEventListener('click', handleBackspace);

Array.prototype.forEach.call(buttons, function (button) {
	button.addEventListener('click', handleButtonClick);
});

window.addEventListener('keydown', handleWindowKeydown);
window.addEventListener('keyup', handleWindowKeyup);

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

function handleBackspace (e) {
	e.preventDefault();
	input.value = input.value.substring(0, input.value.length - 1);
}

function handleWindowKeydown (e) {
	// Allow special characters
	if (e.shiftKey) {
		return;
	}
	var key = e.keyCode;
	var ch = String.fromCharCode(key);
	var isDigit = ch >= '0' && ch <= '9';
	if (isDigit) {
		getButton(ch).classList.add('active');
	}
}

function handleWindowKeyup (e) {
	var key = e.keyCode;
	var ch = String.fromCharCode(key);
	var isDigit = ch >= '0' && ch <= '9';
	if (isDigit) {
		getButton(ch).classList.remove('active');
	}
}

})();
