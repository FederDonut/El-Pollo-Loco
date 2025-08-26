class BackgroundObject extends MovableObject{

    width = 1720
    height = 780

    constructor(imagePath, x,y){
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}