/**
 * @extends DrawableObject
 * @class
 * Represents a graphical status bar used to display health percentage or collected item counts.
 */
class Statusbar extends DrawableObject{

    height = 100
    width = 300
    
    IMAGES_health_bar = [
                    'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
                    'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
                    'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
                    'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
                    'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
                    'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
    ];

    IMAGES_endboss_bar = [
                    'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
                    'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
                    'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
                    'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
                    'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
                    'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
    ]
 
    IMAGE_bottle_bar =[
                    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
                    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
                    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
                    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
                    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
                    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
    ];

    IMAGE_coin_bar = [
                    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
                    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
                    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
                    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
                    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
                    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ];
    percentatge = 100;
    collection = 0;

    /**
    * Creates an instance of Statusbar.
    * Loads the specific set of images and initializes the bar's position and value.
    * @param {string[]|null} images - The array of image paths specific to this status bar (Health, Coin, Bottle, Boss).
    * @param {number} [x=50] - The starting X-coordinate.
    * @param {number} [y=20] - The starting Y-coordinate.
    */
    constructor(images = null, x, y){
        super();
        this.images = images || this.IMAGES_health_bar
        this.loadImages(this.images);
        this.x = x || 50;
        this.y = y || 20;
        this.height = 80;
        this.width = 400;
        if(this.images !== this.IMAGES_health_bar && 
            this.images !== this.IMAGES_endboss_bar){
            this.setCollection(0);
        }else{
            this.setPercentage(100);
        }
    }

    /**
    * Updates the status bar's image based on a percentage value (used for Health/Energy bars).
    * @param {number} percentatge - The new percentage value (0-100).
    */
    setPercentage(percentatge){
        this.percentatge = percentatge;
        let path = this.images[this.resolveImageIndex()];
        this.img = this.imageCache[path];
        
    }

    /**
    * Updates the status bar's image based on a collection count (used for Coin/Bottle bars).
    * @param {number} collection - The new count of collected items (0-10).
    */
    setCollection(collection){
        this.collection =collection;
        let path = this.images[this.itemCollection()];
        this.img = this.imageCache[path];
    }

    /**
    * Determines the correct index for the collection bar image based on the item count.
    * Assumes a scale where 10 items = 100% (index 5).
    * @returns {number} The index (0-5) corresponding to the collection count.
    */
    itemCollection(){
        if(this.collection === 10){return 5;}
        else if(this.collection >= 8){return 4;}
        else if(this.collection >= 6){return 3;}
        else if(this.collection >= 4){return 2;}
        else if(this.collection >= 1){return 1;}
        else{return 0;}
    }

    /**
    * Determines the correct index for the percentage bar image based on the percentage value.
    * Maps percentage ranges to indices 0-5.
    * @returns {number} The index (0-5) corresponding to the current percentage.
    */
    resolveImageIndex(){
        if(this.percentatge === 100){return 0;}
        else if(this.percentatge > 80){return 1;}
        else if(this.percentatge > 50){return 2;}
        else if(this.percentatge > 30){return 3;}
        else if(this.percentatge > 9){return 4;}
        else{return 5;}
    }
}