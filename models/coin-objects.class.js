class Coin extends DrawableObject{

    height = 150;
    width = 150;
    
    y = 350;

    IMAGE_coin = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

   

    constructor(){
        super().loadImage(this.IMAGE_coin[0]);
        this.loadImages(this.IMAGE_coin);
        this.x = 200 +Math.random()*3000;
        this.y = 350 +Math.random()*100;
    }
}