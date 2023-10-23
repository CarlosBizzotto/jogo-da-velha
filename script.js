// seleciona os blocos
const blocks = document.querySelectorAll(".block");

// seleciona o botao de restart
const restartButton = document.querySelector('#restartBtn');

// determina os matches
const matches = [[1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 5, 9], [3, 5, 7]];

let choices = [];
let turn = GetRandomTurn();

restartButton.addEventListener('click', () => {
    choices = [];
    turn = GetRandomTurn();

    blocks.forEach((block) => {
        if (!block.classList.contains('active')) {
            block.classList.add('active');
        }

        block.firstElementChild.src = '';
    });
});

blocks.forEach((block) => {
    block.addEventListener('click', (e) => {
        let element = e.target;

        if (element.classList.contains('active')) {
            choices[choices.length] = {
                turn: turn,
                key: element.id
            };
            element.classList.remove('active');
            turn == 0 ? element.firstElementChild.src = 'img/X.png' : element.firstElementChild.src = 'img/O.png';
            VerifyMatch();
        }
    });
});

function GetRandomTurn() {
    return Math.floor(Math.random() * 2);
}

function VerifyMatch() {
    if (choices.length >= 3) {
        let matchCount = 0;

        for (i = 0; i < matches.length; i++) {
            matches[i].forEach((match) => {
                choices.forEach((choice) => {
                    if (choice.turn == turn && match == choice.key) {
                        matchCount += 1;
                    }
                });
            });

            if (matchCount == 3) {
                blocks.forEach((block) => {
                    block.classList.remove('active');
                });

                break;
            } else {
                matchCount = 0;
            }
        }
    }

    turn == 0 ? turn = 1 : turn = 0;
}