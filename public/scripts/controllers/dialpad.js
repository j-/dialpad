import Controller from './controller';

/* global phoneUtils */

export default class DialpadController extends Controller {
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
