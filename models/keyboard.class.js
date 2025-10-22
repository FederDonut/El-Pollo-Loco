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
    * Initializes all touch event listeners for the mobile control buttons
    * (Left, Right, Jump, and Attack).
    */
    mobileButtons(){
      this.mobileMovementLeft();  
      this.mobileMovementRight();
      this.mobileMovementJump();
      this.mobileMovementAttack();
    }

    /**
    * Sets up 'touchstart' and 'touchend' listeners for the mobile 'goLeft' button.
    * Sets the internal 'left' state to true on touch start, and back to false on touch end,
    * also resetting the inactivity timers.
    */
    mobileMovementLeft(){
        document.getElementById('goLeft').addEventListener('touchstart', (event) =>{
            event.preventDefault()
            this.left = true;
        });

        document.getElementById('goLeft').addEventListener('touchend', (event) =>{
            event.preventDefault();
            this.startTimers();
            this.left = false;
        });
    }

    /**
    * Sets up 'touchstart' and 'touchend' listeners for the mobile 'goRight' button.
    * Sets the internal 'right' state to true on touch start, and back to false on touch end,
    * also resetting the inactivity timers.
    */
    mobileMovementRight(){
       document.getElementById('goRight').addEventListener('touchstart', (event) =>{
            event.preventDefault()
            this.right = true;
        });
        document.getElementById('goRight').addEventListener('touchend', (event) =>{
            event.preventDefault();
            this.startTimers();
            this.right = false;
        }); 
    }

    /**
    * Sets up 'touchstart' and 'touchend' listeners for the mobile 'jump' button.
    * Sets the internal 'up' state to true on touch start, and back to false on touch end,
    * also resetting the inactivity timers.
    */
    mobileMovementJump(){
         document.getElementById('jump').addEventListener('touchstart', (event) =>{
            event.preventDefault()
            this.up = true;
        });
    
        document.getElementById('jump').addEventListener('touchend', (event) =>{
            event.preventDefault();
            this.startTimers();
            this.up = false;
        });
    }

    /**
    * Sets up 'touchstart' and 'touchend' listeners for the mobile 'attack' button.
    * Sets the internal 'attack' state to true on touch start, and back to false on touch end,
    * also resetting the inactivity timers.
    */
    mobileMovementAttack(){
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