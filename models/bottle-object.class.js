class Bottle extends DrawableObject{

    height = 80;
    width = 50;
    y = 605;

    IMAGE_bottle = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    constructor(){
        super().loadImage(this.IMAGE_bottle[0]);
        this.loadImages(this.IMAGE_bottle);
        this.x = 200 +Math.random()*3000;
    }
}