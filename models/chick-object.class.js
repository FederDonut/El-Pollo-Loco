/**
 * @extends MovableObject
 * @class
 * Represents a small chicken enemy. It moves horizontally, has basic walking and 
 * death animations, and is characterized by a low energy level.
 */
class Chick extends MovableObject{

    height = 80;
    width = 100;
    y= 600;
    intervalId = [];
    soundIsPlaying = false;

    IMAGES_walking = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_dead = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    CHICK_sound =[
        'audio/strongpunch.mp3'
    ];

    offset = {
        top: 30,
        bottom: 0,
        left: 0,
        right: 0
    };

    /**
    * Creates an instance of Chick.
    * Loads images, sets a random starting X position, and assigns initial properties.
    */
    constructor(){
        super().loadImage(this.IMAGES_walking[0]);
        this.loadImages(this.IMAGES_walking);
        this.loadImages(this.IMAGES_dead);
        this.x = 500 +Math.random()*9000;
        this.energy = 10;
        this.speed = 0.15 + Math.random()*0.9;
        this.animate();
    }

    /**
    * Sets up the movement and animation loops.
    */
    animate(){
        this.intervalId.push(setInterval(()=>{
            this.moveLeft();
        },1000/60))
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
    * Clears all intervals associated with this chick, stopping movement and animations.
    */
    stopIntervals(){
        this.intervalId.forEach(interval => {clearInterval(interval)});
        this.intervalId = [];
    }
}