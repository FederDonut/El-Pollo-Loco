/**
 * @class
 * Manages the state of all input controls (keys and mobile buttons) for the game.
 */
class Keyboard {

    left = false;
    right = false;
    up = false;
    down = false;
    attack = false;
    space = false;

    /** @type {World|null} Reference to the game world instance for timer control. */
    world = null;

    /**
     * Starts the interactive and sleep timers in the associated game world.
     * Used after an input action is completed (touchend).
     */
    startTimers(){
        this.world.startInteractivTimer();
        this.world.startSleepTimer();
    }

   
    /**
     * Attaches touch event listeners to mobile control buttons (HUD).
     * The listeners set the corresponding control state to true on 'touchstart'
     * and false, along with starting the game timers, on 'touchend'.
     */
    mobileButtons(){
        //this.world.checkPlayerActivity();
        
    document.getElementById('goLeft').addEventListener('touchstart', (event) =>{
        event.preventDefault()
        this.left = true;
    });

    document.getElementById('goLeft').addEventListener('touchend', (event) =>{
        event.preventDefault();
        this.startTimers();
        this.left = false;
    });

    document.getElementById('goRight').addEventListener('touchstart', (event) =>{
        event.preventDefault()
       
        this.right = true;
    });

    document.getElementById('goRight').addEventListener('touchend', (event) =>{
        event.preventDefault();
        this.startTimers();
        this.right = false;
    });

    document.getElementById('jump').addEventListener('touchstart', (event) =>{
        event.preventDefault()
        this.up = true;
    });

    document.getElementById('jump').addEventListener('touchend', (event) =>{
        event.preventDefault();
        this.startTimers();
        this.up = false;
    });

    document.getElementById('attack').addEventListener('touchstart', (event) =>{
        event.preventDefault()
        this.attack = true;
    });

    document.getElementById('attack').addEventListener('touchend', (event) =>{
        event.preventDefault();
        this.startTimers();
        this.attack = false;
    });
}
}