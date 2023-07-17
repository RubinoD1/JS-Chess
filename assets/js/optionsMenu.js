//DOM elements 
const optionsButton = document.getElementById("options-button"); //options button (in-game settings) 
 //options menu

//hides homepage and unhides the settings menu 
optionsButton.addEventListener("click", function(){
    settings.classList.remove("hidden"); //unhide options by removing the hidden class 
});




//event.target || share event listener with two buttons 
//if/else statement if settings hide hero / if options just unhide options menu 