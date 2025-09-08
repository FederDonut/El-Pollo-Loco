class Missile extends MovableObject{

   energy = 5;
   lastHit = 0;
   fleg = false;
  

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

    world;

    constructor(x,y){

        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        //this.world = world;
        this.loadImages(this.IMAGE_missile);
        this.loadImages(this.IMAGE_missile_detonation);
        this.height = 70;
        this.width = 50;
        this.x = x;
        this.y = y;
        
        this.throw();
        //this.checkDetonation();
        
        
                
    }

   

    throw(){
            this.speedY = 30;
            this.applyGravity();
            this.throwInterval = setInterval(() =>{
                this.playAnimation(this.IMAGE_missile);
                this.x += 35;
            },85)
        
       
        
    }

    
    checkDetonation(){
        setInterval(() =>{
            if(this.isHurt() && !this.fleg){
                console.log('test');

            }
        },100)
    }
    //detonate = false;
    detonateAndDamage(enemy){
        if(this.fleg) return;
        this.fleg = true;
        //this.animate();
        this.removeMissile = true;
       
        if(this.throwInterval){
            clearInterval(this.throwInterval);
            this.throwInterval = null;
        }
        if(enemy && typeof enemy.hit === 'function'){
            enemy.isHurt();
        }
        
        //setTimeout(() => {
        //    this.removeMissile = true
        //},600);
           
       
    }

     animate(){
         
            setInterval(() => {
                this.playAnimation(this.IMAGE_missile_detonation);   
            },100);
            }
        
}