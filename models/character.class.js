class Character extends MovableObject{

    height = 300
    y = 395
    speed = 10
    IMAGES_walking =[
                    'img/2_character_pepe/2_walk/W-21.png',
                    'img/2_character_pepe/2_walk/W-22.png',
                    'img/2_character_pepe/2_walk/W-23.png',
                    'img/2_character_pepe/2_walk/W-24.png',
                    'img/2_character_pepe/2_walk/W-25.png',
                    'img/2_character_pepe/2_walk/W-26.png',
    ];
    
    world;
    
    constructor(){
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_walking);
        this.animate();
        
    }

    animate(){

        setInterval(() =>{
            if(this.world.keyboard.right && this.x < this.world.level.level_end_x ){
                this.x += this.speed;
                this.otherDirection = false;
            }
            if(this.world.keyboard.left && this.x > 0){
                this.x -= this.speed;
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x + 100

        },1000/60);

        setInterval(() =>{
            if(this.world.keyboard.right || this.world.keyboard.left){
                this.playAnimation(this.IMAGES_walking);
            }
        },50)

    }

    jump(){

    }
}