class Missile extends MovableObject{

   

    IMAGE_missile = [
                    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
                    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
                    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
                    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGE_missile_detonation =[
                    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
                    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
                    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
                    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
                    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
                    'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    MISSILE_sounds =[
                    'audio/attack_sound.mp3',
                    'audio/strongpunch.mp3'
    ]

    constructor(x,y){
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGE_missile);
        this.height = 70;
        this.width = 50;
        this.x = x;
        this.y = y;
        this.throw();
        
        
                
    }

    throw(){
        this.speedY = 30;
       
        this.applyGravity();
        setInterval(() =>{
            this.playAnimation(this.IMAGE_missile);
            this.x += 15;
        },25)
        
    }

    explosion(){
        this.level.enemies
    }
}