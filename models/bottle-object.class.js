class Bottle extends DrawableObject{

    height = 80;
    width = 50;
    y = 605;
    collectBottle = false;
    playReloadSound = false;

    IMAGE_bottle = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'   
    ];

    Throw_sound = [
        'audio/reload.mp3'
    ];

    constructor(){
        super().loadImage(this.IMAGE_bottle[0]);
        this.loadImages(this.IMAGE_bottle);
        this.soundTrack = new Audio(this.Throw_sound[0]);
        this.x = 200 +Math.random()*7000;
    }
    reloadSound(){
        if(!this.playReloadSound){
            this.soundTrack.play();
            this.playReloadSound = true;
        }
    }
}