export default function Winner ({winner, resetGame}) {
    const text = winner == false ? 'Empate' : 'Ganó'
    return (
        <section className='winAlert'>
            <div className='winText'>
              <div className='winHeader'>
                <h2>{text}</h2>
                <header className='winner'>                
                  {winner && <div>{winner}</div>}
                </header>
              </div>              
              <footer className='close'>
                <button onClick={resetGame}>Cerrar</button>
              </footer>
            </div>
            <div></div>
          </section>
    )
}