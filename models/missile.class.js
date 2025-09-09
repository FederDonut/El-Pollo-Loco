class Missile extends MovableObject{

   energy = 5;
   lastHit = 0;
   //fleg = false;
  

    IMAGE_missile = [
                    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
                    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
                    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
                    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    MISSILE_sounds =[
                    'audio/attack_sound.mp3',
                    'audio/strongpunch.mp3'
    ]

    constructor(x,y){

        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGE_missile);
        this.loadImages(this.IMAGE_missile_detonation);
        this.height = 70;
        this.width = 50;
        this.x = x;
        this.y = y;
        this.throw();         
    }

   

    throw(){
            this.speedY = 30;
            this.applyGravity();
            this.throwInterval = setInterval(() =>{
                this.playAnimation(this.IMAGE_missile);
                this.x += 35;
            },85)
        
       
        
    }

    
    detonateAndDamage(enemy){
        //if(this.fleg) return;
        //this.fleg = true;
        if(this.throwInterval){
            clearInterval(this.throwInterval);
            this.throwInterval = null;
        }
        if(enemy && typeof enemy.hit === 'function'){
            enemy.isHurt();
        }        
    }        
}