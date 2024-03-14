document.addEventListener('DOMContentLoaded', ()=>{
    const gird = document.querySelector('.grid')
    let squaqres =Array.from(document.querySelectorAll('.grid div')) 
    const scoreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')
    const width =10
    let nextRandom = 0


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
    let current = theTetrominoes[random][0]

  // Draw the tetromino
    
    function draw(){
        current.forEach(index =>{
            squaqres[currentPosition+index].classList.add('tetromino')
        })
    } 

    // undraw the Tetromino

    function undraw(){
        current.forEach(index =>{
            squaqres[currentPosition + index].classList.remove('tetromino')
        }) 
    }

    // make the tetromino move down every second

    timerId = setInterval(moveDown, 500)

    // assign function to keycode

    function contral(e){
      if(e.keyCode === 37){
        moveLeft()
      }else if(e.keyCode === 38){
        // rotate
        rotate()
      }else if (e.keyCode === 39){
        // moveRight 
        moveRight()

      }else if (e.keyCode === 40){
        // movedown faster
        moveDown()
      }else if (e.keyCode === 32){
        rotate()

      }
    }

    document.addEventListener('keyup', contral)

    // move down fuction

    function moveDown (){
        undraw()
        currentPosition +=width
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


  // rotate the tetromino

  function rotate(){
    undraw()
    currentRotation ++
    if(currentRotation === current.length){
      currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    draw()
  }

// show up-next tetromino in mini-grid display

const displaySquares = document.querySelectorAll('.minigrid')


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
  })
  upNextTetromino[nextRandom].forEach(index =>{
    displaySquares[displayIndex + index].classList.add('tetromino')
  })
}

  


})