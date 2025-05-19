import { useState } from 'react'
import './App.css'
import Square from './comp/Square';
import confetti from 'canvas-confetti';
import { Turnos, lines} from './constants.js'
import Winner from './comp/Winner.jsx';



function App() {
  const [board, setBoard] = useState(() => {
    const storage = JSON.parse(window.localStorage.getItem('board'))
    return storage ?? Array(9).fill(null)
  });
  const [turn, setTurn] = useState(() => {
    const storage = JSON.parse(window.localStorage.getItem('turn'));
    return storage ?? Turnos.x
  });
  const [winner, setWinner] = useState(null);

  const updateCell = (index) => {
    console.log('updateTurn')
    if (board[index] === null || winner) {      
      const updatedBoard = [...board]
      updatedBoard[index] = turn
      setBoard(updatedBoard)
      setTurn(turn === Turnos.x ? Turnos.o : Turnos.x)
      window.localStorage.setItem('board', JSON.stringify(board))
      window.localStorage.setItem('turn', JSON.stringify(turn))
      const winner = winnerCheck(updatedBoard)
      if (winner) {
        setWinner(winner)
        confetti()
      } else if (endCheck(updatedBoard)) {
        setWinner(false)
      }
    }
  }

  const winnerCheck = (boardCheck) => {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (boardCheck[a] && boardCheck[a] === boardCheck[b] && boardCheck[a] === boardCheck[c]) {
        return boardCheck[a]; // Retorna 'X' o 'O' si hay ganador
      }
    }
    return null;
  }

  const endCheck = (board) => {
    return board.every((el) => el !== null)
  }

  const resetGame = () => {    
    setBoard(Array(9).fill(null))
    setTurn(Turnos.x)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className='cellContainer'>
        {
          board.map((_, index) => {
            return (
              <Square key={index} index={index} updateCell={updateCell} board={board}/>
            )
          })
        }
      </section>
      <section className='turnoSection'>Turno Actual: 
        <div key={Turnos.x} className={`turn ${turn === Turnos.x? 'selected' : ''}`}>×</div>
        <div key={Turnos.o} className={`turn ${turn === Turnos.o? 'selected' : ''}`}>o</div>
      </section>
      {
        winner != null && (<Winner winner={winner} resetGame={resetGame} />)
      }
    </main>
    
  )
}

export default App
