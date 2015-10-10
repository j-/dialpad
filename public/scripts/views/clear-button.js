import View from './view';

export default class ClearButtonView extends View {
	constructor (...args) {
		super({
			clearButtonHoldTime: 500,
		}, ...args);
		this.element.addEventListener('click', (e) => this.handleClick(e));
		this.element.addEventListener('mousedown', (e) => this.handleMouseDown(e));
	}

	handleClick (e) {
		e.preventDefault();
		this.emit('backspace', e);
	}

	handleMouseDown (e) {
		e.preventDefault();
		// Timeout before mouseup
		const timer = setTimeout(() => {
			window.removeEventListener('mouseup', handler);
			this.emit('clear');
		}, this.clearButtonHoldTime);
		// Mouseup before timeout
		const handler = (e) => {
			window.removeEventListener('mouseup', handler);
			clearTimeout(timer);
		};
		window.addEventListener('mouseup', handler);

	}
}
