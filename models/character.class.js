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
            if(this.world.keyboard.right){
                this.x += this.speed;
                this.otherDirection = false;
            }
        },1000/60);

         setInterval(() =>{
            if(this.world.keyboard.left){
                this.x -= this.speed;
                this.otherDirection = true;
            }
        },1000/60);

        setInterval(() =>{
            if(this.world.keyboard.right || this.world.keyboard.left){

                

                //Walk animation
                // Modulu function --> % <-- bezieht sich auf einen Rest Betrag
                let i = this.currentImage % this.IMAGES_walking.length; // let i = 0 % 6; 0, Rest 0
                // 0,1,2,3,4,5,0
                this.path = this.IMAGES_walking[i];
                this.img = this.imageCache[this.path];
                this.currentImage++;
            }
        },50)

    }

    jump(){

    }
}