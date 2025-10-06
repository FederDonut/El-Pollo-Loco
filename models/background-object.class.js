/**
 * @extends MovableObject
 * @class
 * Represents a static background element in the game world. 
 * Inherits movement capabilities but is typically fixed or scrolls slowly.
 */
class BackgroundObject extends MovableObject{

    /** @type {number} The fixed width of the background object. */
    width = 1720
    /** @type {number} The fixed height of the background object. */
    height = 780

    /**
     * Creates an instance of BackgroundObject.
     * Loads the image and sets its position.
     * @param {string} imagePath - The file path to the background image.
     * @param {number} x - The starting X-coordinate (horizontal position).
     * @param {number} y - The starting Y-coordinate (vertical position).
     */
    constructor(imagePath, x,y){
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}