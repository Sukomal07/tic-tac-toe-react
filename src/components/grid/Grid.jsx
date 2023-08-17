import { useState } from "react"
import Card from "../card/Card";
import './Grid.css'
import checkWinner from "../helper/checkWinner";

function Grid({ numberOfCards }) {
    const [board, setBoard] = useState(Array(numberOfCards).fill(""));
    const [turn, setTurn] = useState(true)
    const [winner, setWinner] = useState(null)
    const [disabledCards, setDisabledCards] = useState(Array(numberOfCards).fill(false));
    function play(index) {
        if (board[index] || winner) {
            return
        }
        const updatedBoard = [...board]
        updatedBoard[index] = (turn) ? 'O' : 'X'
        setBoard(updatedBoard)
        const win = checkWinner(updatedBoard, (turn) ? 'O' : 'X')
        if (win) {
            setWinner(win)
        }
        setTurn(!turn)
        setDisabledCards(prevState => {
            const updatedDisabledCards = [...prevState];
            updatedDisabledCards[index] = true;
            return updatedDisabledCards;
        });
    }
    function reset() {
        setTurn(true)
        setWinner(null)
        setBoard(Array(numberOfCards).fill(""))
        setDisabledCards(Array(numberOfCards).fill(false))
    }
    return (
        <div className="grid-container">
            <button className="reset" type="reset" onClick={reset}>Reset Game</button>
            {
                winner ? (
                    <>
                        <h2 className="turn-highlight">Winner is {winner}</h2>
                    </>
                ) : (
                    <>
                        <h2 className="turn-highlight">Current turn: {(turn) ? 'O' : 'X'}</h2>
                    </>
                )
            }
            <div className="grid">
                {board.map((el, idx) => <Card key={idx} onPlay={play} index={idx} player={el} disabled={disabledCards[idx]} />)}
            </div>
        </div>
    )
}

export default Grid