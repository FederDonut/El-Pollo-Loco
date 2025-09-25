class Coin extends DrawableObject{

    height = 150;
    width = 150;
    collectCoin = false;
    playCoinSound = false;
    
    y = 350;

    IMAGE_coin = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    SOUND_Coin = [
        'audio/hee-hee_tTMj1yC.mp3'
    ];

    constructor(){
        super().loadImage(this.IMAGE_coin[0]);
        this.loadImages(this.IMAGE_coin);
        this.x = 200 +Math.random()*7000;
        this.y = 250 -Math.random()*100;
        this.soundTrack = new Audio(this.SOUND_Coin[0]);
    }

    coinSound(){
        if(!this.playCoinSound){
            this.soundTrack.play();
            this.playCoinSound = true;
        }
    }
}