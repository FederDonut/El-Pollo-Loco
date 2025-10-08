/**
 * @extends DrawableObject
 * @class
 * Represents an object in the game that can move, collide, and take damage.
 */
class MovableObject extends DrawableObject{
  
    speed = 0.15;
    attackSpeed = 50;
    otherDirection = false;
    speedY = 0;
    speedX = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;
    intervalId = [];

    

    /**
     * Checks if this object is currently colliding with another object (AABB collision).
     * @param {MovableObject} mo - The other movable object to check collision against.
     * @returns {boolean} True if a collision is detected.
     */
    isColliding(mo){
        return this.x + this.width > mo.x &&
            this.y +this.height > mo.y && // target collision 
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height
    }

    /**
     * Checks for collision, specifically if this object is falling onto the other object (mo).
     * @param {MovableObject} mo - The other movable object.
     * @param {number} lastPositionY - The previous Y position of this object (before movement).
     * @returns {boolean} True if a collision from above is detected.
     */
    isCollidingFromAbove(mo, lastPositionY){
        const collision = this.isColliding(mo);
        const isFalling = this.speedY < 0; // Assuming positive Y is down, 'speedY < 0' means falling towards the ground
        const comingFromAbove = lastPositionY < 401; // Simplified ground check
       return collision &&  comingFromAbove && isFalling;
    }


    /**
     * Applies gravity (vertical acceleration) to the object.
     * @fires {setInterval} Starts an interval to continuously update Y position and speedY.
     */
    applyGravity(){
        this.intervalId.push(setInterval(() =>{
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
               
            }
        },1000/25));
    }

   

    /**
     * Checks if the object is currently above the defined ground level.
     * @returns {boolean} True if the object is in the air.
     */
    isAboveGround(){
        if((this instanceof Missile) ){ // Missile should always fall
            return true;
        }else{
            return this.y < 395;
        }
        
    }

    /**
     * Plays the next frame of an animation loop.
     * @param {string[]} images - Array of image paths for the animation.
     */
    playAnimation(images){
        let i = this.currentImage % images.length;
        this.path = images[i];
        this.img = this.imageCache[this.path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right by its speed.
     */
    moveRight(){
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by its speed.
     */
    moveLeft(){
        this.x -= this.speed
    }

    /**
     * Moves the object to the left by its attack speed (used for boss movement/attack).
     */
    bossAttack(){
        this.x -= this.attackSpeed
    }

    /**
     * Sets the movement speed to zero.
     */
    stop(){
        this.speed = 0;
    }

    /**
     * Initiates a jump by setting a positive vertical speed.
     */
    jump(){
        this.speedY = 25;
    }

    /**
     * Reduces the object's energy and records the time of the hit.
     */
    damage(){
        this.energy -= 10;//5
        if(this.energy < 0){
            this.energy = 0;
        }else{
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object was hit within the last second.
     * @returns {boolean} True if the object is currently in a 'hurt' state.
     */
    isHurt(){
        let timePassed = new Date().getTime() - this.lastHit; // Difference in ms
        timePassed = timePassed / 1000;
        
        return timePassed < 1;
    }

    /**
     * Checks if the object's energy is zero.
     * @returns {boolean} True if the object is dead.
     */
    isDead(){
        return this.energy === 0;
    }

    
    /**
     * Applies a downward effect (high acceleration) when the object is dead.
     */
    dead(){
        if(this.energy <= 0){
            this.y -= this.speedY;
            this.speedY -= this.acceleration *20;
        }
        
    }
    
    /**
     * Clears all intervals stored in intervalId.
     */
    stopIntervals(){
        this.intervalId.forEach(interval => {clearInterval(interval)});
        this.intervalId = [];
    }   
}