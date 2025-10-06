/**
 * @extends DrawableObject
 * @class
 * Represents a collectible bottle object on the ground in the game.
 */
class Bottle extends DrawableObject{

    /** @type {number} The fixed height of the bottle. */
    height = 80;
    /** @type {number} The fixed width of the bottle. */
    width = 50;
    /** @type {number} The fixed vertical position (Y-coordinate) for bottles on the ground. */
    y = 605;
    /** @type {boolean} Flag indicating if the bottle has been collected by the player. */
    collectBottle = false;
    /** @type {boolean} Flag to ensure the reload sound only plays once upon collection/usage. */
    playReloadSound = false;

    /** @type {string[]} Array containing the path to the bottle image. */
    IMAGE_bottle = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'   
    ];

    /** @type {string[]} Array containing the path to the reload sound file. */
    Throw_sound = [
        'audio/reload.mp3'
    ];

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