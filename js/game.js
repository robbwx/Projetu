const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const startButton = document.querySelector('#start-button');
const resetButton = document.querySelector('#reset-button');

let tentativas = 0;

const characters = [
    'Adriel',
    'Alana',
    'artur',
    'biel',
    'Camyla',
    'danilo',
    'julia',
    'queiroz',
    'bryan',
    'theodoro',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

let firstCard = '';
let secondCard = '';
let gameStarted = false;

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 20) {
        clearInterval(this.loop);
        
        const estatisticasDiv = document.querySelector('.estatisticas');
        const tempoFinal = timer.innerHTML;
        estatisticasDiv.innerHTML = `
            <h2>Fim de Jogo!</h2>
            <p>Tempo: ${tempoFinal} segundos</p>
            <p>Tentativas: ${tentativas}</p>
        `;

    }
};

const updateTentativas = () => {
    tentativas++;
    document.querySelector('.tentativas').textContent = tentativas.toString().padStart(2, '0');
};

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    
    updateTentativas();

    if (firstCharacter === secondCharacter) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 500);
    }
};

const revealCard = ({ target }) => {
    if (!gameStarted) return;

    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }
};

const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/${character}.jpg')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);

    return card;
};

const loadGame = () => {
    const duplicateCharacters = [...characters, ...characters];

    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
};

const startTimer = () => {
    timer.innerHTML = '0';
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
};

startButton.addEventListener('click', () => {
    if (!gameStarted) {
        gameStarted = true;
        startButton.disabled = true;
        startButton.textContent = 'Jogo em andamento...';
        startTimer();
        loadGame();
        
    }
});

const resetGame = () => {

    grid.innerHTML = '';

    tentativas = 0;
    firstCard = '';
    secondCard = '';
    gameStarted = false;
    timer.innerHTML = '0';
    document.querySelector('.tentativas').textContent = '00';
    
    startButton.disabled = false;
    startButton.textContent = 'Iniciar';
    
    const estatisticasDiv = document.querySelector('.estatisticas');
    if (estatisticasDiv) estatisticasDiv.innerHTML = '<h2>Estatísticas</h2>';
    
    if (this.loop) clearInterval(this.loop);
};

resetButton.addEventListener('click', resetGame);

window.onload = () => {
    const playerName = localStorage.getItem('player') || 'Jogador';
    spanPlayer.innerHTML = playerName;
};

