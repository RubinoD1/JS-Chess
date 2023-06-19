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

// Selecting all Checkers
var allCheckers = document.querySelectorAll('#chessBoard .row .square-style');

// Click Event function
var onSelect = (e) => {
  // Checking if it is a parent div
  var current = e.currentTarget;
  var isSelected = Array.from(allCheckers).filter((row) =>
    row.classList.contains('selected')
  );
  if (current.getAttribute('name') !== '' && isSelected.length < 1) {
    current.classList.add('selected');
    moves(current);
  } else {
    // Removing the classes from the selected pieces.
    document
      .querySelectorAll('.possible-moves ,.selected,.kill')
      .forEach((x) => {
        x.classList.remove('possible-moves', 'selected', 'kill');
      });

    // If the new position and the old position are not same
    if (
      current.getAttribute('position') !==
      isSelected[0].getAttribute('position')
    ) {
      if (current.querySelector('img') != null)
        // appending the image of the pieces
        current.querySelector('img').remove();

      current.append(isSelected[0].querySelector('img'));
      current.setAttribute('name', isSelected[0].getAttribute('name'));

      current.classList.remove(isBlack(current) ? 'black' : 'white');
      current.classList.add(isBlack(isSelected[0]) ? 'black' : 'white');
    }

    enableBoxes();
  }
};

// Binding the click event to all the checkers
Array.from(allCheckers).map((row, index) => {
  row.setAttribute('position', index + 1);
  row.setAttribute('name', chessPieces[index]);
  row.addEventListener('click', onSelect);
  if (index + 1 >= 1 && index + 1 <= 16) {
    row.classList.add('black');
  } else if (index + 1 >= 49 && index + 1 <= 64) {
    row.classList.add('white');
  }
});

// Valid moves
var moves = (selectedPiece) => {
  var name = selectedPiece.getAttribute('name');
  let _isBlack = isBlack(selectedPiece);
  var currentPosition = parseInt(selectedPiece.getAttribute('position'));

  switch (name) {
    case 'pawn':
      let counter = _isBlack ? 1 : -1;
      let moves = currentPosition + 8 * counter - 1;

      // the pawn is at the start location / has not moved
      if (
        ((currentPosition >= 9 && currentPosition <= 16) ||
          (currentPosition >= 49 && currentPosition <= 56)) &&
        allCheckers[moves + 8 * counter].getAttribute('name') === '' &&
        allCheckers[moves].getAttribute('name') === ''
      ) {
        allCheckers[moves + 8 * counter].classList.add('possible-moves');
      }
      // Check if there is opponent piece present
      if (
        allCheckers[moves - 1].getAttribute('name') != '' &&
        isBlack(allCheckers[moves - 1]) != _isBlack
      ) {
        allCheckers[moves - 1].classList.add('kill');
      }
      if (
        allCheckers[moves + 1].getAttribute('name') != '' &&
        isBlack(allCheckers[moves + 1]) != _isBlack
      ) {
        allCheckers[moves + 1].classList.add('kill');
      }
      // pawn has moved
      maxMoves = 1;
      if (allCheckers[moves].getAttribute('name') === '')
        allCheckers[moves].classList.add('possible-moves');

      disableBoxes();
  }
};

// Check whether the piece is black or white
var isBlack = (e) => {
  return e.classList.contains('black');
};

// Disabling all the boxes
var disableBoxes = (e) => {
  Array.from(allCheckers).map((row) => {
    if (
      !row.classList.contains('selected') &&
      !row.classList.contains('possible-moves') &&
      !row.classList.contains('kill')
    )
      row.classList.add('disable-box');
  });
};

// Enabling the boxes
var enableBoxes = () => {
  Array.from(allCheckers).map((row) => {
    if (row.classList.contains('disable-box'))
      row.classList.remove('disable-box');
  });
};
