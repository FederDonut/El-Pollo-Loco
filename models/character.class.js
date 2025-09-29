class Character extends MovableObject{

    height = 300
    y = 95 //395
    speed = 8
    lastPositionY;
    intervalId = [];
    
    
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

    animate(){

        this.intervalId.push(setInterval(() =>{
            if(this.world.keyboard.right && this.x < this.world.level.level_end_x ){
                this.goRight();
            }
            if(this.world.keyboard.left && this.x > 0){
                this.goLeft(); 
            }
            if(this.world.keyboard.up && !this.isAboveGround()){
                this.world.audio.characterJumpSound();
                //console.log('JUMPP') //<-- hier weitermachen 
                this.world.audio.jumping = false;
                this.jump();
                this.world.resetTimers();
            }
            this.world.camera_x = -this.x + 100
        },1000/60));

        this.intervalId.push(setInterval(() =>{
            
            if(this.isDead()){
                this.playAnimation(this.IMAGES_death);
                this.dead();
                this.world.audio.wastedSound();
                this.speed = 0;
                
                this.world.audio.charIsDead = false;
            }     
            else if(this.isHurt()){
                this.playAnimation(this.IMAGES_damage);
                this.world.audio.characterTakeDamageSound();
                this.world.audio.charGotDamage = false;
            }

            else if(this.isAboveGround()){
                this.playAnimation(this.IMAGES_jumping);
            }
            else if(this.world.chillMode){
                this.playAnimation(this.IMAGES_inactiv);
            }
            else if(this.world.sleepMode){
                this.playAnimation(this.IMAGES_long_inactivity);
            }
           
            else{    
                if(this.world.keyboard.right || this.world.keyboard.left){
                this.playAnimation(this.IMAGES_walking);
                }
            }    
        },100))

        this.intervalId.push(setInterval(() =>{
            this.movementSounds();
        },100));
        
    }

    loseGame(){
        setTimeout(()=>{this.world.gameOver()},7500);
    }

    goLeft(){
        this.moveLeft();
        this.otherDirection = true;
        this.world.resetTimers();
    }

    goRight(){
        this.moveRight();
        this.otherDirection = false;
        this.world.resetTimers();
    }

    movementSounds(){
        if(!this.isAboveGround() && this.world.keyboard.left || this.world.keyboard.right && !this.isAboveGround()){
            this.world.audio.characterRunSound();
            this.world.audio.characterMovement = false;
        }   
    };

    chill(){
        this.chillInterval = setInterval(() =>{
            if(this.world.chillMode){
                this.playAnimation(this.IMAGES_inactiv);
            }
        },2000)
    }

    wakeUp(){
        clearTimeout(this.world.inactivityTimer);
        clearTimeout(this.sleepTimer);
        this.world.chillMode = false;
        this.world.sleepMode = false;
        this.world.checkPlayerActivity();
        
    };
    
    stopIntervals(){
        this.intervalId.forEach(interval => {clearInterval(interval)});
        this.intervalId = [];
    }
}