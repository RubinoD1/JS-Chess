//DOM 
const chessPiece = document.getElementsByClassName("piece"); //is a chess piece 
//console.log(chessPiece);

//event listener to check if the user click is a piece
document.addEventListener('click', function handleClick(event) {
   const classCheck = event.target.classList.contains('piece');
   let clickedPiece = event.target;
if (classCheck) {
    clickedPiece.style.backgroundColor = "#008000"; //change bg color  
    console.log('Target is a chess piece');
 } else {
    console.log('Target is NOT a chess piece');
 }
});

