/**
 * @extends MovableObject
 * @class
 * Represents the main player character in the game, handling all player-specific logic, 
 * movement, animations, and sound interactions.
 */
class Character extends MovableObject{

    height = 300
    y = 395
    speed = 8
    intervalId = [];
    invincible = false;
    isBouncing = false;
    
    
    IMAGES_walking =[
                    'img/2_character_pepe/2_walk/W-21.png',
                    'img/2_character_pepe/2_walk/W-22.png',
                    'img/2_character_pepe/2_walk/W-23.png',
                    'img/2_character_pepe/2_walk/W-24.png',
                    'img/2_character_pepe/2_walk/W-25.png',
                    'img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_jumping =[
                    'img/2_character_pepe/3_jump/J-31.png',
                    'img/2_character_pepe/3_jump/J-32.png',
                    'img/2_character_pepe/3_jump/J-33.png',
                    'img/2_character_pepe/3_jump/J-34.png',
                    'img/2_character_pepe/3_jump/J-35.png',
                    'img/2_character_pepe/3_jump/J-36.png',
                    'img/2_character_pepe/3_jump/J-37.png',
                    'img/2_character_pepe/3_jump/J-38.png',
                    'img/2_character_pepe/3_jump/J-39.png',
                  
    ];

    IMAGES_damage =[
                    'img/2_character_pepe/4_hurt/H-41.png',
                    'img/2_character_pepe/4_hurt/H-42.png',
                    'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_death = [
                    'img/2_character_pepe/5_dead/D-51.png',
                    'img/2_character_pepe/5_dead/D-52.png',
                    'img/2_character_pepe/5_dead/D-53.png',
                    'img/2_character_pepe/5_dead/D-54.png',
                    'img/2_character_pepe/5_dead/D-55.png',
                    'img/2_character_pepe/5_dead/D-56.png',
                    'img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_inactiv =[
                    'img/2_character_pepe/1_idle/idle/I-1.png',
                    'img/2_character_pepe/1_idle/idle/I-2.png',
                    'img/2_character_pepe/1_idle/idle/I-3.png',
                    'img/2_character_pepe/1_idle/idle/I-4.png',
                    'img/2_character_pepe/1_idle/idle/I-5.png',
                    'img/2_character_pepe/1_idle/idle/I-6.png',
                    'img/2_character_pepe/1_idle/idle/I-7.png',
                    'img/2_character_pepe/1_idle/idle/I-8.png',
                    'img/2_character_pepe/1_idle/idle/I-9.png',
                    'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_long_inactivity = [
                    'img/2_character_pepe/1_idle/long_idle/I-11.png',
                    'img/2_character_pepe/1_idle/long_idle/I-12.png',
                    'img/2_character_pepe/1_idle/long_idle/I-13.png',
                    'img/2_character_pepe/1_idle/long_idle/I-14.png',
                    'img/2_character_pepe/1_idle/long_idle/I-15.png',
                    'img/2_character_pepe/1_idle/long_idle/I-16.png',
                    'img/2_character_pepe/1_idle/long_idle/I-17.png',
                    'img/2_character_pepe/1_idle/long_idle/I-18.png',
                    'img/2_character_pepe/1_idle/long_idle/I-19.png',
                    'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    
    world;
   
    offset = {
        top: 100,
        bottom: 0,
        left: 50,
        right: 50
    };
    /**
    * Creates an instance of Character.
    * Loads all necessary images, applies gravity, and starts the animation loops.
    */
    constructor(){
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_walking);
        this.loadImages(this.IMAGES_jumping);
        this.loadImages(this.IMAGES_death);
        this.loadImages(this.IMAGES_damage);
        this.loadImages(this.IMAGES_inactiv);
        this.loadImages(this.IMAGES_long_inactivity);
        this.applyGravity();
        this.animate();
    }

    /**
    * Sets up the main game loops for movement (60 FPS) and animation/sound (10 FPS).
    */
    animate(){
        this.characterController();
        this.charcterStatusAnimation();
        this.intervalId.push(setInterval(() =>{
            if(!this.isDead()){
                this.movementSounds();
            }
        },100));  
    }

    /**
    * Manages the character's animation based on its current status (dead, hurt, jumping, idle, or walking).
    * This function runs a recurring animation check every 100 milliseconds.
    */
    charcterStatusAnimation(){
        this.intervalId.push(setInterval(() =>{
            if(this.isDead()){this.charcterDeath();}     
            else if(this.isHurt()){this.characterHurt();}
            else if(this.isAboveGround()){ this.playAnimation(this.IMAGES_jumping); }
            else if(this.world.chillMode){ this.playAnimation(this.IMAGES_inactiv); }
            else if(this.world.sleepMode){ this.playAnimation(this.IMAGES_long_inactivity); }
            else{    
                if(this.world.keyboard.right || this.world.keyboard.left){
                this.playAnimation(this.IMAGES_walking);
                }
            }    
        },100))
    }

    /**
    * Plays the damage animation and triggers the character hurt sound.
    * Resets the damage flag after playing the sound.
    */
    characterHurt(){
        this.playAnimation(this.IMAGES_damage);
        this.world.audio.characterTakeDamageSound();
        this.world.audio.charGotDamage = false;
    }

    /**
    * Plays the death animation, triggers the "wasted" sound, and sets the character's speed to zero.
    * Resets the death flag after playing the sound.
    */
    charcterDeath(){
        this.playAnimation(this.IMAGES_death);
        this.world.audio.wastedSound();
        this.speed = 0;
        this.world.audio.charIsDead = false;
    }

    /**
    * Manages character movement based on keyboard input.
    * Handles moving right/left, jumping, and updates the camera position.
    * This function runs a recurring check for input at a rate of 60 times per second (1000/60 ms).
    */
    characterController(){
        this.intervalId.push(setInterval(() =>{
            if(this.world.keyboard.right && this.x < this.world.level.level_end_x ){this.goRight();}
            if(this.world.keyboard.left && this.x > 0 ){this.goLeft();}
            if(this.world.keyboard.up && !this.isAboveGround()&& !this.isDead()){
                this.world.audio.characterJumpSound();
                this.world.audio.jumping = false;
                this.jump();
                this.world.resetTimers();
            }
            this.world.camera_x = -this.x + 100
        },1000/60));
    }
    /**
    * Initiates the 'Game Over' sequence after a short delay for the death animation to play out.
    */
    loseGame(){
        setTimeout(()=>{this.world.gameOver()},2500);
    }

    /**
    * Moves the character left, sets the direction flag, and resets inactivity timers.
    */
    goLeft(){
        this.moveLeft();
        this.otherDirection = true;
        this.world.resetTimers();
    }

    /**
    * Moves the character right, sets the direction flag, and resets inactivity timers.
    */
    goRight(){
        this.moveRight();
        this.otherDirection = false;
        this.world.resetTimers();
    }

    /**
    * Plays the running sound if the character is moving left/right and is on the ground.
    */
    movementSounds(){
        if(!this.isAboveGround() && this.world.keyboard.left || this.world.keyboard.right && !this.isAboveGround()){
            this.world.audio.characterRunSound();
            this.world.audio.characterMovement = false;
        }   
    };

    /**
    * Starts an interval to play the inactive animation when in chill mode (currently redundant due to main animation loop).
    */
    chill(){
        this.chillInterval = setInterval(() =>{
            if(this.world.chillMode){
                this.playAnimation(this.IMAGES_inactiv);
            }
        },2000)
    }

    /**
    * Wakes the character up: clears inactivity timers and flags, and restarts activity checking.
    */
    wakeUp(){
        clearTimeout(this.world.inactivityTimer);
        clearTimeout(this.sleepTimer);
        this.world.chillMode = false;
        this.world.sleepMode = false;
        this.world.checkPlayerActivity();
        
    };
    
     
    /**
    * Clears all character-specific intervals stored in intervalId.
    */
    stopIntervals(){
        this.intervalId.forEach(interval => {clearInterval(interval)});
        this.intervalId = [];
    }
}

