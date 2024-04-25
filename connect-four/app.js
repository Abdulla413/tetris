const playerRed = 'R'
const playerYellow = 'Y'
let currentPlayer = playerRed

const gameOver = false
let board;

let rows=7;
let columns=7;

var currentColumns;


window.onload = ()=>{
setGame()

}

function setGame(){
    board = [];
    currentColumns = [6,6,6,6,6,6,6]
    for(let r = 0; r < rows; r++ ){
        let row = []
        for(let c = 0; c < columns; c++){
            // Js
            row.push(' ');
            // HTML
            let tile = document.createElement("div")
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add('tile');
            tile.addEventListener('click', setPiece)
            document.getElementById('board').append(tile)
        }
        board.push(row)
    }
}


function setPiece(){

    if(gameOver){
        return;
    }
    let coords = this.id.split("-"); // "0-0" -> ["0", "0"]
    let r= parseInt(coords[0]);
    let c= parseInt(coords[1]);

    r = currentColumns[c];
    if(r < 0 ){
        return;
    }

    board[r][c] = currentPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());

    if(currentPlayer == playerRed){
        tile.classList.add("red-piece")
        currentPlayer = playerYellow;
    } else {
        tile.classList.add("yellow-piece")
        currentPlayer = playerRed;
    }

    r -= 1; 
    currentColumns[c] = r;

    checkWinner()

}

function checkWinner() {
  


     // horizontal
     for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++){
           if (board[r][c] != ' ') {
               if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                   setWinner(r, c);
                   return;
               }
           }
        }
   }

   // vertical
   for (let c = 0; c < columns; c++) {
       for (let r = 0; r < rows - 3; r++) {
           if (board[r][c] != ' ') {
               if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                   setWinner(r, c);
                   return;
               }
           }
       }
   }
// anti diagonal

for (let r = 0; r < rows - 3; r++) {
    for (let c = 0; c < columns - 3; c++) {
        if (board[r][c] != ' ') {
            if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                setWinner(r, c);
                return;
            }
        }
    }
}

// diagonal
for (let r = 3; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
        if (board[r][c] != ' ') {
            if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                setWinner(r, c);
                return;
            }
        }
    }
}

}



function setWinner (r,c) {
    let winner = document.querySelector('#winnerspan');
    if(board[r][c]==playerRed){
        winner.innerText = 'Red'
        winner.style.color = 'red'
        document.querySelector('.winner').style.visibility = 'visible'
    }else {
        winner.innerText = 'Yellow'
        winner.style.color = 'rgb(227, 168, 5)'
        document.querySelector('.winner').style.visibility = 'visible'
    }
    gameOver = true;
}