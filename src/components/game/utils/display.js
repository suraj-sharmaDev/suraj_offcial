import {Hero} from 'components/game';

class Display {
    constructor() {
        console.log('display constructed');
        this.ctx = null;
        this.hero = new Hero();
    }

    initialize = (canvasRef, ctx) => {
        this.ctx = ctx;
        this.canvasRef = canvasRef;
    }

    render = () => {
        const canvasHeight = this.canvasRef.current.clientHeight;
        const canvasWidth = this.canvasRef.current.clientWidth;
        this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        const heroData = this.hero.getCharacterPosition();
        const {img, x, y} = heroData;
        this.ctx.drawImage(img, x, 120 - y, 30, 20);
    }

    stopRendering = () => {
        this.hero.unMount();
    }
}

export default Display;