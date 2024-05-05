// I Just You For My Own, More Than You Could Ever Know, Make My Wish Come True, All I Want For Christmas Is You!!
// for proper javascript knowledge you should be listening to this playlist: https://open.spotify.com/playlist/2UvaLj0iFyLEXhKJQysYTc?si=d03e705244804068
const commands = ["help", "echo", "cls", "clear", "history", "neofetch", "cat", "ls"];
const info = {
    "help": "This command will list all the commands.",
    "echo": "This command will output whatever you type after it.",
    "cls": "This command will clear the screen.",
    "neofetch": "does stuff",
    "history": "fetches your command history.",
    "cat": "read files from the file system.",
    "ls": "list files from the file system."
}
let history = [];
const fs = new Map();

fs.set("aboutMe.txt", "Hello! I'm Awashard0, a self-taught developer. <br> I like gaming with my friends and coding. ");
fs.set("controls.txt", "shift+enter autocomplete commands <br>TODO: autocomplete arguments</br>");

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
                // Get the value of the textbox
                let val = inputBox.value;
                // Receive holding shift
                if (event.shiftKey) {
                    // find the closest command to the current input value
                    let closest = commands.find(cmd => cmd.startsWith(val)); // TODO: if multiple commands match, cycle through
                    // if found
                    if (closest) {
                        // replace the curent input value with the closest command
                        inputBox.value = closest;
                    } 
                } else {
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
            let helpText = "Available Commands: ";
            for (let command in info) {
                helpText += `<br>${command}: ${info[command]}</br>`;
            }
            output(helpText);
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
        // Tools
        case "neofetch":
            const ascii = asciiLogo(platform.name);
            
            let logo = `<div style="display: inline-block; vertical-align: top"><span style="color:#7F000000;"><pre>${ascii}</pre></div>`;
            logo += `<div style="display: inline-block; vertical-align: top">OS: ${platform.os}<br>Browser: ${platform.name}<br>Browser Version: ${platform.version}<br>Browser Layout: ${platform.layout}<br></div>`;
            output(logo);
            break;
        case '':
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

function asciiLogo(browser) {
    if (browser == "Firefox") {
        return `</span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span>
<span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#FFF04C;">%</span><span style="color:#FFEE4B;">%</span><span style="color:#FFEE4A;">%</span><span style="color:#FFED4A;">%</span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span>
<span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#FFE545;">%</span><span style="color:#FFE846;">%</span><span style="color:#FFE846;">%</span><span style="color:#FFEA48;">%</span><span style="color:#FFEA48;">%</span><span style="color:#FFE947;">%</span><span style="color:#FFE846;">%</span><span style="color:#FFE645;">%</span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span>
<span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7B6C2619;">,</span><span style="color:#FFA215;">(</span><span style="color:#7E000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#FFD439;">#</span><span style="color:#FFD83C;">#</span><span style="color:#FFDB3E;">%</span><span style="color:#FFDE3F;">%</span><span style="color:#FFDF40;">%</span><span style="color:#FFE142;">%</span><span style="color:#FFE443;">%</span><span style="color:#FFE443;">%</span><span style="color:#FFE343;">%</span><span style="color:#FFE142;">%</span><span style="color:#FFE043;">%</span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span>
<span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#FF7D1E;">(</span><span style="color:#FF831A;">(</span><span style="color:#FF8916;">(</span><span style="color:#FF8F13;">(</span><span style="color:#FF9911;">(</span><span style="color:#FF7B3A;">(</span><span style="color:#FF803B;">(</span><span style="color:#FF8A3C;">(</span><span style="color:#FF983B;">#</span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#AC34DB;">(</span><span style="color:#AD35DC;">(</span><span style="color:#AD35DC;">(</span><span style="color:#FFCA31;">#</span><span style="color:#FFCD34;">#</span><span style="color:#FFD037;">#</span><span style="color:#FFD439;">#</span><span style="color:#FFD63C;">#</span><span style="color:#FFD93E;">#</span><span style="color:#FFDC41;">%</span><span style="color:#FFDE44;">%</span><span style="color:#FFDD44;">%</span><span style="color:#FFDB45;">%</span><span style="color:#FFD946;">%</span><span style="color:#7F000000;"> </span><span style="color:#FFE34B;">%</span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span>
<span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#FF6C27;">(</span><span style="color:#FF7224;">(</span><span style="color:#FF7820;">(</span><span style="color:#FF7E1D;">(</span><span style="color:#FF831A;">(</span><span style="color:#FF8916;">(</span><span style="color:#FF8F13;">(</span><span style="color:#FF9612;">(</span><span style="color:#FF9E13;">(</span><span style="color:#FFA517;">(</span><span style="color:#FFAB1B;">(</span><span style="color:#FFB21F;">#</span><span style="color:#A539DE;">(</span><span style="color:#AB3DE5;">#</span><span style="color:#B03EE7;">#</span><span style="color:#B43EE8;">#</span><span style="color:#B83DE8;">#</span><span style="color:#BA3BE7;">#</span><span style="color:#B93BE6;">#</span><span style="color:#B63AE4;">#</span><span style="color:#B037DF;">(</span><span style="color:#AA33D8;">(</span><span style="color:#FFC63B;">#</span><span style="color:#FFC93D;">#</span><span style="color:#FFCD3F;">#</span><span style="color:#FFCF42;">#</span><span style="color:#FFD145;">#</span><span style="color:#FFD546;">%</span><span style="color:#FFD648;">%</span><span style="color:#FFD44A;">%</span><span style="color:#FEDD47;">%</span><span style="color:#FFE045;">%</span><span style="color:#7F000000;"> </span>
<span style="color:#7F000000;"> </span><span style="color:#FF5A31;">(</span><span style="color:#FF602E;">(</span><span style="color:#FF662B;">(</span><span style="color:#FF6C27;">(</span><span style="color:#FF7124;">(</span><span style="color:#FFA719;">(</span><span style="color:#FFAD1C;">(</span><span style="color:#FFB220;">#</span><span style="color:#FFB623;">#</span><span style="color:#FFBB26;">#</span><span style="color:#FF9013;">(</span><span style="color:#FF9812;">(</span><span style="color:#FF9F13;">(</span><span style="color:#FFA617;">(</span><span style="color:#FFAB1C;">(</span><span style="color:#FFB020;">#</span><span style="color:#F79E33;">(</span><span style="color:#A949F2;">#</span><span style="color:#AC46F0;">#</span><span style="color:#B044EF;">#</span><span style="color:#B141EC;">#</span><span style="color:#B13EE8;">#</span><span style="color:#B03AE1;">(</span><span style="color:#FFDB3D;">#</span><span style="color:#FFDA3D;">#</span><span style="color:#FFCE3E;">#</span><span style="color:#FFBC43;">#</span><span style="color:#FFBE45;">#</span><span style="color:#FFC248;">#</span><span style="color:#FFC549;">#</span><span style="color:#FFC84C;">#</span><span style="color:#FFE148;">%</span><span style="color:#FEDA46;">%</span><span style="color:#FFDC45;">%</span>
<span style="color:#7F000000;"> </span><span style="color:#FF4F38;">(</span><span style="color:#FF5435;">(</span><span style="color:#FF5932;">(</span><span style="color:#FF5F2F;">(</span><span style="color:#FF642C;">(</span><span style="color:#FF6929;">(</span><span style="color:#FFA719;">(</span><span style="color:#FFAD1C;">(</span><span style="color:#FFB120;">#</span><span style="color:#FFB623;">#</span><span style="color:#FFBA26;">#</span><span style="color:#FFBE29;">#</span><span style="color:#FFC22C;">#</span><span style="color:#8651EF;">(</span><span style="color:#8956F6;">#</span><span style="color:#8D58FB;">#</span><span style="color:#9258FE;">#</span><span style="color:#9556FC;">#</span><span style="color:#9953FA;">#</span><span style="color:#9E50F8;">#</span><span style="color:#A14DF5;">#</span><span style="color:#A348F0;">#</span><span style="color:#A341E8;">#</span><span style="color:#A239DE;">(</span><span style="color:#FFCC33;">#</span><span style="color:#FFCC33;">#</span><span style="color:#FFCC34;">#</span><span style="color:#FFA649;">#</span><span style="color:#FFAA4B;">#</span><span style="color:#FEAF4E;">#</span><span style="color:#FDB450;">#</span><span style="color:#FFDA3D;">#</span><span style="color:#FDCB49;">#</span><span style="color:#FED149;">%</span>
<span style="color:#7F000000;"> </span><span style="color:#FF443E;">(</span><span style="color:#FF493C;">(</span><span style="color:#FF4D39;">(</span><span style="color:#FF5237;">(</span><span style="color:#FF5634;">(</span><span style="color:#FF5A31;">(</span><span style="color:#FF5F2F;">(</span><span style="color:#FF642C;">(</span><span style="color:#FFAA1B;">(</span><span style="color:#6B2EB4;">/</span><span style="color:#6A33B9;">/</span><span style="color:#6B41C6;">/</span><span style="color:#6B4BD0;">(</span><span style="color:#6B55DC;">(</span><span style="color:#6D5DE5;">(</span><span style="color:#7063EC;">(</span><span style="color:#7363F1;">(</span><span style="color:#7962F5;">#</span><span style="color:#815EF7;">#</span><span style="color:#8858F7;">#</span><span style="color:#8F52F6;">#</span><span style="color:#934AEE;">(</span><span style="color:#9442E6;">(</span><span style="color:#9439DA;">(</span><span style="color:#FFBB27;">#</span><span style="color:#FFBB28;">#</span><span style="color:#FFB92E;">#</span><span style="color:#FC8B52;">#</span><span style="color:#FB9254;">#</span><span style="color:#FA9857;">#</span><span style="color:#FFC937;">#</span><span style="color:#FFCC39;">#</span><span style="color:#FCB44C;">#</span><span style="color:#FEBC4E;">#</span>
<span style="color:#7F000000;"> </span><span style="color:#E30C6D;">/</span><span style="color:#FF3D43;">(</span><span style="color:#FF4140;">(</span><span style="color:#FF453E;">(</span><span style="color:#FF493C;">(</span><span style="color:#FF4D39;">(</span><span style="color:#FF5137;">(</span><span style="color:#FF5435;">(</span><span style="color:#FF5833;">(</span><span style="color:#FFA618;">(</span><span style="color:#5A38AF;">/</span><span style="color:#5939AF;">/</span><span style="color:#5843B9;">/</span><span style="color:#574EC2;">/</span><span style="color:#5856C9;">/</span><span style="color:#5B5AD1;">(</span><span style="color:#5E5DD8;">(</span><span style="color:#655DDD;">(</span><span style="color:#6C5ADF;">(</span><span style="color:#7354E1;">(</span><span style="color:#7A4CE0;">(</span><span style="color:#8142DD;">(</span><span style="color:#8639D5;">(</span><span style="color:#8730CC;">(</span><span style="color:#FF9A2A;">(</span><span style="color:#FF9830;">(</span><span style="color:#FF9635;">(</span><span style="color:#F57061;">(</span><span style="color:#FFAD32;">#</span><span style="color:#FFB134;">#</span><span style="color:#FFB636;">#</span><span style="color:#FFB939;">#</span><span style="color:#FB9E50;">#</span><span style="color:#FDA652;">#</span>
<span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#E20D6B;">/</span><span style="color:#FE3549;">/</span><span style="color:#FF3846;">/</span><span style="color:#FF3C43;">/</span><span style="color:#FF4041;">(</span><span style="color:#FF433F;">(</span><span style="color:#FF473D;">(</span><span style="color:#FF4A3B;">(</span><span style="color:#FF4D39;">(</span><span style="color:#FF5037;">(</span><span style="color:#FF5336;">(</span><span style="color:#5939AF;">/</span><span style="color:#5939AF;">/</span><span style="color:#5939B0;">/</span><span style="color:#5840B5;">/</span><span style="color:#5845BB;">/</span><span style="color:#5948BE;">/</span><span style="color:#6045C1;">/</span><span style="color:#6640C2;">/</span><span style="color:#6D3AC1;">/</span><span style="color:#7331BF;">/</span><span style="color:#FF6D2F;">(</span><span style="color:#FF6D34;">(</span><span style="color:#FF6D39;">(</span><span style="color:#FF8530;">(</span><span style="color:#FF8A32;">(</span><span style="color:#FF9034;">(</span><span style="color:#FF9435;">(</span><span style="color:#FF9937;">#</span><span style="color:#FF9E39;">#</span><span style="color:#F88052;">(</span><span style="color:#FB8754;">#</span><span style="color:#7F000000;"> </span>
<span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#E30C6D;">/</span><span style="color:#DF0F65;">/</span><span style="color:#FC324E;">/</span><span style="color:#FD344B;">/</span><span style="color:#FF3648;">/</span><span style="color:#FF3945;">/</span><span style="color:#FF3C44;">(</span><span style="color:#FF3F42;">(</span><span style="color:#FF4140;">(</span><span style="color:#FF443F;">(</span><span style="color:#FF473D;">(</span><span style="color:#FF493C;">(</span><span style="color:#FF4B3A;">(</span><span style="color:#FF4D39;">(</span><span style="color:#FF4F38;">(</span><span style="color:#FF5137;">(</span><span style="color:#FF5236;">(</span><span style="color:#FF5336;">(</span><span style="color:#FF5535;">(</span><span style="color:#FF5534;">(</span><span style="color:#FF5634;">(</span><span style="color:#FF5934;">(</span><span style="color:#FF6035;">(</span><span style="color:#FF6636;">(</span><span style="color:#FF6C37;">(</span><span style="color:#FF7338;">(</span><span style="color:#FF783A;">(</span><span style="color:#F25755;">(</span><span style="color:#F75F57;">(</span><span style="color:#F9675B;">(</span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span>
<span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#E40D6D;">/</span><span style="color:#E00F66;">/</span><span style="color:#DA115D;">/</span><span style="color:#FA3053;">/</span><span style="color:#FB3250;">/</span><span style="color:#FC334D;">/</span><span style="color:#FE344A;">/</span><span style="color:#FF3648;">/</span><span style="color:#FF3846;">/</span><span style="color:#FF3A45;">/</span><span style="color:#FF3C44;">(</span><span style="color:#FF3E42;">(</span><span style="color:#FF3F41;">(</span><span style="color:#FF4140;">(</span><span style="color:#FF4240;">(</span><span style="color:#FF433F;">(</span><span style="color:#FF453E;">(</span><span style="color:#FF453E;">(</span><span style="color:#FF463D;">(</span><span style="color:#FF473D;">(</span><span style="color:#FF473D;">(</span><span style="color:#FF473D;">(</span><span style="color:#FF4D3E;">(</span><span style="color:#ED2C5C;">/</span><span style="color:#F2345F;">(</span><span style="color:#F53A62;">(</span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span>
<span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#E40D6D;">/</span><span style="color:#E10E68;">/</span><span style="color:#DE1063;">/</span><span style="color:#DA115D;">/</span><span style="color:#D61259;">/</span><span style="color:#F92F55;">/</span><span style="color:#FA3053;">/</span><span style="color:#FB3151;">/</span><span style="color:#FC324F;">/</span><span style="color:#FC334D;">/</span><span style="color:#FD334C;">/</span><span style="color:#FD344B;">/</span><span style="color:#FE3549;">/</span><span style="color:#FE3548;">/</span><span style="color:#FF3648;">/</span><span style="color:#DD135D;">/</span><span style="color:#E21361;">/</span><span style="color:#E51365;">/</span><span style="color:#E81169;">/</span><span style="color:#EA0F6E;">/</span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span>
<span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#E50B70;">/</span><span style="color:#E30C6E;">/</span><span style="color:#E40D6D;">/</span><span style="color:#E30D6C;">/</span><span style="color:#E40D6C;">/</span><span style="color:#E40D6D;">/</span><span style="color:#E40C6D;">/</span><span style="color:#E40C6E;">/</span><span style="color:#E50B71;">/</span><span style="color:#E60A73;">/</span><span style="color:#E60875;">/</span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span>`
    } 
}