import View from './view';
import LongPressController from 'controllers/long-press';

export default class ClearButtonView extends View {
	constructor (...args) {
		super({
			clearButtonHoldTime: 500,
		}, ...args);
		// Long press controller handles click+hold events
		this.longPressController = new LongPressController({
			element: this.element,
			longPressTime: this.clearButtonHoldTime,
		});
		this.longPressController.on('longpress', () => this.emit('clear'));
		this.longPressController.on('shortpress', () => this.emit('backspace'));
	}
}
