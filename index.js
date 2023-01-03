//GAME FUNCTIONS AND VARIABLES :
let inputDir = {x: 0, y: 0};
// const foodSound = new Audio('foodSound.mp3');
// const gameoverSound = new Audio('gameover.mp3');
// const moveSound = new Audio('moveSound.mp3');
// const musicSound = new Audio('musicSound.mp3');
// let speed = prompt("What is the speed you want to maintain - In scale of 5 to 20");
let speed = 10;
let lastPaintTime = 0;
let SnakeArr = [ {x: 11, y: 15} ]; 
let food = {x: 16, y: 13};
let board = document.querySelector(".board");
let score = 0;


// GAME FUNCTION :
function main(current_time) {
    window.requestAnimationFrame(main);
    // console.log(current_time)
    if ((current_time - lastPaintTime)/1000 < 1/speed) {
        return;
    }
    lastPaintTime = current_time;
    gameEngine();
}

function isCollide (snake)
{
    // If you bump into yourself :
    for (let i = 1; i < SnakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    // If you bump into the wall :
    if (snake[0].x >= 20 || snake[0].x <= 0 || snake[0].y >= 20 || snake[0].y <= 0) {
        return true;
    }
}

function gameEngine(){
    // PART 1.1 : Updating the snake array and food:
    if (isCollide(SnakeArr)) {
        // gameoverSound.play();
        // musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("PLay again. Press any key to start PLAYING !!");
        SnakeArr = [ {x: 11, y: 15} ];
        // musicSound.play();
        score = 0;
    }

    // PART 1.2 : If you have eaten the food, increment the score and regenrate the food :
    if (SnakeArr[0].y === food.y && SnakeArr[0].x === food.x) {
        // foodSound.play();   //Sound played when snake eats the food !!
        score = score + 1;
        if (score > HiScoreVal)
        {
            HiScoreVal = score;
            localStorage.setItem('HiScore', JSON.stringify(HiScoreVal))
            HiScoreBox.innerHTML = "High Score : " + HiScoreVal;

        }
        let scoreBox = document.getElementById("scoreBox");
        scoreBox.innerHTML = "Score : " + score;
        SnakeArr.unshift({x: SnakeArr[0].x + inputDir.x, y: SnakeArr[0].y + inputDir.y});
        let a = 2; 
        let b = 16;
        food = { x : Math.round(a + (b-a) * Math.random()) , y : Math.round(a + (b-a) * Math.random())}
    }

    // PART 1.3 :  Moving the snake :
    for (let i = SnakeArr.length - 2 ; i >= 0 ; i--){
        // const element = array[i];
        SnakeArr[i+1] = {...SnakeArr[i]};
    }
    SnakeArr[0].x = SnakeArr[0].x + inputDir.x;
    SnakeArr[0].y = SnakeArr[0].y + inputDir.y;

    // PART 2.1 : Display the snake :
    board.innerHTML = "";
    SnakeArr.forEach((element, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = element.y;
        snakeElement.style.gridColumnStart = element.x;
        if (index === 0) {
            snakeElement.classList.add("head");
        }
        else{
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    })

    // PART 2.2 : Display the food :
        foodElement = document.createElement("div");
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add("food");
        board.appendChild(foodElement);
}

// MAIN LOGIC STARTS HERE :
let HiScore = localStorage.getItem('HiScore');
HiScoreVal = 0;
if(HiScore === null)
{
    localStorage.setItem('HiScore', JSON.stringify(HiScoreVal))
}
else {
    HiScoreVal = JSON.parse(HiScore);
    HiScoreBox.innerHTML = "High Score : " + HiScoreVal;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", event => {
    inputDir = { x: 0, y: 1}        // Start the game.
    // moveSound.play();
    switch (event.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir = { x: 0, y: -1}
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir = { x: 0, y: 1}
            break;
    
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir = { x: 1, y: 0}
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir = { x: -1, y: 0}
            break;
                
        default:
            break;
    }
})