import Images from 'config/Images';
import Controller from 'components/game/utils/controller';

const Action = {
    walk: ['hero_run_1', 'hero_run_2', 'hero_run_3', 'hero_run_4'],
    jump: ['hero_jump'],
    dead: ['hero_dead_1', 'hero_dead_2']
};

class Hero {
    constructor(x = 0, y = 0) {
        console.log('hero constructed');
        this.controller = new Controller(this.handleUserInput);
        this.x = x;
        this.y = y;

        // store the type of action
        this.prevAction = 'idle';
        this.currentAction = 'idle';
        
        // store the index of cycles : can be of any animation cycle
        this.animationImageIndex = -1;
        
        // store current displaying image
        this.currentCharacterImage = null;

        // store animation cycles
        this.walkImages = [];
        this.deadImages = [];
        this.jumpImages = [];

        // create an array of all walk cycles
        Action.walk.map((w, idx) => {
            let base_image = new Image(200, 200);
            base_image.src = Images[w];
            this.walkImages.push(base_image);
        });

        // create an array of all jump cycles
        Action.jump.map((j, idx) => {
            let base_image = new Image();
            base_image.src = Images[j];
            this.jumpImages.push(base_image);
        });

        // create an array of all dead cycles
        Action.dead.map((d, idx)=> {
            let base_image = new Image();
            base_image.src = Images[d];
            this.deadImages.push(base_image);
        });

    }

    handleUserInput = (event) => {
        const key = event.key;

        console.log(key);

        if(key === undefined) return;

        if(key === 'ArrowUp') {
            this.currentAction = 'jump';
            this.animateCharacter();
        } else if(key === 'ArrowRight') {
            this.currentAction = 'walk_right';
            this.animateCharacter();
        } else if(key === 'ArrowLeft') {
            this.currentAction = 'walk_left';
            this.animateCharacter();
        } else if(key === 'Control') {
            this.currentAction = 'attack';
            this.animateCharacter();
        }
    }

    animateCharacter = () => {
        // here we write real logic for the character

        if (this.currentAction !== this.prevAction) {
            // if previous action and current action is different then
            // restart animation frame
            this.prevAction = this.currentAction;
            this.animationImageIndex = -1;
        }

        switch(this.currentAction) {
            case 'walk_right':
                this.walkAnimation('right');
                break;
            case 'walk_left':
                this.walkAnimation('left');                
                break;
            case 'jump':
                this.jumpAnimation();                
                break;
            case 'attack':
                this.attackAnimation();
                break;                                
            default:
                break;
        }
    }

    walkAnimation = (direction) => {
        let incrVal = this.animationImageIndex;
        // if the character is jumping then also we should be able to move
        // left or right

        if(this.currentAction === 'jump' && this.y > 0) {
            if(direction === 'right') this.x += 5;
            else this.x -= 5;
            return;
        }

        if (this.currentAction === this.prevAction) {
            incrVal += 1;
            this.animationImageIndex = incrVal < this.walkImages.length ? incrVal : 0;
        }

        if(direction === 'right') this.x += 5;
        else this.x -= 5;
        
        this.currentCharacterImage = this.walkImages[this.animationImageIndex];
    }

    jumpAnimation = () => {
        if (this.prevAction === 'jump' && this.y > 0) return;
        let incrVal = this.animationImageIndex;
        if (this.currentAction === this.prevAction) {
            incrVal += 1;
            this.animationImageIndex = incrVal < this.jumpImages.length ? incrVal : 0;
        }
        this.y += 20;
        this.currentCharacterImage = this.jumpImages[this.animationImageIndex];
    }

    attackAnimation = () => {

    }

    deadAnimation = () => {

    }

    physicsGravity = () => {
        this.y -= 0.75;
        if (this.y === 0 || this.y < 3 ) {
            this.currentCharacterImage = this.walkImages[0];
        }
    }

    selfRunAnimation = () => {
        let incrVal = this.animationImageIndex;
        incrVal += 1;
        this.animationImageIndex = incrVal < this.walkImages.length ? incrVal : 0;
        this.currentCharacterImage = this.walkImages[this.animationImageIndex];
    }

    getCharacterPosition = () => {
        if (this.y > 0) {
            this.physicsGravity();
        };

        this.selfRunAnimation();
        
        return {
            img: this.currentCharacterImage ? this.currentCharacterImage : this.walkImages[0],
            x: this.x,
            y: this.y
        }
    }

    unMount = () => {
        this.controller.removeController();
    }
}

export default Hero;