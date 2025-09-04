class Missile extends MovableObject{

   

    IMAGE_missile = [
                    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
                    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
                    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
                    'img/6_salsa_bottle/bottle_rotation/4bottle_rotation.png',
    ];

    constructor(x,y){
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
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
            this.x += 10;
        },25)
        
    }

    explosion(){

    }
}