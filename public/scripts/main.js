import DialpadController from './controller';

import ClearButtonView from './views/clear-button';

const controller = new DialpadController({
	region: 'AU',
});

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

const clearButtonView = new ClearButtonView({
	element: document.querySelector('.action-button--backspace'),
});

clearButtonView.on('backspace', () => {
	input.value = input.value.substring(0, input.value.length - 1);
});

clearButtonView.on('clear', () => {
	input.value = '';
});

form.addEventListener('submit', handleSubmit);

Array.prototype.forEach.call(buttons, function (button) {
	button.addEventListener('click', handleButtonClick);
});

window.addEventListener('keydown', handleWindowKeydown);
window.addEventListener('keyup', handleWindowKeyup);

/* Handlers */

function handleSubmit (e) {
	e.preventDefault();
	var value = input.value;
	var international = controller.formatInternational(value);
	window.location = 'tel:' + international;
}

function handleButtonClick (e) {
	e.preventDefault();
	input.value += this.dataset.input;
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
