class Explosion extends MovableObject{

    x;
    y;
    width = 100;
    height = 100;

    IMAGE_detonation = [
                    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
                    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
                    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
                    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
                    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
                    'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor(x,y){
        super().loadImage(this.IMAGE_detonation[0]);
        this.loadImages(this.IMAGE_detonation);
        this.detonation(x,y);
        
    }
    

    detonation(x,y){
        this.x = x;
        this.y = y;
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGE_detonation);
        },200);
    }

    sound(){

    }
}