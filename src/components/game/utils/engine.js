class Engine {
    constructor() {
        this.ctx = null;
        this.stopId = null;
        this.display = null;
    }

    startEngine = (canvasRef, ctx, display) => {
        this.ctx = ctx;
        this.display = display;
        display.initialize(canvasRef, ctx);
        this.stopId = window.requestAnimationFrame(this.step);
        console.log('engine started');
    }

    step = (fps = 10) => {
        this.display.render();        
        setTimeout(() => {
            this.stopId = window.requestAnimationFrame(this.step);
        }, 1000 / fps);
    }

    stopEngine = () => {
        this.display.stopRendering();
        cancelAnimationFrame(this.stopId);
        console.log('Engine stopped');
    }    
}

export default Engine;