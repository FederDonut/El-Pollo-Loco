/**
 * @extends MovableObject
 * @class
 * Represents a standard chicken enemy. It moves across the ground, 
 * features walking and death animations, and poses a basic threat to the player.
 */
class Chicken extends MovableObject{

    height = 100;
    width = 100;
    y = 585;
    intervalId = [];
    soundIsPlaying = false;

    IMAGES_walking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ]

    IMAGES_dead = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    /**parameters for a more precisely collison detection */
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };
    /**
    * Creates an instance of Chicken.
    * Loads images, sets a random starting X position, assigns initial health (10), 
    * and sets a randomized movement speed.
    */
    constructor(){
        super().loadImage(this.IMAGES_walking[0]);
        this.loadImages(this.IMAGES_walking);
        this.loadImages(this.IMAGES_dead);
        this.x = 500 + Math.random()*8700;
        this.energy = 10;
        this.animate();
        this.speed = 0.15 + Math.random() * 0.5;
        
    }

    /**
    * Sets up the movement and animation loops for the chicken.
    */
    animate(){
        this.intervalId.push(setInterval(() =>{
            this.moveLeft();
           
            
        },1000 / 60))
            
       

        this.intervalId.push(setInterval(()=>{
            if(this.isHurt()){
                this.playAnimation(this.IMAGES_dead);
                this.dead();
                
            }else{
                this.playAnimation(this.IMAGES_walking);   
            }     
        },100));
    }
    
    /**
    * Clears all intervals associated with this chicken, stopping movement and animations.
    */
    stopIntervals(){
        this.intervalId.forEach(interval => {clearInterval(interval)});
        this.intervalId = [];
    }
    
}