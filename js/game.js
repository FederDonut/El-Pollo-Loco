let canvas;
let world;



function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas);
   

    console.log('my Character is', world.character);
}

document.addEventListener('keypress', (event) => {
    console.log(event);
});