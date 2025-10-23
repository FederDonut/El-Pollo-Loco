/**
 * @extends MovableObject
 * @class
 * Represents a decorative cloud object that moves continuously across the screen
 * to simulate parallax or background motion.
 */
class Cloud extends MovableObject{

    height = 350;
    width = 600;
    intervalId = [];

    /**
     * Creates an instance of Cloud.
     * Loads the cloud image and assigns a random starting position and vertical offset.
     */
    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 10 +Math.random() * 10000 
        this.y = 20 +Math.random()* 80
        this.animate();
    }

    /**
     * Sets up the continuous movement loop for the cloud.
     */
    animate(){
        // Movement Loop (60 FPS): Moves the cloud slowly to the left.
       this.intervalId.push(setInterval(()=>{
            this.moveLeft();
        },1000 /60))
    }

    /**
     * Clears all intervals associated with this cloud, stopping its movement.
     */
    stopIntervals(){
        this.intervalId.forEach(interval => {clearInterval(interval)});
        this.intervalId = [];
    }
}