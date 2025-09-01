class MovableObject{
    x = 120;
    y = 535;
    img;
    height =  150;
    width = 150;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;


    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(array){
        array.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path]= img;
        });
    }
    playAnimation(images){
        let i = this.currentImage % images.length;
        this.path = images[i];
        this.img = this.imageCache[this.path];
        this.currentImage++;
    }
    moveRight(){
        console.log('moving right');
    }

    moveLeft(){
        console.log('moving left');
        setInterval(() => {
        this.x -= this.speed
        }, 1000/60);
    }
}