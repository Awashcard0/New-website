// I Just You For My Own, More Than You Could Ever Know, Make My Wish Come True, All I Want For Christmas Is You!!
// for proper javascript knowledge you should be listening to this playlist: https://open.spotify.com/playlist/2UvaLj0iFyLEXhKJQysYTc?si=d03e705244804068
const commands = ["help", "echo", "cls", "clear", "history"]
let history = [];
const fs = new Map();

fs.set("aboutMe.txt", "Hello! I'm Awashard0, a self-taught developer. <br> I like gaming with my friends and coding. ");

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
                    output(`<span style="color: rgb(27, 219, 153);">awash@awashpc</span>:<span style="color: rgb(61, 173, 233);">~</span>$ ` + val);
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
    const inputBox = document.getElementById('input');

    let Fullcmd = input.toLowerCase();
    let cmd = Fullcmd.split(" ")[0];

    switch (cmd) {
        // General Commands
        case "echo":
            const out = input.split(" ").slice(1).join(" ");
            output(out);
            break;
        case "help":
            output("Available Commands: " + commands.join(", "));
            break;
        case "cls":
        case "clear":
            list.innerHTML = "";
            break;
        case "history":
            output(history.map((cmdinh, index) => `${index + 1}. ${cmdinh} <br>`).join("\n"));
            break;
        // File System Commands
        case "cat":
            const file = input.split(" ").slice(1).join(" ");
            if (fs.has(file)) {
                output(fs.get(file));
            } else {
                output("cat: " + file + ": No such file or directory");
            }
            break;
        case "ls":
            output(Array.from(fs.keys()).join("&nbsp;"));
            break;
        default:
            output(input.split(" ")[0] + ": command not found");
            break;
    }
    
    inputText.style.display = "block";
    inputBox.focus();
}

function output(thing) {
    // Create a new list item
    const div = document.createElement("div");
    // Add the value to the list item
    div.innerHTML = thing;
    // Add the list item to the list
    list.appendChild(div);
    // AutoScroll to the newest added List Item
    div.scrollIntoView(false);
}