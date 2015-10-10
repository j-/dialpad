import Emitter from 'utils/emitter';

export default class Controler extends Emitter {
	constructor (...args) {
		super();
		Object.assign(this, ...args);
	}
}
