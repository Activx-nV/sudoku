// const sudoku = new Sudoku(`
//     5 0 3   0 0 4   6 7 0
//     0 9 0   2 5 0   8 3 1
//     0 0 2   6 0 3   0 0 9

//     0 2 0   3 7 0   0 1 5
//     0 0 8   0 2 0   7 6 0
//     3 0 0   5 6 0   0 0 0

//     4 6 0   0 0 0   1 0 7
//     2 8 1   0 4 0   0 0 0
//     0 0 5   0 9 0   0 8 0
// `);

const screenWidth = document.documentElement.clientWidth;
const rootElement = document.querySelector('.sudoku-game');
const startGameBtn = document.querySelector('.generate-puzzle');
const puzzleSolveBtn = document.querySelector('.solve-puzzle');
const appParent = document.getElementById('app');

const puzzleProps = {
    puzzleGenerated: false,
    generatedPuzzle: ''
}

let sudoku = Sudoku.generate(30);
    genSudoku(sudoku);
    puzzleProps.generatedPuzzle = sudoku;

genTimerHandler();

function genTimerHandler() {
    startGameBtn.setAttribute('disabled', true);
    startGameBtn.textContent = 'Wait 8s for next try'
    startGameBtn.style.color = 'red';

    let timeout = setTimeout(() => {
        startGameBtn.style.color = 'white';
        startGameBtn.textContent = "Generate new puzzle";
        startGameBtn.removeAttribute('disabled', true);
        clearTimeout(timeout);
    }, 8000)
}
function startGame() {
    genTimerHandler();
    if (appParent.children.length > 0) {
        appParent.innerHTML = '';
        sudoku = Sudoku.generate(30);
        genSudoku(sudoku);
        puzzleProps.generatedPuzzle = sudoku;
    } else {
        sudoku = Sudoku.generate(30);
        genSudoku(sudoku);
        puzzleProps.generatedPuzzle = sudoku;
    }
}

function genSudoku(sudokuName) {
    if (screenWidth > 1200) {
        document.querySelector('#app').append(sudokuName.getHTML(700, '70vw', window.innerHeight));
    } else if (screenWidth > 992 && screenWidth <= 1200) {
        document.querySelector('#app').append(sudokuName.getHTML(700, '80vw', window.innerHeight));
    } else if (screenWidth > 768 && screenWidth < 992) {
        document.querySelector('#app').append(sudokuName.getHTML(600, '90vw', window.innerHeight));
    } else if (screenWidth > 576 && screenWidth < 768) {
        document.querySelector('#app').append(sudokuName.getHTML(400, '80vw', window.innerHeight));
    } else if (screenWidth > 420 && screenWidth < 576) {
        document.querySelector('#app').append(sudokuName.getHTML(400, '80vw', window.innerHeight));
    } else {
        document.querySelector('#app').append(sudokuName.getHTML(300, '80vw', window.innerHeight));
    }
}

function solvePuzzle() {
    if (appParent.children.length < 1) {
        alert("Can't solve, puzzle is not generated yet.");
    } else {
        let solvedSudoku = puzzleProps.generatedPuzzle.solve();
        appParent.innerHTML = '';
        genSudoku(solvedSudoku);
    }
}

startGameBtn.addEventListener('click', startGame);
puzzleSolveBtn.addEventListener('click', solvePuzzle);