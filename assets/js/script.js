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
      isSelected[0].setAttribute('name', '');
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
      break;

    case 'rook':
      verticalUp(currentPosition, _isBlack);
      verticalDown(currentPosition, _isBlack);
      horizontalRight(currentPosition, _isBlack);
      horizontalLeft(currentPosition);
      disableBoxes();
      break;

    case 'knight':
      let left_Upper_Value = _isBlack
        ? currentPosition - ((currentPosition % 8) - 1) + 16
        : currentPosition - ((currentPosition % 8) - 1) - 16;
      let possible_left_position = _isBlack
        ? currentPosition + 16 - 1
        : currentPosition - 16 - 1;

      let right_Upper_Value = _isBlack
        ? currentPosition + ((currentPosition % 8) + 1) + 16
        : currentPosition + ((currentPosition % 8) + 1) - 16;

      let possible_right_position = _isBlack
        ? currentPosition + 16 + 1
        : currentPosition - 16 + 1;

      // Left side movement
      if (
        possible_left_position >= 0 &&
        possible_left_position <= 64 &&
        possible_left_position >= left_Upper_Value
      ) {
        move_Kill(possible_left_position, isBlack);
      }

      // Right side movement
      if (
        possible_right_position >= 0 &&
        possible_right_position <= 64 &&
        possible_right_position <= right_Upper_Value
      ) {
        if (
          allCheckers[possible_right_position - 1].getAttribute('name') === ''
        ) {
          allCheckers[possible_right_position - 1].classList.add(
            'possible-moves'
          );
        } else if (
          isBlack(allCheckers[possible_right_position - 1]) != _isBlack
        ) {
          allCheckers[possible_right_position - 1].classList.add('kill');
        }
      }

      // side movement
      let right_side_up = currentPosition + 2 - 8;
      let right_side_down = currentPosition + 2 + 8;
      let left_side_up = currentPosition - 2 - 8;
      let left_side_down = currentPosition - 2 + 8;

      // Right upper side movement
      if (
        right_side_up > 0 &&
        right_side_up < 64 &&
        right_side_up <= currentPosition + 1 + (currentPosition % 8) - 8
      ) {
        move_Kill(right_side_up, _isBlack);
      }

      // Right bottom side movement
      if (
        right_side_down > 0 &&
        right_side_down < 64 &&
        right_side_up <= currentPosition + 1 + (currentPosition % 8) + 8
      ) {
        move_Kill(right_side_down, _isBlack);
      }

      // Left upper side movement
      if (
        left_side_up > 0 &&
        left_side_up < 64 &&
        left_side_up >= currentPosition + 1 - (currentPosition % 8) - 8
      ) {
        move_Kill(left_side_up, _isBlack);
      }

      // Left bottom side movement
      if (
        left_side_down > 0 &&
        left_side_down < 64 &&
        left_side_down >= currentPosition + 1 - (currentPosition % 8) + 8
      ) {
        move_Kill(left_side_down, _isBlack);
      }

      disableBoxes();
      break;
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

// Vertical upward movement
var verticalUp = (currentPosition, _isBlack) => {
  let moves = currentPosition - 8;
  // Loop till the top point of the current row
  while (moves >= currentPosition % 8) {
    // If the blox is empty
    if (allCheckers[moves - 1].getAttribute('name') === '')
      allCheckers[moves - 1].classList.add('possible-moves');
    else {
      // checking for opponent
      if (isBlack(allCheckers[moves - 1]) != _isBlack) {
        allCheckers[moves - 1].classList.add('kill');
      }
      // if there is no space for movement break the loop
      break;
    }
    moves -= 8;
  }
};

// Vertical down movement
var verticalDown = (currentPosition, _isBlack) => {
  let moves = 1;
  // Loop till the end point of the current row
  while (currentPosition + 8 * moves <= 64) {
    // If the blox is empty
    if (
      allCheckers[currentPosition + 8 * moves - 1].getAttribute('name') === ''
    )
      allCheckers[currentPosition + 8 * moves - 1].classList.add(
        'possible-moves'
      );
    else {
      // checking for opponent
      if (isBlack(allCheckers[currentPosition + 8 * moves - 1]) != _isBlack) {
        allCheckers[currentPosition + 8 * moves - 1].classList.add('kill');
      }
      // if there is no space for movement break the loop
      break;
    }
    moves++;
  }
};

// Horizontal right
var horizontalRight = (currentPosition, _isBlack) => {
  let moves = currentPosition + 1;
  // Loop till the end point of the current row
  while (
    currentPosition % 8 &&
    moves < currentPosition + (8 - (currentPosition % 8))
  ) {
    // If the blox is empty
    if (allCheckers[moves].getAttribute('name') === '')
      allCheckers[moves].classList.add('possible-moves');
    else {
      // checking for opponent
      if (isBlack(allCheckers[moves]) != _isBlack) {
        allCheckers[moves].classList.add('kill');
      }
      break;
    }
    // if there is no space for movement break the loop
    moves++;
  }
};

// Horizontal left
var horizontalLeft = (currentPosition, _isBlack) => {
  let moves = currentPosition - 1;

  // Loop till the starting point of the current row
  while (moves >= currentPosition - ((currentPosition % 8) - 1)) {
    // If the blox is empty
    if (allCheckers[moves - 1].getAttribute('name') === '')
      allCheckers[moves - 1].classList.add('possible-moves');
    else {
      // checking for opponent
      if (isBlack(allCheckers[moves - 1]) != _isBlack) {
        allCheckers[moves - 1].classList.add('kill');
      }

      // if there is no space for movement break the loop
      break;
    }
    moves--;
  }
};

// Move/Kills
var move_Kill = (move, _isBlack) => {
  if (allCheckers[move - 1].getAttribute('name') === '') {
    allCheckers[move - 1].classList.add('possible-moves');
  } else if (isBlack(allCheckers[move - 1]) != _isBlack) {
    allCheckers[move - 1].classList.add('kill');
  }
};
