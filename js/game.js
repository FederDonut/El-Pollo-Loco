let canvas;
let world;
let keyboard = new Keyboard();
let isMuted;
let manager;


/**
 * Initializes the canvas and the game level. 
 * Stops any previously running game if necessary.
 */
function init(){
    canvas = document.getElementById('canvas');
    if(world){
        world.stopGame();
        world = null;
    }
    const level = level1()  
    world = new World(canvas, keyboard, level);
    manager = world.manager;
    keyboard.mobileButtons();
    checkMuteStatus();
}

/**
 * Starts the game: hides the start screen, shows control buttons, and initializes the game.
 */
function startGame(){ // check
    let overlayRef = document.getElementById('startScreen');
    overlayRef.classList.toggle('d-none');
    addBtnVisabillity();
    manageMobileHud();
    init();
    checkMuteStatus();
}

/**
 * Displays the 'Game Over' screen and hides game control buttons.
 */
function gameIsOver(){ // check
    let endScreen = document.getElementById('gameOver');
    endScreen.classList.remove('d-none');
    removeBtnVisabillity()
    manageMobileHud();    
}

/**
 * Resets the game after a loss: hides the 'Game Over' screen and re-initializes the game.
 */
function tryAgain(){
    let endScreen = document.getElementById('gameOver');
    endScreen.classList.add('d-none');
    init();
    addBtnVisabillity();
    manageMobileHud();
}

/**
 * Resets the game after a win: toggles the 'You Won' screen and re-initializes the game.
 */
function tryAgainAfterWin(){
    let endScreen = document.getElementById('YouWon');
    endScreen.classList.toggle('d-none');
    removeBtnVisabillity();
    init();
    addBtnVisabillity();
    manageMobileHud();
}

/**
 * Displays the 'You Won The Game' screen and hides game control buttons.
 */
function YouWonTheGame(){
    let endScreen = document.getElementById('YouWon');
    endScreen.classList.remove('d-none');
    removeBtnVisabillity();
    manageMobileHud();
}

/**
* Saves the current mute state ('isMuted') to local storage.
* @global
*/
function saveToLocalStorage(){
    if(!isMuted){
        localStorage.setItem('isMuted', 'true');
    }else{
        localStorage.setItem('isMuted','false');
    }
}

/**
* Checks for a saved 'isMuted' status in local storage on page load
* and applies the corresponding mute/unmute state to the game world.
* @global
*/
function checkMuteStatus(){
    const localStorageStatus = localStorage.getItem('isMuted');
    if(localStorageStatus === 'true'){
        manager.muteAllSounds();
        changeSoundImg(localStorageStatus);
        isMuted = true
    }else if(localStorageStatus === 'false'){
        manager.audibleAllSounds();
        changeSoundImg(localStorageStatus);
        isMuted = false
    }else{
        isMuted = false;
    }
}

/**
* Toggles the mute state, saves the new state to local storage,
* and updates the sound status in the game world.
* @global
*/
function muteSounds(){    
    saveToLocalStorage();
    checkMuteStatus();    
}

/**
 * Initiates the game start sequence after handling an Impressum (Legal Notice) related action.
 * Toggles the visibility of the 'startScreen' overlay (likely hiding it).
 * Calls the global 'init()' function to start the game.
 * Attempts to navigate back in the browser's history, which might be intended to hide a previously shown screen or modal.
 */
function ImpressumBtn(){
    let overlay = document.getElementById('startScreen');
    overlay.classList.toggle('d-none');
    init();
    history.back();
}

/**
 * Hides the sound control and fullscreen buttons.
 */
function removeBtnVisabillity(){
    let soundBtn = document.getElementById('sound-control');
    let displayBtn = document.getElementById('fullscreen');
    soundBtn.classList.add('d-none');
    displayBtn.classList.add('d-none');
}

/**
 * Shows the sound control and fullscreen buttons.
 */
function addBtnVisabillity(){
    let soundBtn = document.getElementById('sound-control');
    let displayBtn = document.getElementById('fullscreen');
    soundBtn.classList.remove('d-none');
    displayBtn.classList.remove('d-none');
}

/**
 * Changes the sound icon based on the current mute status.
 */
function changeSoundImg(localStorageStatus){
    let soundBtn = document.getElementById('sound-control');
    if(localStorageStatus === 'true'){
        soundBtn.classList.remove('sound-control-audible');
        soundBtn.classList.add('sound-control');
    }else if(localStorageStatus === 'false'){
        soundBtn.classList.remove('sound-control');
        soundBtn.classList.add('sound-control-audible');
    }
}


/**
 * Toggles fullscreen mode for the canvas and its containers.
 * Hides the header and manual link.
 */
function fullScreen(){
    let screenIcons = document.getElementById('Canvas-Container')
    let h1 = document.getElementById('mainHeadline');
    let manual = document.getElementById('Game-Manual');
    let CanvasContainer = document.getElementById('CanvasDocker');
    let canvas = document.getElementById('canvas');
    h1.classList.toggle('d-none');
    manual.classList.toggle('d-none');
    canvas.classList.toggle('goingToFullScreen');
    CanvasContainer.classList.toggle('goingToFullScreen');
    screenIcons.classList.toggle('widthGrow');
}

/**
 * Toggles the visibility of the mobile HUD (control elements).
 */
function manageMobileHud(){
    let hud = document.getElementById('hud');
    hud.classList.toggle('d-none');
}

/**
 * Returns to the main menu: hides game over/win screens and displays the start screen.
 */
function backToHomeMenu(){
    let gameOver = document.getElementById('gameOver');
    let youWon = document.getElementById('YouWon')
    let homeOverlay = document.getElementById('startScreen');
    youWon.classList.add('d-none');
    gameOver.classList.add('d-none');
    homeOverlay.classList.remove('d-none');
}

/**
 * Toggles the visibility of the impressum (legal notice) overlay.
 * First, it updates the content of the 'impressum-wrapper' with the result of the 'renderImpressum' function,
 * and then toggles the 'd-none' class on the 'impressum' element to show or hide it.
 */
function toggleImpressum(){
    let impressum = document.getElementById('impressum');
    let content = document.getElementById('impressum-wrapper');
    content.innerHTML = renderImpressum();
    impressum.classList.toggle('d-none');
}

/**
 * Toggles the game manual overlay and renders its mobile content.
 */
function toggleManual(){
    let manual = document.getElementById('manualOverlay');
    let content = document.getElementById('manual-Wrapper');
    manual.classList.toggle('d-none');
    content.innerHTML = renderMobileManualTemplate();
}

/**
 * Prevents event bubbling (propagation) for the given event.
 * @param {Event} event - The triggered event.
 */
function preventBubbling (event){
    event.stopPropagation();   
}

/**
 * Global event listener for keyboard key presses ('keydown').
 * When a specified key (ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Spacebar, or 'd') is pressed,
 * the corresponding boolean flag in the global 'keyboard' object is set to **true** to indicate active input.
 */
window.addEventListener('keydown', (event) => {
    if (event.key == "ArrowRight"){keyboard.right = true;};
    if (event.key == "ArrowLeft"){keyboard.left = true;};
    if (event.key == "ArrowUp"){keyboard.up = true;};
    if (event.key == "ArrowDown"){keyboard.down = true;};
    if(event.key == " "){keyboard.space == true;}
    if(event.key == "d"){keyboard.attack = true;}
});

/**
 * Global event listener for keyboard key releases ('keyup').
 * When a specified key (ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Spacebar, or 'd') is released,
 * the corresponding boolean flag in the global 'keyboard' object is set to **false** to stop the input action.
 */
window.addEventListener('keyup', (event) =>{
     if (event.key == "ArrowRight"){keyboard.right = false;};
    if (event.key == "ArrowLeft"){keyboard.left = false;};
    if (event.key == "ArrowUp"){keyboard.up = false;};
    if (event.key == "ArrowDown"){keyboard.down = false;};
    if(event.key == " "){keyboard.space == false;}
    if(event.key == "d"){keyboard.attack = false;}
});



