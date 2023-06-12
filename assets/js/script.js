// Array of pieces
var chessPieces = [
  'rook',
  'knight',
  'bishop',
  'queen',
  'king',
  'bishop',
  'knight',
  'rook',
  'pawn',
  'pawn',
  'pawn',
  'pawn',
  'pawn',
  'pawn',
  'pawn',
  'pawn',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  'pawn',
  'pawn',
  'pawn',
  'pawn',
  'pawn',
  'pawn',
  'pawn',
  'pawn',
  'rook',
  'knight',
  'bishop',
  'queen',
  'king',
  'bishop',
  'knight',
  'rook',
];

var selectedPiece = false;

// Selecting all Checkers
var allCheckers = document.querySelectorAll('#chessBoard .row .square-style');

// Click Event function
var onSelect = (e) => {
  debugger
  // Checking if it is a parent div
  var current = e.currentTarget;
  var isSelected = Array.from(allCheckers).filter(row => row.classList.contains("selected"));
  if(isSelected.length < 1){
    current.classList.add('selected');
  }else{
    // removing the class selected & possible moves
    document.querySelectorAll('.selected')[0].classList.remove("selected");
    document.querySelectorAll('.possible-moves').forEach((x)=>{x.classList.remove('possible-moves')})
    // appending the image of the peices
    current.append( isSelected[0].querySelector('img'));
     }
 
  moves(current);
};

// Binding the click event to all the checkers
Array.from(allCheckers).map((row, index) => {
  row.setAttribute('position', index + 1);
  row.setAttribute('name', chessPieces[index]);
  row.addEventListener('click', onSelect);
  if (index + 1 >= 1 && index + 1 <= 16) {
    row.classList.add('black');
  } else if (index + 49 >= 1 && index + 1 <= 64) {
    row.classList.add('white');
  }
});

var moves = (selectedPiece) => {
  var name = selectedPiece.getAttribute('name');
  var currentPosition = parseInt(selectedPiece.getAttribute('position'));
  let isBlack = selectedPiece.classList.contains('black') ? true : false;

  console.log(currentPosition);

  switch (name) {
    case 'pawn':
      if (isBlack) {
        // the pawn has not moved
        if (currentPosition >= 9 && currentPosition <= 16) {
          
          allCheckers[currentPosition + 8 - 1].classList.add('possible-moves');
          allCheckers[currentPosition + 16 - 1].classList.add('possible-moves');
        } else
          allCheckers[currentPosition + 8 - 1].classList.add('possible-moves');
      } else {
        allCheckers[currentPosition - 16 - 1].classList.add('possible-moves');
        allCheckers[currentPosition - 8 - 1].classList.add('possible-moves');
      }
  }
};

var possibleMoves = () => {};
