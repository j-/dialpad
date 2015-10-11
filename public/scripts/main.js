import 'font-awesome';

import DialpadController from 'controllers/dialpad';

import ClearButtonView from 'views/clear-button';
import InputView from 'views/input';
import PhoneNumberTypeView from 'views/phone-number-type';

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
var buttons = document.querySelectorAll('.dialpad-button');
var info = document.querySelector('.phone-section--info');

const clearButtonView = new ClearButtonView({
	element: document.querySelector('.action-button--backspace'),
});

const inputView = new InputView({
	element: document.querySelector('.phone-input'),
});

const typeView = new PhoneNumberTypeView({
	region: controller.region,
	value: controller.value,
});

controller.on('setvalue', (value) => typeView.value = value);
// Not yet designed, do not show
if (false) { info.appendChild(typeView.element) };

clearButtonView.on('backspace', () => controller.backspace());
clearButtonView.on('clear', () => controller.clear());

form.addEventListener('submit', handleSubmit);

Array.prototype.forEach.call(buttons, function (button) {
	button.addEventListener('click', handleButtonClick);
});

window.addEventListener('keydown', handleWindowKeydown);
window.addEventListener('keyup', handleWindowKeyup);

inputView.value = controller.value;
// Controller changes value, update input
controller.on('setvalue', (value) => inputView.value = value);
// Input changes value, update controller
inputView.on('change', () => controller.value = inputView.value);
inputView.on('keyup', () => controller.value = inputView.value);

/* Handlers */

function handleSubmit (e) {
	e.preventDefault();
	controller.dial();
}

function handleButtonClick (e) {
	e.preventDefault();
	controller.value += this.dataset.input;
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
