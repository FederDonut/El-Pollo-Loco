class Chick extends MovableObject{

    height = 100;
    width = 120;
    y= 586;
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

    constructor(){
        super().loadImage(this.IMAGES_walking[0]);
        this.loadImages(this.IMAGES_walking);
        this.loadImages(this.IMAGES_dead);
        this.x = 400 +Math.random()*5000;
        this.energy = 10;
        this.speed = 0.15 + Math.random()*0.9;
        this.animate();
    }

    animate(){
        this.intervalId.push(setInterval(()=>{
            this.moveLeft();
        },1000/60))
    

        this.intervalId.push(setInterval(()=>{
                if(this.isHurt()){
                    if(!this.soundIsPlaying){
                        this.gotDamage();
                        this.soundIsPlaying = true;
                    }
                    this.playAnimation(this.IMAGES_dead);
                    this.dead();
                }else{
                    this.playAnimation(this.IMAGES_walking);
                    this.soundIsPlaying = false;
                }     
            },100));
    }

    gotDamage(){
        this.damageSound = new Audio(this.CHICK_sound[0]);
        this.damageSound.play();
    }

    stopIntervals(){
        this.intervalId.forEach(interval => {clearInterval(interval)});
        this.intervalId = [];
    }
}