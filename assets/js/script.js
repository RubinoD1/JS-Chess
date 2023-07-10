// Array of pieces
var chessPieces = [
  'rook',
  'knight',
  'bishop',
  'king',
  'queen',
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
var _turn = 'white';

// Click Event function
var onSelect = (e) => {
  // Checking if it is a parent div
  var current = e.currentTarget;
  var isSelected = Array.from(allCheckers).filter((row) =>
    row.classList.contains('selected')
  );

  // If the selected cell is not blank
  if (current.getAttribute('name') !== '' && isSelected.length < 1) {
    if (current.classList.contains(_turn)) {
      current.classList.add('selected');
      moves(current, true);
    } else {
      window.alert(_turn + " turn to play")
    }

  } else {
    // Removing the classes from the selected pieces.
    document
      .querySelectorAll('.possible-moves ,.selected,.kill')
      .forEach((x) => {
        x.classList.remove('possible-moves', 'selected', 'kill');
      });

    // If the new position and the old position are not same
    if (isSelected.length > 0 &&
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
      winOrLose();
      moves(current, false);
      _turn = turns(_turn);
    } else {
      _turn = _turn
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
var moves = (selectedPiece, _isFinalPosition) => {
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
        allCheckers[moves].getAttribute('name') === '' && _isFinalPosition
      ) {
        allCheckers[moves + 8 * counter].classList.add('possible-moves');
      }
      // Check if there is opponent piece present
      if (
        allCheckers[moves - 1].getAttribute('name') != '' &&
        isBlack(allCheckers[moves - 1]) != _isBlack
      ) {
        if (allCheckers[moves + 1].getAttribute('name') === 'king' && !_isFinalPosition) {
          window.alert("check");
          allCheckers[moves + 1].classList.add('kill');
        } else if (_isFinalPosition) {
          allCheckers[moves + 1].classList.add('kill');
        }
      }
      if (
        allCheckers[moves + 1].getAttribute('name') != '' &&
        isBlack(allCheckers[moves + 1]) != _isBlack
      ) {
        if (allCheckers[moves + 1].getAttribute('name') === 'king' && _isFinalPosition) {
          window.alert("check");
          allCheckers[moves + 1].classList.add('kill');
        } else if (_isFinalPosition) {
          allCheckers[moves + 1].classList.add('kill');
        }
      }

      // pawn has moved
      maxMoves = 1;
      if (allCheckers[moves].getAttribute('name') === '' && _isFinalPosition)
        allCheckers[moves].classList.add('possible-moves');
      disableBoxes();
      break;

    case 'rook':
      verticalUp(currentPosition, _isBlack);
      verticalDown(currentPosition, _isBlack);
      horizontalRight(currentPosition, _isBlack);
      horizontalLeft(currentPosition, _isBlack);
      disableBoxes();
      break;

    case 'knight':
      // Forward,Backward,side Movement
      let forward_left =
        (_isBlack ? currentPosition + 16 : currentPosition - 16) - 1;
      let forward_right =
        (_isBlack ? currentPosition + 16 : currentPosition - 16) + 1;
      let bottom_left =
        (_isBlack ? currentPosition - 16 : currentPosition + 16) - 1;
      let bottom_right =
        (_isBlack ? currentPosition - 16 : currentPosition + 16) + 1;
      let right_side_up =
        (_isBlack ? currentPosition + 8 : currentPosition - 8) + 2;
      let right_side_down =
        (_isBlack ? currentPosition - 8 : currentPosition + 8) + 2;
      let left_side_up =
        (_isBlack ? currentPosition + 8 : currentPosition - 8) - 2;
      let left_side_down =
        (_isBlack ? currentPosition - 8 : currentPosition + 8) - 2;
      let _distance = currentPosition % 8;

      // if the peice is at the extreme left
      if (_distance === 0) {
        move_Kill(forward_left, _isBlack, _isFinalPosition);
        move_Kill(bottom_left, _isBlack, _isFinalPosition);
        move_Kill(left_side_up, _isBlack, _isFinalPosition);
        move_Kill(left_side_down, _isBlack, _isFinalPosition);
      }
      // if the peice is at the extreme right
      else if (_distance === 1) {
        move_Kill(forward_right, _isBlack, _isFinalPosition);
        move_Kill(bottom_right, _isBlack, _isFinalPosition);
        move_Kill(right_side_up, _isBlack, _isFinalPosition);
        move_Kill(right_side_down, _isBlack, _isFinalPosition);
      } else {
        if (forward_left > 0 && forward_left < 64)
          move_Kill(forward_left, _isBlack, _isFinalPosition);
        if (forward_right > 0 && forward_right < 64)
          move_Kill(forward_right, _isBlack, _isFinalPosition);
        if (bottom_left > 0 && bottom_left < 64)
          move_Kill(bottom_left, _isBlack, _isFinalPosition);
        if (bottom_right > 0 && bottom_right < 64)
          move_Kill(bottom_right, _isBlack, _isFinalPosition);
        if (_distance < 7) {
          if (right_side_up > 0 && right_side_up < 64) {
            move_Kill(right_side_up, _isBlack, _isFinalPosition);
          }
          if (right_side_down > 0 && right_side_down < 64) {
            move_Kill(right_side_down, _isBlack, _isFinalPosition);
          }
          if (left_side_up > 0 && left_side_up < 64 && _distance > 2) {
            move_Kill(left_side_up, _isBlack, _isFinalPosition);
          }
          if (left_side_down > 0 && left_side_down < 64 && _distance > 2) {
            move_Kill(left_side_down, _isBlack, _isFinalPosition);
          }
        }
      }
      disableBoxes();
      break;

    case 'bishop':
      diagonal(currentPosition, _isBlack, _isFinalPosition);

      disableBoxes();
      break;

    case 'queen':
      diagonal(currentPosition, _isBlack, _isFinalPosition);
      verticalUp(currentPosition, _isBlack);
      verticalDown(currentPosition, _isBlack);
      horizontalRight(currentPosition, _isBlack);
      horizontalLeft(currentPosition, _isBlack);
      disableBoxes();
      break;

    case 'king':
      let _Isblack = _isBlack ? 1 : -1;
      let forward = currentPosition + 8 * _Isblack;
      let _forward_left = currentPosition + 8 * _Isblack - 1;
      let _forward_right = currentPosition + 8 * _Isblack + 1;
      let side_left = currentPosition - _Isblack;
      let side_right = currentPosition + _Isblack;
      let backward = currentPosition + 8 * _Isblack;
      let _backward_left = currentPosition - 8 * _Isblack - 1;
      let _backward_right = currentPosition - 8 * _Isblack + 1;

      // Forward movement
      if (forward > 0 && forward < 64) {
        move_Kill(forward, _isBlack, _isFinalPosition);
      }
      // Forward Left movement
      if (_forward_left > 0 && _forward_left < 64) {
        move_Kill(_forward_left, _isBlack, _isFinalPosition);
      }
      // Forward Right movement
      if (_forward_right > 0 && _forward_right < 64) {
        move_Kill(_forward_right, _isBlack, _isFinalPosition);
      }
      // Side-ways Left movement
      if (side_left > 0 && side_left < 64) {
        move_Kill(side_left, _isBlack, _isFinalPosition);
      }
      // Side-ways Right movement
      if (side_right > 0 && side_right < 64) {
        move_Kill(side_right, _isBlack, _isFinalPosition);
      }
      // Backward movement
      if (backward > 0 && backward < 64) {
        move_Kill(backward, _isBlack, _isFinalPosition);
      }
      // Backward Left movement
      if (_backward_left > 0 && _backward_left < 64) {
        move_Kill(_backward_left, _isBlack, _isFinalPosition);
      }
      // Backward Right movement
      if (_backward_right > 0 && _backward_right < 64) {
        move_Kill(_backward_right, _isBlack, _isFinalPosition);
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
var move_Kill = (move, _isBlack, _isFinalPosition) => {

  if (_isFinalPosition) {
    if (allCheckers[move - 1].getAttribute('name') === '') {
      allCheckers[move - 1].classList.add('possible-moves');
    } else if (isBlack(allCheckers[move - 1]) != _isBlack) {
      allCheckers[move - 1].classList.add('kill');
    }
  } else {
    if (allCheckers[move - 1].getAttribute('name') === 'king' && isBlack(allCheckers[move - 1]) != _isBlack) {
      window.alert('check');
      allCheckers[move - 1].classList.add('kill');
    }
  }

};

var diagonal = (currentPosition, _isBlack, _isFinalPosition) => {
  let position_left = currentPosition % 8 === 0 ? 8 : currentPosition % 8;
  let position_right = 8 - position_left;
  let position = currentPosition;

  // Right side diagonal up
  while (position_right > 0) {
    position = _isBlack ? position + 9 : position - 7;
    if (position > 0 && position < 64) {
      if (_isFinalPosition) {
        if (
          allCheckers[position - 1].getAttribute('name') !== '' &&
          isBlack(allCheckers[position - 1]) === _isBlack
        )
          break;
        if (allCheckers[position - 1].getAttribute('name') === '') {
          allCheckers[position - 1].classList.add('possible-moves');
        } else if (isBlack(allCheckers[position - 1]) != _isBlack) {
          allCheckers[position - 1].classList.add('kill');
          break;
        }
        position_right--;
      } else {
        if (allCheckers[position - 1].getAttribute('name') === 'king' && isBlack(allCheckers[position - 1]) != _isBlack) {
          window.alert('check');
          allCheckers[position - 1].classList.add('kill');
        }
        position_right--;
      }
    } else {
      break;
    }
  }

  position = _isBlack ? currentPosition - 9 : currentPosition + 7;

  // Left side diagonal down
  while (
    position > 0 &&
    position < 64 &&
    (allCheckers[position - 1].getAttribute('name') === '' ||
      isBlack(allCheckers[position - 1]) !== _isBlack)
  ) {
    if (position % 8 === 0) {
      break;
    } else {

      if (_isFinalPosition) {
        if (allCheckers[position - 1].getAttribute('name') === '') {
          allCheckers[position - 1].classList.add('possible-moves');
        } else if (isBlack(allCheckers[position - 1]) != _isBlack) {
          allCheckers[position - 1].classList.add('kill');
          break;
        }
      } else if (allCheckers[position - 1].getAttribute('name') === 'king' && isBlack(allCheckers[position - 1]) != _isBlack) {
        window.alert('check');
        allCheckers[position - 1].classList.add('kill');
      }
      position = _isBlack ? position - 9 : position + 7;
    }
  }

  // Left side up
  position = currentPosition;
  while (position_left > 1) {
    position = _isBlack ? position + 7 : position - 9;

    if (position > 0 && position < 64) {
      if (_isFinalPosition) {
        if (
          allCheckers[position - 1].getAttribute('name') !== '' &&
          isBlack(allCheckers[position - 1]) === _isBlack
        )
          break;
        if (allCheckers[position - 1].getAttribute('name') === '') {
          allCheckers[position - 1].classList.add('possible-moves');
        } else if (isBlack(allCheckers[position - 1]) != _isBlack) {
          allCheckers[position - 1].classList.add('kill');
          break;
        }
      } else {
        if (allCheckers[position - 1].getAttribute('name') === 'king' && isBlack(allCheckers[position - 1]) != _isBlack) {
          window.alert("check");
          allCheckers[position - 1].classList.add('kill');
        }
      }

      position_left--;
    } else {
      break;
    }
  }
  position = _isBlack ? currentPosition - 7 : currentPosition + 9;

  //Right side diagonal down
  while (
    position > 0 &&
    position < 64 &&
    (allCheckers[position - 1].getAttribute('name') === '' ||
      isBlack(allCheckers[position - 1]) !== _isBlack)
  ) {
    if (_isFinalPosition) {
      if (allCheckers[position - 1].getAttribute('name') === '') {
        allCheckers[position - 1].classList.add('possible-moves');
      } else if (isBlack(allCheckers[position - 1]) != _isBlack) {
        allCheckers[position - 1].classList.add('kill');
        break;
      }
    } else {
      if (allCheckers[position - 1].getAttribute('name') === 'king' && isBlack(allCheckers[position - 1]) != _isBlack) {
        window.alert("check");
        allCheckers[position - 1].classList.add('kill');
      }
    }

    if (position % 8 === 0) {
      break;
    }
    position = _isBlack ? position - 7 : position + 9;
  }
};

// Win or Lose
var winOrLose = () => {
  var totalKings = document.querySelectorAll("div[name='king']");
  if (totalKings.length < 2) {
    window.alert((totalKings[0].classList[3]).toUpperCase() + " Wins");
    location.reload()
  }
}

// Changing  turn
var turns = (e) => {
  return e === 'white' ? 'black' : 'white'
}

// Disabling the black peices at the start of the game
(Array.from(allCheckers).filter((row) =>
  row.classList.contains('black')
)).map((row) => row.classList.add('disable-box'));
window.alert(_turn + " turn to play")