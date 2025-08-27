class MovableObject{
    x = 120;
    y = 535;
    img;
    height =  150;
    width = 150;
    imageCache = {};
    currentImage = 0;


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
    moveRight(){
        console.log('moving right');
    }

    moveLeft(){
        console.log('moving left');
    }
}