class Chicken extends MovableObject{

    height = 100;
    width = 100;
    y = 585;

    IMAGE_walking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    

    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGE_walking);
        this.x = 200 + Math.random()*500;
        this.animate();
        
    }

    animate(){

        setInterval(() =>{
        let i = this.currentImage % this.IMAGE_walking.length;
        this.path = this.IMAGE_walking[i];
        this.img = this.imageCache[this.path];
        this.currentImage++;
        },100)
    }

}