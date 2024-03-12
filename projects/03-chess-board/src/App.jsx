import { Component } from 'react'
import './App.css'
import { pieces, initialBoard } from './constants';


// Componente para representar una casilla del tablero
class Square extends Component {
  render() {
    const { piece, isBlack, onClick } = this.props;
    const backgroundColor = isBlack ? '#769656' : '#eeeed2';

    return (
      <div
        className="square"
        style={{ backgroundColor }}
        onClick={onClick}
      >
        {piece && <span className="piece">{pieces[piece]}</span>}
      </div>
    );
  }
}

// Componente principal del tablero de ajedrez
class Chessboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: initialBoard,
      selectedSquare: null,
      turn: 'white',
    };
  }

  // Manejar el clic en una casilla del tablero
  handleSquareClick = (row, col) => {
    const { board, selectedSquare, turn } = this.state;

    if (!selectedSquare) {
      if (board[row][col] && this.isPieceColor(board[row][col]) === turn) {
        this.setState({ selectedSquare: { row, col } });
      }
    } else {
      const { row: prevRow, col: prevCol } = selectedSquare;
      const piece = board[prevRow][prevCol];
      const isValidMove = this.validateMove(prevRow, prevCol, row, col, piece);

      if (isValidMove) {
        const newBoard = [...board];
        newBoard[row][col] = piece;
        newBoard[prevRow][prevCol] = null;
        this.setState({
          board: newBoard,
          selectedSquare: null,
          turn: turn === 'white' ? 'black' : 'white',
        });
      } else {
        this.setState({ selectedSquare: null });
      }
    }
  };

  // Validar si el movimiento de una pieza es válido
  validateMove = (prevRow, prevCol, newRow, newCol, piece) => {
    const { board } = this.state;

    // Obtener el color de la pieza y la casilla de destino
    const pieceColor = piece && piece.toUpperCase() === piece ? 'white' : 'black';
    const destPiece = board[newRow][newCol];
    const destPieceColor = destPiece && destPiece.toUpperCase() === destPiece ? 'white' : 'black';

    // Validar movimientos específicos según el tipo de pieza
    switch (piece && piece.toLowerCase()) {
      case 'p': // Peón
        return this.validatePawnMove(prevRow, prevCol, newRow, newCol, pieceColor, destPiece, destPieceColor);
      case 'r': // Torre
        return this.validateRookMove(prevRow, prevCol, newRow, newCol);
      case 'n': // Caballo
        return this.validateKnightMove(prevRow, prevCol, newRow, newCol);
      case 'b': // Alfil
        return this.validateBishopMove(prevRow, prevCol, newRow, newCol);
      case 'q': // Reina
        return this.validateQueenMove(prevRow, prevCol, newRow, newCol);
      case 'k': // Rey
        return this.validateKingMove(prevRow, prevCol, newRow, newCol);
      default:
        return false;
    }
};

  // Lógica de validación para el movimiento del peón
  validatePawnMove = (prevRow, prevCol, newRow, newCol, color, destPiece, destPieceColor) => {
    const direction = color === 'white' ? -1 : 1;
    const forwardOne = prevCol === newCol && prevRow + direction === newRow && !destPiece;
    const forwardTwo = prevCol === newCol && prevRow + 2 * direction === newRow && !destPiece && this.isPawnInitialPosition(prevRow, color);
    const diagonalAttack = Math.abs(newCol - prevCol) === 1 && prevRow + direction === newRow && destPiece && destPieceColor !== color;

    return forwardOne || forwardTwo || diagonalAttack;
  };

  // Lógica de validación para el movimiento de la torre
  validateRookMove = (prevRow, prevCol, newRow, newCol) => {
    return prevRow === newRow || prevCol === newCol;
  };

  // Lógica de validación para el movimiento del caballo
  validateKnightMove = (prevRow, prevCol, newRow, newCol) => {
    const rowDiff = Math.abs(newRow - prevRow);
    const colDiff = Math.abs(newCol - prevCol);

    return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
  };

  // Lógica de validación para el movimiento del alfil
  validateBishopMove = (prevRow, prevCol, newRow, newCol) => {
    const rowDiff = Math.abs(newRow - prevRow);
    const colDiff = Math.abs(newCol - prevCol);

    return rowDiff === colDiff;
  };

  // Lógica de validación para el movimiento de la reina
  validateQueenMove = (prevRow, prevCol, newRow, newCol) => {
    return this.validateRookMove(prevRow, prevCol, newRow, newCol) || this.validateBishopMove(prevRow, prevCol, newRow, newCol);
  };

  // Lógica de validación para el movimiento del rey
  validateKingMove = (prevRow, prevCol, newRow, newCol) => {
    const rowDiff = Math.abs(newRow - prevRow);
    const colDiff = Math.abs(newCol - prevCol);

    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1) || (rowDiff === 1 && colDiff === 1);
  };

  // Verificar si una casilla está ocupada por una pieza del oponente
  isOpponentPiece = (row, col) => {
    const { board, selectedSquare } = this.state;
    const piece = board[row][col];
    const selectedPiece = board[selectedSquare.row][selectedSquare.col];
    return piece && this.isPieceColor(piece) !== this.isPieceColor(selectedPiece);
  };

  // Verificar si el peón está en su posición inicial
  isPawnInitialPosition = (row, color) => {
    return (color === 'white' && row === 6) || (color === 'black' && row === 1);
  };

  // Verificar el color de una pieza
  isPieceColor = (piece) => {
    return piece === piece.toUpperCase() ? 'white' : 'black';
  };

  // Generar las casillas del tablero
  renderBoard = () => {
    const { board } = this.state;
    const squares = [];

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const isBlack = (row + col) % 2 === 1;
        const piece = board[row][col];
        squares.push(
          <Square
            key={`${row}-${col}`}
            piece={piece}
            isBlack={isBlack}
            onClick={() => this.handleSquareClick(row, col)}
          />
        );
      }
    }

    return squares;
  };

  render() {
    return (
      <div className="chessboard">
        {this.renderBoard()}
      </div>
    );
  }
}

// Estilos CSS (mismo que en el código anterior)
const styles = {
  chessboard: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '640px',
    height: '405px',
  },
};

// Aplicar estilos CSS
class App extends Component {
  render() {
    return (
      <div style={styles.chessboard}>
        <Chessboard />
      </div>
    );
  }
}

export default App;

