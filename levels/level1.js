const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss()
    ],
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
    ],

    [
        //new Healthbar('img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png')
    ]
);