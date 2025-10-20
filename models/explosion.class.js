/**
 * @extends MovableObject
 * @class
 * Represents a short-lived explosion or splash effect, typically created when a projectile hits something.
 * It animates once and then flags itself for removal from the game world.
 */
class Explosion extends MovableObject{

    x;
    y;
    width = 200;
    height = 200;
    removeExplosion = false;    
    explosionInterval;

    /** @type {string[]} Image paths for the bottle splash/detonation animation. */
    IMAGE_detonation = [
                    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
                    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
                    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
                    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
                    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
                    'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
                   
    ];

    /**
     * Creates an instance of Explosion.
     * Loads images and sets the starting position.
     * @param {number} x - The X-coordinate for the explosion center.
     * @param {number} y - The Y-coordinate for the explosion center.
     */
    constructor(x,y){
        super().loadImage(this.IMAGE_detonation[0]);
        this.loadImages(this.IMAGE_detonation);
        this.x = x; //+ 100; adjustment needed depending on where the object is centered
        this.y = y;
        this.animate();
        
        
    }
    

    /** * Starts the detonation animation loop and sets a timeout to end the animation.
     */
    animate(){ 
        // Animation Loop (Runs every 300ms)
        this.explosionInterval = setInterval(() => { 
            this.playAnimation(this.IMAGE_detonation);
        },300);
        
        // Stops the animation and flags the object for removal after 1 second.
        setTimeout(() =>{
            this.endAnimation();
            this.removeExplosion=true;
        },1000)
        
    }

    /**
     * Clears the animation interval, stopping the loop.
     */
    endAnimation(){
        if(this.explosionInterval){
            clearInterval(this.explosionInterval);
            this.explosionInterval = null;
        }
    }

    /**
     * Placeholder function for sound effects (currently empty).
     */
    sound(){

    }
}