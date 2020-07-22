import './styles.css';
import bus from './images/bus.jpg';
import cake from './images/cake.jpg';
import store from './images/-dlkugqfyv986mje0io4rzpct.jpg';

let firstPuzzle = null;
let secondPuzzle = null;

function createPuzzleField(row, col, url) {
    const container = refs.container;
    container.style.gridTemplateColumns = `repeat(${col}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${row}, 1fr)`;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const childArr = [];
    let count = 0;

    for (let j = 0; j < row; j++) {
        for (let i = 0; i < col; i++) {
            count++;
            const div = document.createElement('div');
            div.classList.add('puzzle-item');
            div.style.backgroundImage = `url(${url})`;
            div.style.backgroundSize = `${containerWidth}px ${containerHeight}px`;
            div.style.backgroundPositionX = `-${(containerWidth / col) * i}px`;
            div.style.backgroundPositionY = `-${(containerHeight / row) * j}px`;
            const number = document.createElement('span');
            number.style.color = 'blue';
            number.style.backgroundColor = 'white';
            number.textContent = `${count}`;
            div.appendChild(number);
            childArr.push(div);
        }
    }
    const sortedArrChild = childArr.sort(() => Math.random() - 0.5);
    container.append(...sortedArrChild);
}
function onFirstPuzzleClick(event) {
    if (event.target.class !== 'puzzle-container') {
        firstPuzzle = event.target;
        firstPuzzle.classList.add('selected-item');
        refs.container.removeEventListener('click', onFirstPuzzleClick);
        refs.container.addEventListener('click', onSecondPuzzleClick);
    }
}
function onSecondPuzzleClick(event) {
    if (event.target !== firstPuzzle && event.target !== 'puzzle-container') {
        secondPuzzle = event.target;
        secondPuzzle.classList.add('selected-item');
        swapPuzzles();
    } else {
        firstPuzzle.classList.remove('selected-item');
        firstPuzzle = null;
    }
    refs.container.removeEventListener('click', onSecondPuzzleClick);
    refs.container.addEventListener('click', onFirstPuzzleClick);
}
function swapPuzzles() {
    const nextSiblingFor1st = firstPuzzle.nextSibling;
    const prevSiblingFor1st = firstPuzzle.previousSibling;
    secondPuzzle.replaceWith(firstPuzzle);
    if (prevSiblingFor1st === null) {
        beFirstChild();
        removeSelected();
        return;
    }
    if (nextSiblingFor1st === null) {
        beLastChild();
        removeSelected();
        return;
    }
    if (nextSiblingFor1st === secondPuzzle) {
        beNext(prevSiblingFor1st);
        removeSelected();
        return;
    } else {
        bePrev(nextSiblingFor1st);
        removeSelected();
        return;
    }
}
function beFirstChild() {
    refs.container.prepend(secondPuzzle);
}
function beLastChild() {
    refs.container.append(secondPuzzle);
}
function beNext(prevEl) {
    prevEl.after(secondPuzzle);
}
function bePrev(nextEl) {
    nextEl.before(secondPuzzle);
}
function removeSelected() {
    firstPuzzle.classList.remove('selected-item');
    secondPuzzle.classList.remove('selected-item');
    firstPuzzle = null;
    secondPuzzle = null;
}
function buttonHandler(event) {
    if (event.target.nodeName === 'BUTTON') {
        refs.container.innerHTML = '';
        switch (event.target.id) {
            case 'cake-btn':
                createPuzzleField(3, 4, cake);
                break;
            case 'bus-btn':
                createPuzzleField(3, 4, bus);
                break;
            case 'store-btn':
                createPuzzleField(3, 4, store);
                break;
        }
    }
}

const refs = {
    container: document.querySelector('.puzzle-container'),
    containerBtn: document.querySelector('.buttons-container'),
};

refs.container.addEventListener('click', onFirstPuzzleClick);
refs.containerBtn.addEventListener('click', buttonHandler);
