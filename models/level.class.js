/**
 * @class
 * Represents a single game level, acting as a container for all game objects 
 * that constitute the environment and challenges.
 */
class Level{

    /** @type {MovableObject[]} Array of all enemy objects in the level. */
    enemies;
    //endboss;
    /** @type {Cloud[]} Array of all background cloud objects. */
    clouds;
    /** @type {BackgroundObject[]} Array of all non-interactive background objects. */
    backgroundObjects;
    /** @type {Bottle[]} Array of all collectible bottle objects. */
    bottles;
    /** @type {Coin[]} Array of all collectible coin objects. */
    coins;
    /** @type {number} The X-coordinate where the level officially ends (e.g., where the end boss is located). */
    level_end_x = 10000; 
   
    /**
     * Creates an instance of Level.
     * Initializes the level by assigning arrays of various game elements.
     * @param {MovableObject[]} enemies - The list of enemies for this level.
     * @param {Cloud[]} clouds - The list of clouds for this level.
     * @param {BackgroundObject[]} backgroundObjects - The list of background layers for this level.
     * @param {Bottle[]} bottles - The list of collectible bottles for this level.
     * @param {Coin[]} coins - The list of collectible coins for this level.
     */
    constructor(enemies,clouds,backgroundObjects,bottles,coins){
        this.enemies = enemies;
        //this.endboss = endboss
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
       
    }
}