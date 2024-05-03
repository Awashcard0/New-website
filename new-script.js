// I Just You For My Own, More Than You Could Ever Know, Make My Wish Come True, All I Want For Christmas Is You!!
// for proper javascript knowledge you should be listening to this playlist: https://open.spotify.com/playlist/2UvaLj0iFyLEXhKJQysYTc?si=d03e705244804068
const commands = ["help, echo"]
let history = [];

document.addEventListener("DOMContentLoaded", function() {
    // Get the varibles
    const list = document.getElementById('list');
    const inputBox = document.getElementById('input');
    const inputText = document.querySelector(".inputForTerm");
    
    document.addEventListener("click", function(event) {
        event.preventDefault();
        inputBox.focus();
    });

    inputBox.addEventListener("keypress", function(event) {
            // If the user presses the "Enter" key on the keyboard
            if (event.key === "Enter") {
                event.preventDefault();
                // If the input is not empty
                if (inputBox.value) {
                    let val = inputBox.value;
                    // Add the input value to the list item
                    output("awash@awashpc:$ " + val);
                    // Clear the input
                    inputBox.value = "";
                    // Hide the input to let the command run
                    inputText.style.display = "none";
                    // Check the command
                    checkCommand(val);
                    // Add the command to the history
                    history.push(val);

                }
            }
        }
    );
});

function checkCommand(input) {
    const inputText = document.querySelector(".inputForTerm");

    console.log(input);
    switch (input) {
        case "echo":
            output("Available Commands: " + commands.join(", "));
            break;
        case "help":
            output("Available Commands: " + commands.join(", "));
            break;
        case "cls":
            list.innerHTML = "";
            break;
        default:
            output(input + ": command not found");

            break;
    }
    
    inputText.style.display = "block";
    input.focus();
}

function output(thing) {
    // Create a new list item
    const div = document.createElement("div");
    // Add the value to the list item
    div.innerText = thing;
    // Add the list item to the list
    list.appendChild(div);
    // AutoScroll to the newest added List Item
    div.scrollIntoView(false);
}