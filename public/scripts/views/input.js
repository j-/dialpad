import View from './view';

export default class InputView extends View {
	constructor (...args) {
		super(...args);
		this.element.addEventListener('change', (e) => this.emit('change', e));
		this.element.addEventListener('keypress', (e) => this.emit('keypress', e));
		this.element.addEventListener('keydown', (e) => this.emit('keydown', e));
		this.element.addEventListener('keyup', (e) => this.emit('keyup', e));
		this.element.addEventListener('paste', (e) => this.emit('paste', e));
	}

	set value (value) {
		this.element.value = value;
	}

	get value () {
		return this.element.value;
	}
}
