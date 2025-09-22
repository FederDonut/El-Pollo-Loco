class Cloud extends MovableObject{

    
    height = 350;
    width = 600;
    intervalId = [];


    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png')

        this.x = 10 +Math.random() * 1800
        this.y = 20 +Math.random()* 80
        
        this.animate();
    }

    animate(){
       this.intervalId.push(setInterval(()=>{
            this.moveLeft();
        },1000 /60))
    }

    stopIntervals(){
        this.intervalId.forEach(interval => {clearInterval(interval)});
        this.intervalId = [];
    }
}