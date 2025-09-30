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

    


    isColliding(mo){
        return this.x + this.width > mo.x &&
            this.y +this.height > mo.y && // ziel collision 
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height
    }

    isCollidingFromAbove(mo, lastPositionY){
        const collision = this.isColliding(mo);
        const isFalling = this.speedY < 0;
        const yPosition = lastPositionY+this.height
        //const comingFromAbove = lastPositionY + this.height < mo.y
        const comingFromAbove = lastPositionY < 401;
        //console.log(lastPositionY , this.height);
        //console.log( lastPositionY+this.height);
      if(comingFromAbove&& isFalling && collision){
        console.log(true)
      }
        
       return collision &&  comingFromAbove && isFalling;
        
    }


    applyGravity(){
        this.intervalId.push(setInterval(() =>{
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
               
            }
        },1000/25));
    }

   

    isAboveGround(){
        if((this instanceof Missile) ){ // Missile should always fall
            return true;
        }else{
            return this.y < 395;
        }
        
    }

    playAnimation(images){
        let i = this.currentImage % images.length;
        this.path = images[i];
        this.img = this.imageCache[this.path];
        this.currentImage++;
    }

    moveRight(){
        this.x += this.speed;
    }

    moveLeft(){
        this.x -= this.speed
    }

    bossAttack(){
        this.x -= this.attackSpeed
    }
    stop(){
        this.speed = 0;
    }

    //mo = movable-object
    


    jump(){
        this.speedY = 25;
    }

    damage(){
        this.energy -= 10;//5
        if(this.energy < 0){
            this.energy = 0;
        }else{
            this.lastHit = new Date().getTime();
        }
    }

    isHurt(){
        let timePassed = new Date().getTime() - this.lastHit; //Difference in ms
        timePassed = timePassed / 1000;
        
        return timePassed < 1;
    }

    isDead(){
        return this.energy === 0;
    }

    
    dead(){
        if(this.energy <= 0){
            this.y -= this.speedY;
            this.speedY -= this.acceleration *20;
        }
        
    }
    
    stopIntervals(){
        this.intervalId.forEach(interval => {clearInterval(interval)});
        this.intervalId = [];
    }
    
}