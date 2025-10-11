/**
 * @extends DrawableObject
 * @class
 * Represents a collectible bottle object on the ground in the game.
 */
class Bottle extends DrawableObject{

    
    height = 80;
    width = 50;
    y = 605;
    collectBottle = false;
    playReloadSound = false;

    /** @type {string[]} Array containing the path to the bottle image. */
    IMAGE_bottle = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'   
    ];

    /** @type {string[]} Array containing the path to the reload sound file. */
    Throw_sound = [
        'audio/reload.mp3'
    ];
    
    /**parameters for a more precisely collison detection */
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
        };

    /**
     * Creates an instance of Bottle.
     * Initializes the image, loads animations (if any), sets the sound, and assigns a random X position.
     */
    constructor(){
        super().loadImage(this.IMAGE_bottle[0]);
        this.loadImages(this.IMAGE_bottle);
        this.soundTrack = new Audio(this.Throw_sound[0]);
        // Sets a random horizontal position between 200 and 7200.
        this.x = 200 +Math.random()*7000; 
    }

    /**
     * Plays the reload sound once if it hasn't been played yet.
     */
    reloadSound(){
        if(!this.playReloadSound){
            this.soundTrack.play();
            this.playReloadSound = true;
        }
    }
}