(function gamerTime() {
    let cells = document.querySelectorAll(".row > div");
    //gameOn allows for the resetting of values and clearing of the board.
    let gameOn = false
    //Number of turns taken. This is how the system decides when a draw happens.
    let playerTurns = 0

    //Current player
    let currentPlayer = 'X'
    //Winner when not null.
    let winner = null
    //Array of winning positions.
    const winArray = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ]
    //Looks out for an event. In this case, a click.
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', cellClicked)
    }
    //Changes player from X to O. Also checks and alerts when a victory or draw takes place.
    function playerChange() {
        if (checkWin()) {
            alert(`Player ${currentPlayer} has won!`)
            gameOn = true
        } else if (playerTurns > 8) {
            alert(`Draw! Too bad.`)
            gameOn = true
        } else if (currentPlayer == 'X') {
            currentPlayer = 'O'
        } else {
            currentPlayer = 'X'
        }
    }
    //Changes setting for the specific cell that was clicked on. Triggers when click detected.
    function cellClicked() {
        if (gameOn == true) {
            gameReset()
        } else if (event.target.innerText == '') {
            if (currentPlayer === 'X') {
                event.target.textContent = 'X';
                playerChange();
            } else if (currentPlayer == 'O') {
                event.target.textContent = 'O'
                playerChange()
            }
        } else {
            console.log('Wrong square, buddy.')
        }
    }
    //Reveals the text contents of selected board areas.
    function clickedCell(cellID) {
        return document.getElementById(cellID).innerText;
    }

    //This function compares the output from the previous section to make sure that it is NOT equal to " ".
    // If that can be confirmed then it is tested see if it is equal to parts b AND c.
    function checkScore(a, b, c) {
        if (clickedCell(a) != '' && clickedCell(a) == clickedCell(b) && clickedCell(b) == clickedCell(c)) {
            return true
        } else {
            return false
        }

    }
    //Compares output of checkScore to see if it is compatible with one of the eight successful matrices.
    function checkWin() {
        playerTurns++ //Determines draw or no draw.
        for (let i = 0; i < 7; i++) {
            let winTime = winArray[i]
            let a = winTime[0];
            let b = winTime[1];
            let c = winTime[2];
            if (checkScore(a, b, c)) {
                return true
            }
        }

    }//gameReset resets the board, turn counter, game status, and player var
    function gameReset() {
        cells.forEach(cell => {
            cell.innerHTML = "";
            playerTurns = 0
            gameOn = false
            currentPlayer = 'X'
        });
    }

})();
