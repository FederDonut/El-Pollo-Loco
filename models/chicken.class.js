class Chicken extends MovableObject{

    height = 100;
    width = 100;
    y = 585;

    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')

        this.x = 200 + Math.random()*500;
        
        
    }
}