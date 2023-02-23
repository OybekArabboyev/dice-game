const btnNew = document.querySelector(".btn--new")
const btnRoll = document.querySelector(".btn--roll")
const btnHold = document.querySelector(".btn--hold")
const diceSound = new Audio ("sounds/dice.mp3")
const clickSound = new Audio ("sounds/click.mp3")
const winnerSound = new Audio ("sounds/winner.mp3")

const imgDice = document.querySelector(".dice")
imgDice.style.display = "none"

let current = 0
let activePlayer = 0
let score = [0, 0]
let gameOver = true

const activeFunc = function() {
    current = 0
    document.querySelector(`#current--${activePlayer}`).textContent = current
    activePlayer = activePlayer == 0 ? 1 : 0
    document.querySelector(".player--0").classList.toggle("player--active")
    document.querySelector(".player--1").classList.toggle("player--active")
}

btnRoll.addEventListener("click", ()=> {
    if(gameOver) {
        imgDice.style.display = "block"
        diceSound.play()
        let random = Math.ceil(Math.random() * 6)
        imgDice.setAttribute("src", `dice-${random}.png`)

        if(random != 1) {
        current += random
        document.querySelector(`#current--${activePlayer}`).textContent = current
    } else {
        activeFunc()
    }
    }
})

btnHold.addEventListener("click", ()=> {
    score[activePlayer] += current
    clickSound.play()
    if(gameOver) {
        if(score[activePlayer] < 100) {
            document.querySelector(`#score--${activePlayer}`).textContent = score[activePlayer]
            activeFunc()
        } else {
            winnerSound.play()
            document.querySelector(`#score--${activePlayer}`).textContent = score[activePlayer]
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner")
            document.querySelector(`#name--${activePlayer}`).textContent += "   wins" 
            current = 0
            document.querySelector(`#current--${activePlayer}`).textContent = current
            imgDice.style.display = "none"
            gameOver = false
        }
    }
})

btnNew.addEventListener("click", ()=> {
    clickSound.play()
    setTimeout(()=>{
        location.reload(true)
    }, 500)
})