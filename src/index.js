import './styles.css';

let firstPuzzle = null;
let secondPuzzle = null;

function createPuzzleField(row, col, url) {
    const container = document.createElement('div');
    container.classList.add('puzzle-container');
    container.style.display = 'grid';
    container.style.width = '80%';
    container.style.height = '80vh';
    container.style.gridTemplateColumns = `repeat(${col}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${row}, 1fr)`;
    container.style.margin = '0 auto';
    document.body.appendChild(container);
    const containerWidth = container.offsetWidth;
    const containerHeigth = container.offsetHeight;
    const childArr = [];
    let count = 0;
    for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
            count++;
            const div = document.createElement('div');
            div.classList.add('puzzle-item');
            div.style.backgroundImage = `url(${url})`;
            div.style.backgroundSize = `${containerWidth}px ${containerHeigth}px`;
            div.style.backgroundPositionX = `${(containerWidth / col) * i}px`;
            div.style.backgroundPositionY = `${(containerHeigth / row) * j}px`;
            const number = document.createElement('span');
            number.style.color = 'blue';
            number.textContent = `${count}`;
            div.appendChild(number);
            childArr.push(div);
        }
    }
    const sortedArrChild = childArr.sort(() => Math.random() - 0.5);
    container.append(...sortedArrChild);
    // container.append(...childArr);
}
function onFirstPuzzleClick(event) {
    firstPuzzle = event.target;
    firstPuzzle.classList.add('selected-item');
    refs.container.removeEventListener('click', onFirstPuzzleClick);
    refs.container.addEventListener('click', onSecondPuzzleClick);
}
function onSecondPuzzleClick(event) {
    if (event.target !== firstPuzzle) {
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

createPuzzleField(
    3,
    4,
    'https://avatars.mds.yandex.net/get-pdb/1025945/ff5df732-8bcc-481c-9acf-5f887996a86a/s1200?webp=false',
);

const refs = {
    container: document.querySelector('.puzzle-container'),
};

refs.container.addEventListener('click', onFirstPuzzleClick);
