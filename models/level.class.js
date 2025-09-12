class Level{

    enemies;
    //endboss;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    level_end_x = 6000; //1720
    


   

    constructor(enemies,clouds,backgroundObjects,bottles,coins){
        this.enemies = enemies;
        //this.endboss = endboss
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
       
    }
}