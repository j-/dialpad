import Controller from './controller';

/* global phoneUtils */

const VALUE = Symbol('value');

export default class DialpadController extends Controller {
	backspace () {
		const currentValue = this.value;
		const length = currentValue.length;
		const newValue = currentValue.substring(0, length - 1);
		this.value = newValue;
	}

	clear () {
		this.emit('clear');
		this.value = '';
	}

	constructor (...args) {
		super({
			value: '',
		}, ...args);
	}

	dial (number = this.value, international = true) {
		if (international) {
			number = this.formatInternational(number);
		}
		window.location = `tel:${number}`;
	}

	static formatInternational (value, region) {
		return phoneUtils.formatInternational(value, region);
	}

	formatInternational (value) {
		return DialpadController.formatInternational(value, this.region);
	}

	static isValidNumber (input, region) {
		try {
			phoneUtils.isValidNumber(input, region);
			return true;
		}
		catch (_) {
			return false;
		}
	}

	isValidNumber (input) {
		return DialpadController.isValidNumber(input, this.region);
	}

	set value (value) {
		this[VALUE] = value;
		this.emit('setvalue', value);
	}

	get value () {
		return this[VALUE];
	}
}
