/**
 * @extends MovableObject
 * @class
 * Represents a collectible coin object that rotates on the screen.
 * Coins contribute to the player's score or resource count.
 */
class Coin extends MovableObject{

    /** @type {number} The fixed height of the coin model. */
    height = 150;
    /** @type {number} The fixed width of the coin model. */
    width = 150;
    /** @type {boolean} Flag indicating if the coin has been collected by the player. */
    collectCoin = false;
    //playCoinSound = false;
    /** @type {number[]} Array to store IDs of all running intervals. */
    intervalId = [];
    /** @type {number} Default vertical position (Y-coordinate) if not randomized. */
    y = 350;

    /** @type {string[]} Image paths for the coin animation. */
    IMAGE_coin = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    /**
     * Creates an instance of Coin.
     * Loads images, assigns a random horizontal position, and sets a randomized vertical position.
     */
    constructor(){
        super().loadImage(this.IMAGE_coin[0]);
        this.loadImages(this.IMAGE_coin);
        // Sets a random horizontal position.
        this.x = 500 + Math.random()*7000;
        // Sets a random vertical position (slight variation in height).
        this.y = 250 - Math.random()*100;
        this.animate();
    }

    /**
     * Sets up the animation loop for the coin, making it rotate.
     */
    animate(){
        // Animation Loop (5 FPS): Cycles through the coin images.
        this.intervalId.push(setInterval(()=>{
            this.playAnimation(this.IMAGE_coin);
        },200))
    }

    /**
     * Clears all intervals associated with this coin, stopping its animation.
     */
    stopIntervals(){
        this.intervalId.forEach(interval => {clearInterval(interval)});
        this.intervalId = [];
    }
}