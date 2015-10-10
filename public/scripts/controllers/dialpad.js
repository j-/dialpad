import Emitter from 'utils/emitter';

/* global phoneUtils */

export default class DialpadController extends Emitter {
	constructor (...args) {
		super();
		Object.assign(this, ...args);
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
}
