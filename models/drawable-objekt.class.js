/**
 * @class
 * The base class for all objects in the game that can be drawn on the canvas. 
 * It handles image loading, caching, drawing, and provides basic dimensions.
 */
class DrawableObject{
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 535;
    height =  150;
    width = 150;

    /**
     * Draws the object's current image onto the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        
    }

    /**
     * Loads a single image from a given path and assigns it to the `img` property.
     * @param {string} path - The file path of the image to load.
     */
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images from an array of paths and stores them in the `imageCache`.
     * @param {string[]} array - An array of image file paths.
     */
    loadImages(array){
        if(!Array.isArray(array))return; // Fallback
        array.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path]= img;
        });
    }
   
    /**
     * !!!!!! Debugging function === is not a operational Part of the Game !!!!!!!
     * Draws a rectangular frame (bounding box) around the object for debugging purposes.
     * The frame is only drawn for specific types of movable/interactive objects.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx){
        if(this instanceof Chicken || this instanceof Missile ||  this instanceof Endboss || this instanceof Bottle || this instanceof Chick){
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }else if(this instanceof Character){
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'red';
            ctx.rect((this.x + 20), (this.y +100), (this.width - 40), (this.height -100));
            ctx.stroke();
        }else if (this instanceof Coin){
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'red';
            ctx.rect((this.x+50), (this.y +50), (this.width-100), (this.height -100));
            ctx.stroke();
        } 
    }    
}