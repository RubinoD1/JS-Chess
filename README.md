![Chess app banner](/assets/images/JS%20Chess%20banner.png)

GitHub repo: https://github.com/RubinoD1/JS-Chess

GitHub live page: 





## Design Notes 

### Chess board dimension basics

![Chess board layout](/assets/images/Design%20ideas/board%20layout%20reference.jpg)

- The Chess board is made up of an 8x8 grid. This grid results in 64 alternating colored squares, 32 light squares and 32 dark.

- Columns: 12 grid layout:  12 / 8 = 1.5


## Pseudocode

HTML / CSS 
1. Add pieces to the board 
- add some space between the board and the top of the screen. 
- Add a class for a currently selected piece. The CSS will either have a brighter or a darker color than that of the available move square color. 
- Add a class for available moves. Start with a bright color, most likely a light green, or blue. 

2. A white-piece and a black-piece class will be needed to differentiate the pieces, allowing for manipulation in the JS file. 
- Active and inactive classes will be needed for switching what pieces can be selected based on current game turn. 

3. A layout for a move log will eventually be needed once the game logic is sufficiently advanced.
- display current turn number.
- log moves in proper algebriac notation. 
- possibly have an indicator which piece color's turn it currently is. 


---
JavaScript  
1. 


## JS logic general ideas 

### Chess Pieces 

- Algebraic notation 

#### Selecting a piece 

- When a piece is selected, take that piece's position (ex. A2) and that piece's value (ex. Pawn) and set them to their own variables.

```
let piece = "pawn";
let boardPosition = "A2"; 
```

The board position can then be used on both the horizontal value (A) and the vertical (2). 

*** Alternative: Class wise in the HTML file instead of a whole board position being used (ex. A2), separate the position into separate classes:  

```
Class = "horizontal-position-A vertical-position-2"
```

This way, it would be easier to manipulate a specific aspect of the board position for checks.

To elaborate, if I wanted to move my pawn on A2, I have two move options (assuming there are no pieces blocking my path). Either I can move 1 space forward, or I can move two spaces forward. That would translate to a +1 to my current position, or a +2.

Therefore, I could take the vertical value and provide two choices: either to increase my vertical value by 1, or by 2. This is a simplified explanation of how movement can be worked out. 

- But what if a piece is in the way? 

Since a pawn cannot capture a piece that is directly in front of it, a piece blocking its path is an insurmountable obstacle for a pawn. Therefore, since capturing the piece is not an option, the question becomes how do I check if a piece can move to a certain square on the board? 

One possible solution to this is to give all the pieces a "chess-piece" class. The check would look at the squares within movement range and look to see if that associated square has this class present (chess-piece). If it does, do not show that as a movement option for that piece. 

Going back to the example of the A2 pawn. The A3 and A4 squares would be checked and if it is false that the class is present, then those squares will be given a class that will change the styling of that square (the color) to indicate what legal move is available for that piece. 

- Piece Indicator (Selected piece and Movement options)

Instead of allowing the user to drag the piece manually across the board, selecting a piece will highlight the selected piece and also any available legal chess moves that the piece can make. 


