class Character extends MovableObject{

    height = 300
    y = 95 //395
    speed = 8

    walking_sound = new Audio('');
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

    Character_audio =[
                    'audio/run.mp3',
                    'audio/jump.mp3',
                    'audio/attack_sound.mp3',
                    'audio/character_is_dead.mp3',
                    'audio/character_damage.mp3'
    ];
    
    world;
   
    
    constructor(){
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_walking);
        this.loadImages(this.IMAGES_jumping);
        this.loadImages(this.IMAGES_death);
        this.loadImages(this.IMAGES_damage);
        this.characterSounds();
        this.applyGravity();
        this.animate();
       
       
        
    }

    animate(){

        setInterval(() =>{
            if(this.world.keyboard.right && this.x < this.world.level.level_end_x ){
                
                this.moveRight();
                this.otherDirection = false;
            }
             if(this.world.keyboard.left && this.x > 0){
                this.moveLeft();
                this.otherDirection = true;
            }
            if(this.world.keyboard.up && !this.isAboveGround()){
               this.jump();
               let jumpSound = new Audio(this.Character_audio[1]);
               jumpSound.play();
            }

            this.world.camera_x = -this.x + 100

        },1000/60);

        setInterval(() =>{
            if(this.isDead()){
                this.playAnimation(this.IMAGES_death);
                this.dead();
                this.wastedSound();
            }     
            else if(this.isHurt()){
                this.playAnimation(this.IMAGES_damage);
               //this.damageSound.play();
               this.gotDamage();
            }

            else if(this.isAboveGround()){
                this.playAnimation(this.IMAGES_jumping);
            }else{    
                if(this.world.keyboard.right || this.world.keyboard.left){
                this.playAnimation(this.IMAGES_walking);
                }
            }    
        },100)
        setInterval(() =>{
            this.movementSounds();
        },250);
    }

    characterSounds(){
        this.runSound = new Audio(this.Character_audio[0]);
        this.jumpSound = new Audio(this.Character_audio[1]);
        this.deathSound = new Audio(this.Character_audio[3]);
        this.damageSound = new Audio(this.Character_audio[4]);
    }

    movementSounds(){
            if(this.world.keyboard.up && !this.isAboveGround()){   
               if(this.jumpSound.paused){
                this.jumpSound.currentTime = 0;
                this.jumpSound.play(); 
               }
            }
            else if(!this.isAboveGround() && this.world.keyboard.left || this.world.keyboard.right && !this.isAboveGround()){
                if(this.runSound.paused){
                    this.runSound.play()
                }else{
                    this.runSound.pause();
                    this.runSound.currentTime=0;
                }   
            }   
    };

    wastedSound(){
        this.deathSound.play()
        setTimeout(() =>{
            this.deathSound.pause()
            this.deathSound.currentTime = 0;
        },7000)
    }

    gotDamage(){
        this.damageSound.play()
        setTimeout(()=> {
            this.damageSound.pause();
            this.damageSound.currentTime = 0;
        },500);
    }
    

    
}