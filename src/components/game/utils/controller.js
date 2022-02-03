class Controller {
	constructor(callback) {
        console.log('controller constructed');
        this.callback = callback;
		window.addEventListener('keydown', this.onHandleInput, false);
	}

	onHandleInput = (event) => {
        if(typeof this.callback == 'function') {
            this.callback(event);
        } else {
            console.log('not a function');
        }
    };

	removeController = () => {
        console.log('controller destructed');
		window.removeEventListener('keydown', this.onHandleInput, false);
	};
}

export default Controller;