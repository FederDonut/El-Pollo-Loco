class Character extends MovableObject{

    height = 300
    y = 95 //395
    speed = 10
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
    
    world;
    
    constructor(){
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_walking);
        this.loadImages(this.IMAGES_jumping);
        this.loadImages(this.IMAGES_death);
        this.loadImages(this.IMAGES_damage);
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
            }

            this.world.camera_x = -this.x + 100

        },1000/60);

        setInterval(() =>{
            if(this.isAboveGround()){
                this.playAnimation(this.IMAGES_jumping);
            }else{
                 
                if(this.world.keyboard.right || this.world.keyboard.left){
                this.playAnimation(this.IMAGES_walking);
                }
            }           
        },180)

        setInterval(() =>{
            
            if(this.energy <= 0){
                this.playAnimation(this.IMAGES_death);
                this.dead();
            }
        },100)

    }

    
}