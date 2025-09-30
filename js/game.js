let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = false;

function init(){
    canvas = document.getElementById('canvas');
    if(world){
        world.stopGame();
        world = null;
    }
    const level = level1()  
    world = new World(canvas, keyboard, level);
    keyboard.mobileButtons();
}

function startGame(){ // check
    let overlayRef = document.getElementById('startScreen');
    overlayRef.classList.toggle('d-none');
    addBtnVisabillity();
    init();
}

function gameIsOver(){ // check
    let endScreen = document.getElementById('gameOver');
    endScreen.classList.remove('d-none');
    removeBtnVisabillity()
    
}

function tryAgain(){
    let endScreen = document.getElementById('gameOver');
    endScreen.classList.add('d-none');
    init();
    addBtnVisabillity();
   
   
}
function tryAgainAfterWin(){
    let endScreen = document.getElementById('YouWon');
    endScreen.classList.toggle('d-none');
    removeBtnVisabillity();
    init();
    addBtnVisabillity();
}

function YouWonTheGame(){
    let endScreen = document.getElementById('YouWon');
    endScreen.classList.remove('d-none');
    removeBtnVisabillity();
}

function muteSounds(){
    if(!isMuted){
        world.muteAllSounds();
        changeSoundImg();
        isMuted = true;
    }else if(isMuted){
        world.audibleAllSounds();
        changeSoundImg();
        isMuted = false;
    }
    
}

function removeBtnVisabillity(){
    let soundBtn = document.getElementById('sound-control');
    let displayBtn = document.getElementById('fullscreen');
    soundBtn.classList.add('d-none');
    displayBtn.classList.add('d-none');
}

function addBtnVisabillity(){
    let soundBtn = document.getElementById('sound-control');
    let displayBtn = document.getElementById('fullscreen');
    soundBtn.classList.remove('d-none');
    displayBtn.classList.remove('d-none');
}

function changeSoundImg(){
    let soundBtn = document.getElementById('sound-control');
    if(!isMuted){
        soundBtn.classList.remove('sound-control-audible');
        soundBtn.classList.add('sound-control');
    }else if(isMuted){
        soundBtn.classList.remove('sound-control');
        soundBtn.classList.add('sound-control-audible');
    }
}



function fullScreen(){
    let screenIcons = document.getElementById('Canvas-Container')
    let h1= document.querySelector('h1');
    let manual = document.getElementById('Game-Manual');
    let CanvasContainer = document.getElementById('CanvasDocker');
    let canvas = document.getElementById('canvas');
    h1.classList.toggle('d-none');
    manual.classList.toggle('d-none');
    canvas.classList.toggle('goingToFullScreen');
    CanvasContainer.classList.toggle('goingToFullScreen');
    screenIcons.classList.toggle('widthGrow');
}



window.addEventListener('keydown', (event) => {
    
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

//window.addEventListener('keydown', ()=>{
//    anyKeyPressed = true;
//});
//
//window.addEventListener('keyup', ()=>{
//    anyKeyPressed = false;
//});

