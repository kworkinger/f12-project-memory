
const cards = document.querySelectorAll('.memory-card')
const registerUser = document.querySelector('.email')
const userContainer = document.querySelector('.users')

const register = event => {
    event.preventDefault()
    let input = event.target.parentNode.querySelector('input').value
    const body = {email: input}
    axios.post(`/register`, body)
    .then(res => {
        renderUser(res.data)
    }).catch(err => {
        console.log(err)
        alert('Error, please try again.')
    })
}
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard

function flipCard(){
    if (lockBoard) return
    if (this === firstCard) return

    this.classList.add('flip')

    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this

        return
    }   
    
    secondCard = this; 
    checkForMatch()
    }

function checkForMatch() {
    let isMatch = firstCard.dataset.image === secondCard.dataset.image;
    
    isMatch ? disableCards() : unflipCards()
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)

    resetBoard()
}

function unflipCards() {
    lockBoard = true
    
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard()
    }, 1500)
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random()*16)
        card.style.order = randomPos
    })
})()

const renderUser = (data) => {
    userContainer.innerHTML = ''
    const user = document.createElement('div')
    user.classList.add('user')

    user.innerHTML = `<p>Email: ${data.email} </p>`

    userContainer.appendChild(user)
}

cards.forEach(card => card.addEventListener('click', flipCard))
registerUser.addEventListener('click', register)