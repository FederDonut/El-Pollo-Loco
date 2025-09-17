const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss(),// Hier muss immer der Endboss plaziert sein. Aktuell sehr starre Strucktur
    ],
    //[
    //    new Endboss()
    //],
    [
        new Cloud(),
        new Cloud()
    ],
    [
        new BackgroundObject('img/5_background/layers/air.png',-1720,0),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png',-1720,0),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png',-1720,0),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png',-1720,0 ),
        
        new BackgroundObject('img/5_background/layers/air.png',0,0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png',0,0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png',0,0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png',0,0 ), // kann optimiert werden 
        
        new BackgroundObject('img/5_background/layers/air.png',1720,0),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png',1720,0),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png',1720,0),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png',1720,0 ),

        new BackgroundObject('img/5_background/layers/air.png',3440,0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png',3440,0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png',3440,0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png',3440,0 ),

        //1.png und 2.png muss geachtet werden 
        new BackgroundObject('img/5_background/layers/air.png',5160,0),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png',5160,0),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png',5160,0),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png',5160,0 ),

        new BackgroundObject('img/5_background/layers/air.png',6880,0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png',6880,0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png',6880,0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png',6880,0 ),

        new BackgroundObject('img/5_background/layers/air.png',8600,0),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png',8600,0),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png',8600,0),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png',8600,0 ),

        new BackgroundObject('img/5_background/layers/air.png',10320,0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png',10320,0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png',10320,0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png',10320,0 ),

    ],
        //Vorraussichtlich 12 Flaschen min. 10 werden zum besigen des Endbosses benötigt
    [
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        
    ],

    [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
    ]
);