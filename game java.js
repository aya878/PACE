let firstCard = null;
let secondCard = null;
let lockBoard = false;

document.addEventListener('DOMContentLoaded', () => {
    shuffleCards();  // نخلط الكروت عند تحميل الصفحة
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', flipCard);
    });
});

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.querySelector('.front').style.display = 'block';
    this.querySelector('.back').style.display = 'none';

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.querySelector('.front').src === secondCard.querySelector('.front').src;

    if (isMatch) {
        showInfoBox(firstCard.dataset.info);
        resetCards(true);
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.querySelector('.front').style.display = 'none';
            firstCard.querySelector('.back').style.display = 'block';
            secondCard.querySelector('.front').style.display = 'none';
            secondCard.querySelector('.back').style.display = 'block';
            resetCards(false);
        }, 1000);
    }
}

function resetCards(isMatch) {
    if (isMatch) {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
    }
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function showInfoBox(info) {
    document.getElementById('info-text').innerText = info;
    document.getElementById('info-box').style.display = 'block';
}

document.getElementById('close-btn').addEventListener('click', function () {
    document.getElementById('info-box').style.display = 'none';
});

function shuffleCards() {
    const gameBoard = document.getElementById('game-board');
    const cards = Array.from(gameBoard.children); // تحويل الكروت إلى مصفوفة
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);  // تحديد موقع عشوائي
        card.style.order = randomPos;  // ضبط ترتيب الكارت عشوائيا باستخدام flexbox
    });
}