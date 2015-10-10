import Emitter from 'utils/emitter';

const ELEMENT = Symbol('element');

export default class View extends Emitter {
	constructor (...args) {
		super();
		Object.assign(this, ...args);
	}

	createElement () {
		return document.createElement('div');
	}

	get element () {
		let element = this[ELEMENT];
		if (!element) {
			element = this[ELEMENT] = this.createElement();
		}
		return element;
	}

	set element (element) {
		this[ELEMENT] = element;
	}
}
