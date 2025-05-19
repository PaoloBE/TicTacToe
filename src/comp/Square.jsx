export default function Square({index, selectedFlg, updateCell, board}) {
    const handlerClick = () => {
        updateCell(index)
    }
    const name = `cell ${selectedFlg ? 'selected' : ''}`
    return (
        <div key={index} className={name} onClick={handlerClick}>{board[index] === null? ' ' : board[index]}</div>
    )
}