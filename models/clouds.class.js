class Cloud extends MovableObject{

    
    height = 350;
    width = 600;


    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png')

        this.x = 0 +Math.random() * 800
        this.y = 20 +Math.random()* 80
        this.speed = 0.15 + Math.random() * 2.5;
        this.animate();
    }

    animate(){
       this.moveLeft();
        
    }
}