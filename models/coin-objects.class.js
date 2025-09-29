class Coin extends MovableObject{

    height = 150;
    width = 150;
    collectCoin = false;
    //playCoinSound = false;
    intervalId = [];
    y = 350;

    IMAGE_coin = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    constructor(){
        super().loadImage(this.IMAGE_coin[0]);
        this.loadImages(this.IMAGE_coin);
        this.x = 500 + Math.random()*7000;
        this.y = 250 - Math.random()*100;
        this.animate();
    }

    animate(){
        this.intervalId.push(setInterval(()=>{
            this.playAnimation(this.IMAGE_coin);
        },200))
    }

    stopIntervals(){
        this.intervalId.forEach(interval => {clearInterval(interval)});
        this.intervalId = [];
    }
}