class MovableObject extends DrawableObject{
  
   
  
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    speedX = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0; 

    


    isColliding(mo){
        return this.x + this.width > mo.x &&
            this.y +this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }

    applyGravity(){
        setInterval(() =>{
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        },1000/25);
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

    jump(){
        this.speedY = 25;
    }

    damage(){
        this.energy -= 5;
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
            this.speedY -= this.acceleration;
        }
        
    }
    
   
}