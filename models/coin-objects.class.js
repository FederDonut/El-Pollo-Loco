class Coin extends DrawableObject{

    height = 80;
    width = 80;
    
    y = 600;

    IMAGE_coin = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

   

    constructor(){
        super().loadImage(this.IMAGE_coin[0]);
        this.loadImages(this.IMAGE_coin);
    }
}