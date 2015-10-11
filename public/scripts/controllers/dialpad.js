import Controller from './controller';
import libphonenumber from 'google-libphonenumber';

const pnf = libphonenumber.PhoneNumberFormat;
const phoneUtils = libphonenumber.PhoneNumberUtil.getInstance();
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

	dial ({ number = this.value, international = false, region = this.region } = {}) {
		number = phoneUtils.parse(number, region);
		number = phoneUtils.format(number, international ? pnf.INTERNATIONAL : pnf.NATIONAL);
		window.location = `tel:${number}`;
	}

	isValidNumber ({ number = this.value, region = this.region } = {}) {
		number = phoneUtils.parse(number, region);
		return phoneUtils.isValidNumber(number);
	}

	set value (value) {
		this[VALUE] = value;
		this.emit('setvalue', value);
	}

	get value () {
		return this[VALUE];
	}
}
