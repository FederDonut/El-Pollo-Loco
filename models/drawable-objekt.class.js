/**
 * @class
 * The base class for all objects in the game that can be drawn on the canvas. 
 * It handles image loading, caching, drawing, and provides basic dimensions.
 */
class DrawableObject{
    /** @type {HTMLImageElement} The currently displayed image object. */
    img;
    /** @type {Object.<string, HTMLImageElement>} Cache to store loaded images using their paths as keys. */
    imageCache = {};
    /** @type {number} Index of the current image in an animation array. */
    currentImage = 0;
    /** @type {number} The horizontal position (X-coordinate) of the object. */
    x = 120;
    /** @type {number} The vertical position (Y-coordinate) of the object. */
    y = 535;
    /** @type {number} The height of the object. */
    height =  150;
    /** @type {number} The width of the object. */
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
     * Draws a rectangular frame (bounding box) around the object for debugging purposes.
     * The frame is only drawn for specific types of movable/interactive objects.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx){

        if(this instanceof Character || this instanceof Chicken 
            || this instanceof Missile || this instanceof Endboss || this instanceof Bottle || this instanceof Coin || this instanceof Chick){
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }    
}