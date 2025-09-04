class Chicken extends MovableObject{

    height = 100;
    width = 100;
    y = 585;

    IMAGES_walking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ]

    

    constructor(){
        super().loadImage(this.IMAGES_walking[0]);
        this.loadImages(this.IMAGES_walking);
        this.x = 500 + Math.random()*1000;
        this.animate();
        this.speed = 0.15 + Math.random() * 0.5;
        
    }

    animate(){
        setInterval(() =>{
            this.moveLeft();
            
        },1000 / 60)
            
       
        setInterval(() =>{
            this.playAnimation(this.IMAGES_walking);
            
        },100)
    }

}