"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var fs_1 = require("fs");
var boardMain = [
    /* 0  */ [null, null, null, null, null, null, null, null, null, null, null],
    /* 1  */ [null, null, null, null, null, null, null, null, null, null, null],
    /* 2  */ [null, null, null, null, true, true, true, null, null, null, null],
    /* 3  */ [null, null, null, null, true, true, true, null, null, null, null],
    /* 4  */ [null, null, true, true, true, true, true, true, true, null, null],
    /* 5  */ [null, null, true, true, true, false, true, true, true, null, null],
    /* 6  */ [null, null, true, true, true, true, true, true, true, null, null],
    /* 7  */ [null, null, null, null, true, true, true, null, null, null, null],
    /* 8  */ [null, null, null, null, true, true, true, null, null, null, null],
    /* 9  */ [null, null, null, null, null, null, null, null, null, null, null],
    /* 10 */ [null, null, null, null, null, null, null, null, null, null, null],
];
var bestListOfMoves = [];
var best = 1000;
var bestBoard = boardMain;
var itts = 0;
var completeBoards = [];
// Pin Sodoku Solver
// Pins can just over each other
var mainFunc = function (boardIn) {
    var board = __spreadArray([], boardIn, true);
    itts++;
    function checkPossibleSolutions(row, column) {
        var val = board[row][column];
        if (val === null || val === false) {
            return [];
        }
        var possibleSolutions = [];
        // Check Left
        var leftItem = board[row][column - 1];
        var leftItem2 = board[row][column - 2];
        if (leftItem !== null && leftItem2 !== null) {
            if (leftItem === true && leftItem2 === false) {
                possibleSolutions.push([row, column - 2]);
            }
        }
        // Check Right
        var rightItem = board[row][column + 1];
        var rightItem2 = board[row][column + 2];
        if (rightItem !== null && rightItem2 !== null) {
            if (rightItem === true && rightItem2 === false) {
                possibleSolutions.push([row, column + 2]);
            }
        }
        // Check Up
        var upItem = board[row - 1][column];
        var upItem2 = board[row - 2][column];
        if (upItem !== null && upItem2 !== null) {
            if (upItem === true && upItem2 === false) {
                possibleSolutions.push([row - 2, column]);
            }
        }
        // Check Down
        var downItem = board[row + 1][column];
        var downItem2 = board[row + 2][column];
        if (downItem !== null && downItem2 !== null) {
            if (downItem === true && downItem2 === false) {
                possibleSolutions.push([row + 2, column]);
            }
        }
        return possibleSolutions;
    }
    function CalculateAllPosibleMoves() {
        var possibleMoves = [];
        for (var row = 0; row < board.length; row++) {
            for (var column = 0; column < board[row].length; column++) {
                var possibleSolutions = checkPossibleSolutions(row, column);
                if (possibleSolutions.length > 0) {
                    possibleMoves.push({ location: { x: row, y: column }, to: possibleSolutions.map(function (x) { return ({ x: x[0], y: x[1] }); }) });
                }
            }
        }
        return possibleMoves;
    }
    function MovePiece(_a) {
        var location = _a.location, to = _a.to;
        board[location.x][location.y] = false;
        // cwords between location and to
        var x = (to.x + location.x) / 2;
        var y = (to.y + location.y) / 2;
        board[x][y] = false;
        board[to.x][to.y] = true;
    }
    function CalculatePieces() {
        var pieces = 0;
        for (var row = 0; row < board.length; row++) {
            for (var column = 0; column < board[row].length; column++) {
                if (board[row][column] === true) {
                    pieces++;
                }
            }
        }
        return pieces;
    }
    var possibleMovesAvailable = CalculateAllPosibleMoves();
    var moves = [];
    while (possibleMovesAvailable.length > 1 && CalculatePieces() > 1) {
        var move = possibleMovesAvailable[Math.floor(Math.random() * possibleMovesAvailable.length)];
        var goTo = move.to[Math.floor(Math.random() * move.to.length)];
        var obj = {
            location: move.location,
            to: goTo
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
var globalItts = 0;
while (globalItts < 9007199254740991) {
    while (bestBoard[5][5] !== true || best !== 1) {
        globalItts++;
        console.log('Global Interations, ', globalItts);
        mainFunc([
            /* 0  */ [null, null, null, null, null, null, null, null, null, null, null],
            /* 1  */ [null, null, null, null, null, null, null, null, null, null, null],
            /* 2  */ [null, null, null, null, true, true, true, null, null, null, null],
            /* 3  */ [null, null, null, null, true, true, true, null, null, null, null],
            /* 4  */ [null, null, true, true, true, true, true, true, true, null, null],
            /* 5  */ [null, null, true, true, true, false, true, true, true, null, null],
            /* 6  */ [null, null, true, true, true, true, true, true, true, null, null],
            /* 7  */ [null, null, null, null, true, true, true, null, null, null, null],
            /* 8  */ [null, null, null, null, true, true, true, null, null, null, null],
            /* 9  */ [null, null, null, null, null, null, null, null, null, null, null],
            /* 10 */ [null, null, null, null, null, null, null, null, null, null, null],
        ]);
    }
    completeBoards.push(bestBoard);
    bestBoard = [
        /* 0  */ [null, null, null, null, null, null, null, null, null, null, null],
        /* 1  */ [null, null, null, null, null, null, null, null, null, null, null],
        /* 2  */ [null, null, null, null, true, true, true, null, null, null, null],
        /* 3  */ [null, null, null, null, true, true, true, null, null, null, null],
        /* 4  */ [null, null, true, true, true, true, true, true, true, null, null],
        /* 5  */ [null, null, true, true, true, false, true, true, true, null, null],
        /* 6  */ [null, null, true, true, true, true, true, true, true, null, null],
        /* 7  */ [null, null, null, null, true, true, true, null, null, null, null],
        /* 8  */ [null, null, null, null, true, true, true, null, null, null, null],
        /* 9  */ [null, null, null, null, null, null, null, null, null, null, null],
        /* 10 */ [null, null, null, null, null, null, null, null, null, null, null],
    ];
    completeBoards = completeBoards.filter(function (item, index) { return completeBoards.indexOf(item) === index; });
    (0, fs_1.writeFileSync)("Number".concat(completeBoards.length, "_").concat(Date.now(), ".json"), JSON.stringify(bestListOfMoves));
}
console.log('Best Result');
console.log(best);
console.table(bestBoard);
console.log(JSON.stringify(bestListOfMoves));
console.log('Interations, ', itts);
console.log('Global Interations, ', globalItts);
console.log('total Correct solutions: ', completeBoards.length);
