import Controller from './controller';

export default class LongPressController extends Controller {
	constructor (...args) {
		super({
			longPressTime: 500, // Default hold time
		}, ...args);
		this.element.addEventListener('mousedown', (e) => this.handleMouseDown(e));
	}

	handleMouseDown (e) {
		e.preventDefault();
		// Timeout before mouseup
		const timer = setTimeout(() => {
			window.removeEventListener('mouseup', handler);
			this.emit('longpress');
		}, this.longPressTime);
		// Mouseup before timeout
		const handler = (e) => {
			window.removeEventListener('mouseup', handler);
			clearTimeout(timer);
			this.emit('shortpress');
		};
		window.addEventListener('mouseup', handler);
	}
}
