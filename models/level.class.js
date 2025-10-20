/**
 * @class
 * Represents a single game level, acting as a container for all game objects 
 * that constitute the environment and challenges.
 */
class Level{

    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
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
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
       
    }
}