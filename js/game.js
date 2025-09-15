let canvas;
let world;
let keyboard = new Keyboard();

//let anyKeyPressed = false;
let inactivityTimer;
let sleepTimer;
//const TIMEOUT = 5000;
//let timeStamp1 = false;
//let chillMode = false;
//let sleepMode = false;


function init(){
  
   
    //console.log('my Character is', world.character);
}

function startGame(){
    let overlayRef = document.getElementById('startScreen');
    console.log('start');
    overlayRef.classList.toggle('d-none');
    canvas = document.getElementById('canvas');
    //startInteractivTimer();
    //startSleepTimer();
    world = new World(canvas, keyboard, inactivityTimer,sleepTimer);
   
    
}

//function startInteractivTimer(){
//    inactivityTimer = setTimeout(()=>{
//        if(!anyKeyPressed){
//            console.log('Keine taste gedrückt');
//            timeStamp1 = true;
//            chillMode = true;
//            sleepMode = true; 
//        }
//    },TIMEOUT);
//    
//}
//
//function startSleepTimer(){
//    sleepTimer = setTimeout(()=>{
//        if(!anyKeyPressed && timeStamp1){
//            console.log('character schläft');
//            timeStamp1=false;
//            chillMode = false;
//            sleepMode = true;
//        }
//    },10000)
//}

window.addEventListener('keydown', (event) => {
    
    //console.log(event.code);
    //console.log(event.key);

    if (event.key == "ArrowRight"){
        keyboard.right = true;
    };

    if (event.key == "ArrowLeft"){
        keyboard.left = true;
    };

    if (event.key == "ArrowUp"){
        keyboard.up = true;
    };

    if (event.key == "ArrowDown"){
        keyboard.down = true;
    };

    if(event.key == " "){
        keyboard.space == true;
    }

    if(event.key == "d"){
        keyboard.attack = true;
       
    }
});

window.addEventListener('keyup', (event) =>{
     if (event.key == "ArrowRight"){
        keyboard.right = false;
    };

    if (event.key == "ArrowLeft"){
        keyboard.left = false;
    };

    if (event.key == "ArrowUp"){
        keyboard.up = false;
    };

    if (event.key == "ArrowDown"){
        keyboard.down = false;
    };
    
    if(event.key == " "){
        keyboard.space == false;
    }

    if(event.key == "d"){
        keyboard.attack = false;
    }

});

window.addEventListener('keydown', ()=>{
    anyKeyPressed = true;
    //clearTimeout(inactivityTimer);
    //clearTimeout(sleepTimer);
    //startInteractivTimer();
    //startSleepTimer();
    //chillMode = false;
    //sleepMode = false;  
});

window.addEventListener('keyup', ()=>{
    anyKeyPressed = false;
    //clearTimeout(inactivityTimer);
    //clearTimeout(sleepTimer);
    //startInteractivTimer();
    //startSleepTimer()
    //chillMode = false;
    //sleepMode = false;
});

