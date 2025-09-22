class Explosion extends MovableObject{

    x;
    y;
    width = 200;
    height = 200;
    removeExplosion = false;

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
        this.x = x; //+ 100; Hier noch anpassen
        this.y = y;
        this.animate();
        
        
    }
    

    animate(){ // Detonation 
        this.explosionInterval = setInterval(() => { 
            this.playAnimation(this.IMAGE_detonation);
        },300);
        
        setTimeout(() =>{
            this.endAnimation();
            this.removeExplosion=true;
        },1000)
        
    }

    endAnimation(){
        if(this.explosionInterval){
            clearInterval(this.explosionInterval);
            this.explosionInterval = null;
        }
    }

    sound(){

    }
}