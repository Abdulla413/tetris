document.addEventListener('DOMContentLoaded', ()=>{
    const gird = document.querySelector('.grid')
    let squaqres =Array.from(document.querySelectorAll('.grid div')) 
    const scoreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')
    const width = 10
    let nextRandom = 0
    let score = 0
    let timerId

    const colors = [
      'orange',
      'red',
      'purple',
      'green',
      'blue'
    ]


    // The Tetrominoes
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
      ]

    

    const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
      ]

    
      const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
      ]
    
      const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
      ]
    
      const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
      ]
    
    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]
    
    let currentPosition = 4
    let currentRotation = 0

    // Randomly select a Tetromino and its first rotation 
    let random = Math.floor(Math.random()*theTetrominoes.length)
    console.log(random,'this is random')
    let current = theTetrominoes[random][currentRotation]
    console.log(current, 'this is current')

  // Draw the tetromino
    
    function draw(){
        current.forEach(index =>{
            squaqres[currentPosition+index].classList.add('tetromino')
            squaqres[currentPosition + index].style.backgroundColor = colors[random]
        })
    } 

    // undraw the Tetromino

    function undraw(){
        current.forEach(index =>{
            squaqres[currentPosition + index].classList.remove('tetromino')
            squaqres[currentPosition + index].style.backgroundColor = ''
        }) 
    }

    

    // assign function to keycode

    function control(e){
      if(e.keyCode === 37){
        moveLeft()
      }else if(e.keyCode === 38){
        rotate()
      }else if (e.keyCode === 39){ 
        moveRight()
      }else if (e.keyCode === 40){
        moveDown()
      }
    }

    document.addEventListener('keyup', control)

    // move down fuction

    function moveDown (){
        undraw()
        currentPosition += width
        draw()
        freeze()
    }
// freeze function

  function freeze (){
    if(current.some(index => squaqres[currentPosition + index + width].classList.contains('taken'))){
        current.forEach(index => squaqres[currentPosition + index].classList.add('taken'))
        // Start a new Tetromino falling

        random = nextRandom

        nextRandom = Math.floor(Math.random() * theTetrominoes.length)
        current = theTetrominoes[random][currentRotation]
        currentPosition =4
        draw()
        displayShape()
        addScore()
        gameOver()
    }
  }




  // Move the tetromino left, unless is at the edge or there is blockage

  function moveLeft (){
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index)% width === 0)

    if(!isAtLeftEdge) currentPosition -=1
    if(current.some(index=>squaqres[currentPosition+index].classList.contains('taken'))){
      currentPosition +=1
    }
    draw()
  }

  function moveRight (){
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition+index) % width === width-1)
    
    if(!isAtRightEdge) currentPosition +=1
    if(current.some(index=>squaqres[currentPosition + index].classList.contains('taken'))){
      currentPosition-=1
    }
    draw()
  }


  // fix rotate of tetrominos at the edge

  function isAtRight(){
    return current.some(index => (currentPosition + index) % width === 0)
  }

  function isAtLeft(){
    return current.some(index => (currentPosition + index) % width === 0)
  }

function checkRotatePosition(P){
  P=P || currentPosition 
  if((P+1)%width < 4){
    if(isAtRight()){
      currentPosition += 1
      checkRotatePosition(P)
    }
  } else if(P%width>5) {
    if(isAtLeft()){
      currentPosition -=1
      checkRotatePosition(P)
    }

  }
}


  // rotate the tetromino

  function rotate(){
    undraw()
    currentRotation ++
    if(currentRotation === current.length){
      currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    checkRotatePosition()
    draw()
  }

// show up-next tetromino in mini-grid display

const displaySquares = document.querySelectorAll('.minigrid div')


const displayWidth = 4
let displayIndex = 0


const upNextTetromino = [
  [1, displayWidth+1, displayWidth*2+1, 2],
  [0, displayWidth, displayWidth+1, displayWidth*2+1],
  [1, displayWidth, displayWidth+1, displayWidth+2],
  [0,1,displayWidth, displayWidth+1],
  [1,displayWidth+1, displayWidth*2+1, displayWidth*3+1]
]

// dispaly the shape of in the mini grid

function displayShape (){
  displaySquares.forEach(squaqre =>{
    squaqre.classList.remove('tetromino')
    squaqre.style.backgroundColor = ''
  })
  upNextTetromino[nextRandom].forEach(index =>{
    displaySquares[displayIndex + index].classList.add('tetromino')
    displaySquares [displayIndex + index].style.backgroundColor = colors[nextRandom]
  })
}

// add function to the button

startBtn.addEventListener('click', ()=>{
if(timerId){
  clearInterval(timerId)
  timerId = null
} else {
  draw()
  timerId= setInterval(moveDown, 500)
  nextRandom = Math.floor(Math.random()*theTetrominoes.length)
  displayShape()
}
  
})


// add score

function addScore(){
  for(let i = 0; i<199; i+=width){
    const row = [i, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

    if(row.every(index => squaqres[index].classList.contains('taken'))){
      score +=10
      scoreDisplay.innerHTML= score
      row.forEach(index => {
        squaqres[index].classList.remove('taken')
        squaqres[index].classList.remove('tetromino')
        squaqres[index].style.backgroundColor = ''
      } )
      const squaqresRemoved = squaqres.splice(i,width)
      squaqres = squaqresRemoved.concat(squaqres)
      squaqres.forEach(cell => gird.appendChild(cell))
      
    }

  }
 

}

// Game over

function gameOver(){

  if(current.some(index =>squaqres[currentPosition + index ].classList.contains('taken'))){
    scoreDisplay.innerHTML = 'End'
    clearInterval(timerId) 
  }
}





























})