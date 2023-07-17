//DOM elements 
const homepage = document.getElementById("homepage"); //homepage 
const settings = document.getElementById("settings"); //settings menu
const settingsButton = document.getElementById("settings-button"); //settings button

//hides homepage and unhides the settings menu 
settingsButton.addEventListener("click", function(){
    homepage.classList.add("hidden"); //add hidden class to hero (start screen)
    settings.classList.remove("hidden"); //unhide settings by removing the hidden class 
});