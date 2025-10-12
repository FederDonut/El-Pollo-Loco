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


   
    isColliding(mo) {
        const senderOffset = this.offset || {top :0, bottom:0, left:0, right:0};        
        const recipientOffset = mo.offset || {top :0, bottom:0, left:0, right:0};

        const thisLeft = this.x + senderOffset.left;
        const thisRight = this.x + this.width - senderOffset.right;
        const thisTop = this.y + senderOffset.top;
        const thisBottom = this.y + this.height - senderOffset.bottom;

        const moLeft = mo.x + recipientOffset.left;
        const moRight = mo.x + mo.width - recipientOffset.right;
        const moTop = mo.y + recipientOffset.top;
        const moBottom = mo.y + mo.height - recipientOffset.bottom;

        return thisRight > moLeft &&
               thisLeft < moRight &&
               thisBottom > moTop &&
               thisTop < moBottom;
    }

   
    isCollidingFromAbove(mo){
        let puffer = 65;
        const collision = this.isColliding(mo);
        const isFalling = this.speedY < 0; // Assuming positive Y is down, 'speedY < 0' means falling towards the ground
        const characterBottom = this.y + this.height -(this.offset?.bottom || 0)
        const enemyHead = mo.y + (mo.offset?.top || 0)
        const comingFromAbove = characterBottom < enemyHead +puffer;
        return collision &&  comingFromAbove && isFalling;
    }


    applyGravity(){
        this.intervalId.push(setInterval(() =>{
            if(this.isDead()&& this instanceof Character){
                this.y -= this.speedY;
                this.speedY -= this.acceleration *0.5;
                return;
            }
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
               
            }
            if (!this.isAboveGround() && this.y > 395) { 
            this.y = 395;
            this.speedY = 0;
        }
        },1000/25));
    }

   

    /**
     * Checks if the object is currently above the defined ground level.
     * @returns {boolean} True if the object is in the air.
     */
    isAboveGround(){
        if(this.isDead()){
            return true
        }
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
            this.speedY -= this.acceleration *40;
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