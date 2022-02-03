import React from 'react';
import styles from './game.module.css';
import {Engine, Display} from 'components/game';
import Images from 'config/Images';

const GameIndex = props => {
    const canvasRef = React.useRef(null);
    const [state, setState] = React.useState({
        gameScore: 0,
        paused: false
    });
    
    React.useEffect(()=>{
        const engine = new Engine();
        const display = new Display();        
        if(canvasRef?.current) {
            const context = canvasRef.current.getContext('2d');
            engine.startEngine(canvasRef, context, display);
        }

        return () => {
            engine.stopEngine();
        }
    }, [canvasRef.current]);


    return (
        <canvas 
            ref={canvasRef}
            className={styles.canvasContainer}
        >
        </canvas>
    );
}

export default GameIndex;