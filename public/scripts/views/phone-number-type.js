import View from './view';
import libphonenumber from 'google-libphonenumber';

const pnf = libphonenumber.PhoneNumberFormat;
const phoneUtils = libphonenumber.PhoneNumberUtil.getInstance();

export default class PhoneNumberTypeView extends View {
	formatType (type = 'UNKNOWN') {
		return (
			PhoneNumberTypeView.TYPE_FORMAT_MAP[type] ||
			PhoneNumberTypeView.TYPE_FORMAT_MAP.UNKNOWN
		);
	}

	getNumberType (number, { region = this.region } = {}) {
		let type = null;
		try {
			number = phoneUtils.parse(number, region);
			type = phoneUtils.getNumberType(number);
		}
		catch (e) {
			// Swallow
		}
		return type;
	}

	set value (value) {
		const type = this.getNumberType(value);
		const formatted = this.formatType(type);
		if (formatted === PhoneNumberTypeView.TYPE_FORMAT_MAP.UNKNOWN) {
			this.element.textContent = '';
		}
		else {
			this.element.textContent = formatted;
		}
	}
}

PhoneNumberTypeView.TYPE_FORMAT_MAP = {
	FIXED_LINE: 'Fixed line',
	MOBILE: 'Mobile',
	FIXED_LINE_OR_MOBILE: 'Fixed line or mobile',
	TOLL_FREE: 'Toll-free',
	PREMIUM_RATE: 'Premium rate',
	SHARED_COST: 'Shared cost',
	VOIP: 'Voice over IP',
	PERSONAL_NUMBER: 'Personal number',
	PAGER: 'Pager',
	UAN: 'Universal access number',
	VOICEMAIL: 'Voicemail',
	UNKNOWN: 'Unknown',
};
