let boardMain: boolean[][] = [
    /* 0  */[null, null, null, null, null, null, null, null, null, null, null],
    /* 1  */[null, null, null, null, null, null, null, null, null, null, null],
    /* 2  */[null, null, null, null, true, true, true, null, null, null, null],
    /* 3  */[null, null, null, null, true, true, true, null, null, null, null],
    /* 4  */[null, null, true, true, true, true, true, true, true, null, null],
    /* 5  */[null, null, true, true, true, false, true, true, true, null, null],
    /* 6  */[null, null, true, true, true, true, true, true, true, null, null],
    /* 7  */[null, null, null, null, true, true, true, null, null, null, null],
    /* 8  */[null, null, null, null, true, true, true, null, null, null, null],
    /* 9  */[null, null, null, null, null, null, null, null, null, null, null],
    /* 10 */[null, null, null, null, null, null, null, null, null, null, null],
];

let bestListOfMoves: { location: { x: number; y: number }; to: { x: number; y: number } }[] = [];

let best = 1000;
let bestBoard = boardMain;
let itts = 0;
let completeBoards: boolean[][][] = [];

// Pin Sodoku Solver
// Pins can just over each other
let mainFunc = (boardIn: boolean[][]) => {
    let board = [...boardIn]
    itts++;


    function checkPossibleSolutions(row: number, column: number): number[][] {
        let val = board[row][column];
        if (val === null || val === false) {
            return [];
        }
        let possibleSolutions: number[][] = [];


        // Check Left
        let leftItem = board[row][column - 1];
        let leftItem2 = board[row][column - 2];
        if (leftItem !== null && leftItem2 !== null) {
            if (leftItem === true && leftItem2 === false) {
                possibleSolutions.push([row, column - 2]);
            }
        }

        // Check Right
        let rightItem = board[row][column + 1];
        let rightItem2 = board[row][column + 2];
        if (rightItem !== null && rightItem2 !== null) {
            if (rightItem === true && rightItem2 === false) {
                possibleSolutions.push([row, column + 2]);
            }
        }

        // Check Up
        let upItem = board[row - 1][column];
        let upItem2 = board[row - 2][column];
        if (upItem !== null && upItem2 !== null) {
            if (upItem === true && upItem2 === false) {
                possibleSolutions.push([row - 2, column]);
            }
        }

        // Check Down
        let downItem = board[row + 1][column];
        let downItem2 = board[row + 2][column];
        if (downItem !== null && downItem2 !== null) {
            if (downItem === true && downItem2 === false) {
                possibleSolutions.push([row + 2, column]);
            }
        }

        return possibleSolutions;
    }

    function CalculateAllPosibleMoves() {
        let possibleMoves: { location: { x: number; y: number }; to: { x: number; y: number }[] }[] = [];
        for (let row = 0; row < board.length; row++) {
            for (let column = 0; column < board[row].length; column++) {
                let possibleSolutions = checkPossibleSolutions(row, column);
                if (possibleSolutions.length > 0) {
                    possibleMoves.push({ location: { x: row, y: column }, to: possibleSolutions.map((x) => ({ x: x[0], y: x[1] })) });
                }
            }
        }
        return possibleMoves;
    }

    function MovePiece({ location, to }: { location: { x: number; y: number }; to: { x: number; y: number } }) {
        board[location.x][location.y] = false;
        // cwords between location and to
        let x = (to.x + location.x) / 2;
        let y = (to.y + location.y) / 2;
        board[x][y] = false;

        board[to.x][to.y] = true;
    }

    function CalculatePieces() {
        let pieces = 0;
        for (let row = 0; row < board.length; row++) {
            for (let column = 0; column < board[row].length; column++) {
                if (board[row][column] === true) {
                    pieces++;
                }
            }
        }
        return pieces;
    }
    let possibleMovesAvailable = CalculateAllPosibleMoves();

    let moves = [];

    while (possibleMovesAvailable.length > 1 && CalculatePieces() > 1) {
        let move = possibleMovesAvailable[Math.floor(Math.random() * possibleMovesAvailable.length)];
        let goTo = move.to[Math.floor(Math.random() * move.to.length)];
        let obj = {
            location: move.location,
            to: goTo,
        };
        MovePiece(obj);
        moves.push(obj);
        possibleMovesAvailable = CalculateAllPosibleMoves();
    }

    best = CalculatePieces();
    bestBoard = board;
    bestListOfMoves = moves;

    //console.log(CalculatePieces())
};
let globalItts = 0;
while (globalItts < 1000) {
    while (bestBoard[5][5] !== true || best !== 1) {
        globalItts++;
        console.log('Global Interations, ', globalItts);
        mainFunc([
            /* 0  */[null, null, null, null, null, null, null, null, null, null, null],
            /* 1  */[null, null, null, null, null, null, null, null, null, null, null],
            /* 2  */[null, null, null, null, true, true, true, null, null, null, null],
            /* 3  */[null, null, null, null, true, true, true, null, null, null, null],
            /* 4  */[null, null, true, true, true, true, true, true, true, null, null],
            /* 5  */[null, null, true, true, true, false, true, true, true, null, null],
            /* 6  */[null, null, true, true, true, true, true, true, true, null, null],
            /* 7  */[null, null, null, null, true, true, true, null, null, null, null],
            /* 8  */[null, null, null, null, true, true, true, null, null, null, null],
            /* 9  */[null, null, null, null, null, null, null, null, null, null, null],
            /* 10 */[null, null, null, null, null, null, null, null, null, null, null],
        ]);
    }
    completeBoards.push(bestBoard);
    bestBoard = [
        /* 0  */[null, null, null, null, null, null, null, null, null, null, null],
        /* 1  */[null, null, null, null, null, null, null, null, null, null, null],
        /* 2  */[null, null, null, null, true, true, true, null, null, null, null],
        /* 3  */[null, null, null, null, true, true, true, null, null, null, null],
        /* 4  */[null, null, true, true, true, true, true, true, true, null, null],
        /* 5  */[null, null, true, true, true, false, true, true, true, null, null],
        /* 6  */[null, null, true, true, true, true, true, true, true, null, null],
        /* 7  */[null, null, null, null, true, true, true, null, null, null, null],
        /* 8  */[null, null, null, null, true, true, true, null, null, null, null],
        /* 9  */[null, null, null, null, null, null, null, null, null, null, null],
        /* 10 */[null, null, null, null, null, null, null, null, null, null, null],
    ];
    completeBoards = completeBoards.filter((item, index) => completeBoards.indexOf(item) === index);
}

console.log('Best Result');
console.log(best);
console.table(bestBoard);
console.log(JSON.stringify(bestListOfMoves));
console.log('Interations, ', itts);
console.log('Global Interations, ', globalItts);
console.log('total Correct solutions: ', completeBoards.length);
