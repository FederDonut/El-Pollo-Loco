/**
 * @extends MovableObject
 * @class
 * Represents a thrown projectile (like a salsa bottle) that travels in an arc,
 * plays a rotation animation, and can damage enemies upon collision.
 */
class Missile extends MovableObject{

   energy = 5;
   lastHit = 0;
  

    IMAGE_missile = [
                    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
                    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
                    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
                    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    MISSILE_sounds =[
                    'audio/attack_sound.mp3',
                    'audio/strongpunch.mp3'
    ]

    /**parameters for a more precisely collison detection */
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };
    /**
    * Creates an instance of Missile.
    * Loads images, sets the size, and begins the throwing action.
    * @param {number} x - The starting X-coordinate (position of the thrower).
    * @param {number} y - The starting Y-coordinate (position of the thrower).
    */
    constructor(x,y){

        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGE_missile);
        this.loadImages(this.IMAGE_missile_detonation);
        this.height = 70;
        this.width = 50;
        this.x = x;
        this.y = y;
        this.throw(); 
                
    }

    /**
    * Initiates the throwing physics: applies vertical speed (for the jump arc) and gravity,
    * and starts the movement and rotation animation loop.
    */
    throw(){
            this.speedY = 30;
            this.applyGravity();
            this.throwInterval = setInterval(() =>{
                this.playAnimation(this.IMAGE_missile);
                this.x += 35;
            },85)    
    }

    /**
    * Stops the missile's movement/animation interval and potentially applies damage 
    * or a 'hurt' state to a target enemy.
    * @param {MovableObject} enemy - The enemy object hit by the missile (optional).
    */
    detonateAndDamage(enemy){
        if(this.throwInterval){
            clearInterval(this.throwInterval);
            this.throwInterval = null;
        }
        if(enemy && typeof enemy.hit === 'function'){
            enemy.isHurt();
        }        
    }        
}