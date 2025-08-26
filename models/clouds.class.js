class Cloud extends MovableObject{

    
    height = 350;
    width = 600;


    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png')

        this.x = 0 +Math.random() * 500
        this.y = 20 +Math.random()* 80
        this.movement();
    }

    movement(){
        setInterval(() => {
            this.x -=0.5
        }, 1000/60);
        
    }
}