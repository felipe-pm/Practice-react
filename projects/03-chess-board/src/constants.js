// Definir las piezas de ajedrez
export const pieces = {
  'R': '♖',
  'N': '♘',
  'B': '♗',
  'Q': '♕',
  'K': '♔',
  'P': '♙',
  'r': '♜',
  'n': '♞',
  'b': '♝',
  'q': '♛',
  'k': '♚',
  'p': '♟',
};

// Inicializar el tablero de ajedrez con las piezas en sus posiciones iniciales
export const initialBoard = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];