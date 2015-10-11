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

	dial ({ number = this.value, international = true, region = this.region } = {}) {
		if (international) {
			number = phoneUtils.formatInternational(number, region);
		}
		window.location = `tel:${number}`;
	}

	isValidNumber ({ number = this.value, region = this.region } = {}) {
		try {
			phoneUtils.isValidNumber(number, region);
			return true;
		}
		catch (_) {
			return false;
		}
	}

	set value (value) {
		this[VALUE] = value;
		this.emit('setvalue', value);
	}

	get value () {
		return this[VALUE];
	}
}
