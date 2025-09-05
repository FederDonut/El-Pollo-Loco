class DrawableObject{
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 535;
    height =  150;
    width = 150;


    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        
    }

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(array){
        if(!Array.isArray(array))return;
        array.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path]= img;
        });
    }

    drawFrame(ctx){

        if(this instanceof Character || this instanceof Chicken 
            || this instanceof Missile || this instanceof Endboss){
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}