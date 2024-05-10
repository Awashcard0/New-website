// I Just You For My Own, More Than You Could Ever Know, Make My Wish Come True, All I Want For Christmas Is You!!
// for proper javascript knowledge you should be listening to this playlist: https://open.spotify.com/playlist/2UvaLj0iFyLEXhKJQysYTc?si=d03e705244804068
const commands = ["help", "echo", "cls", "clear", "history", "neofetch", "fastfetch", "myfetch", "cat", "ls"];
const info = {
    "help": "This command will list all the commands.",
    "echo": "This command will output whatever you type after it.",
    "cls": "This command will clear the screen.",
    "neofetch": "does stuff",
    "myfetch": "My neofetches",
    "history": "fetches your command history.",
    "cat": "read files from the file system.",
    "ls": "list files from the file system."
}
let history = [];
const fs = new Map();

fs.set("aboutMe.txt", "Hello! I'm Awashard0, a self-taught developer. <br> I like gaming with my friends and coding. ");
fs.set("myStuff.txt", `Type "myfetch" to see what I use. `);
fs.set("controls.txt", "tab autocomplete commands and files <br>TODO: autocomplete arguments</br>");

let tabMatches
let tabIndex

document.addEventListener("DOMContentLoaded", function() {
    // Get the varibles
    const list = document.getElementById('list');
    const inputBox = document.getElementById('input');
    const inputText = document.querySelector(".inputForTerm");
    
    document.addEventListener("click", function(event) {
        inputBox.focus();
    });
    

    inputBox.addEventListener("keydown", function (event) {
        // Get the value of the textbox
        let val = inputBox.value;
        
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            event.preventDefault();
            // If the input is not empty
            if (inputBox.value) {
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
            } else {
                // Add the input value to the list item
                output(`<span style="color: rgb(27, 219, 153);">awash@awashpc</span>:<span style="color: rgb(61, 173, 233);">~</span>$ `);
            }
        } else if (event.key === "Tab") {
            event.preventDefault();
            let Fullcmd = val.toLowerCase();
            let cmdN = Fullcmd.split(" ")[0];
            // find the closest command to the current input value
            if (cmdN === "cat") {
                tabMatches = Array.from(fs.keys()).filter(cmd => cmd.startsWith(Fullcmd.split(" ")[1]));
                tabIndex = history.indexOf(Fullcmd.split(" ")[1]);
                if (tabMatches.length > 0) {
                    if (tabIndex === -1 || tabIndex >= tabMatches.length - 1) {
                        inputBox.value = "cat " + tabMatches[0];
                    } else {
                        inputBox.value = "cat " + tabMatches[index + 1];
                    }
                }
            } else {
                tabMatches = commands.filter(cmd => cmd.startsWith(val));
                tabIndex = history.indexOf(val);
                if (tabMatches.length > 0) {
                    if (tabIndex === -1 || tabIndex >= tabMatches.length - 1) {
                        inputBox.value = tabMatches[0] + " ";
                    } else {
                        inputBox.value = tabMatches[index + 1] + " ";
                    }
                }
            };
        }  
    });
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
        case "fastfetch":
            const ascii = asciiLogo(platform.name);
            
            let fetch = `<div style="display: inline-block; vertical-align: top"><span style="color:#7F000000;"><pre>${ascii}</pre></div>`;
            fetch += `<div style="display: inline-block; vertical-align: top">OS: ${platform.os}<br>Browser: ${platform.name}<br>Browser Version: ${platform.version}<br>Browser Layout: ${platform.layout}<br></div>`;
            output(fetch);
            break;
        case "myfetch":
            const arg = input.split(" ")[1].toLowerCase();
            
            if (arg == "-l" || arg == "--laptop") {
                // Laptop
                const ascii = asciiLogo("NEON");
                let fetch = `<div style="display: inline-block; vertical-align: top"><span style="color:#7F000000;"><pre>${ascii}</pre></div>`;
                fetch += `<div style="display: inline-block; vertical-align: top">&nbsp;&nbsp;</div>`;
                fetch += `<div style="display: inline-block; vertical-align: top">awash@Aspire-A515-43 <br>
-------------------- <br>
OS: KDE neon 6.0 x86_64 <br>
Host: Aspire A515-43 V1.12 <br>
Kernel: 6.5.0-28-generic <br>
Packages: 2095 (dpkg), 16 (flatpak) <br>
Shell: bash 5.1.16 <br>
Resolution: 1920x1080 <br>
DE: Plasma 6.0.4 <br>
WM: kwin <br>
Theme: Breeze-Dark [GTK2], Breeze [GTK3] <br>
Icons: breeze-dark [GTK2/3] <br>
Terminal: yakuake <br>
CPU: AMD Ryzen 3 3200U with Radeon Vega Mobile Gfx (4) @ 2.600GHz <br>
GPU: AMD ATI Radeon Vega Series / Radeon Vega Mobile Series <br>
Memory: 3264MiB / 13903MiB <br><br> (As of May 9, 2024)</div>`;
                output(fetch);
            } else if (arg === "-d" || arg === "--desktop") {
                // Desktop
            } else {
                output("myfetch: invalid argument<br><br>Usage: myfetch [option]<br><br>Options:\n-l, --laptop\t\tShow laptop setup\n-d, --desktop\t\tShow desktop setup");
            }
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
    const scroll = document.getElementById("scroll");

    // Create a new list item
    const div = document.createElement("div");
    // Add the value to the list item
    div.innerHTML = thing;
    // Add the list item to the list
    list.appendChild(div);
    // AutoScroll to the newest added List Item
    scroll.scrollIntoView(false);
}

function asciiLogo(logo) {
    if (logo == "Firefox") {
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
    } else if (logo == "Chrome") {
        return `<span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#1AD93025;">*</span><span style="color:#22D93025;">*</span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><br><span style="color:#7F000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#DB3327;">/</span><span style="color:#DA3327;">/</span><span style="color:#DA3227;">/</span><span style="color:#DA3227;">/</span><span style="color:#D93226;">*</span><span style="color:#D93126;">*</span><span style="color:#D93126;">*</span><span style="color:#D93126;">*</span><span style="color:#D83125;">*</span><span style="color:#D83025;">*</span><span style="color:#D83025;">*</span><span style="color:#D83024;">*</span><span style="color:#D72F24;">*</span><span style="color:#D72F24;">*</span><span style="color:#D72F24;">*</span><span style="color:#D72F24;">*</span><span style="color:#D72F24;">*</span><span style="color:#D72F24;">*</span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><br><span style="color:#7F000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#DD3529;">/</span><span style="color:#DC3529;">/</span><span style="color:#DC3529;">/</span><span style="color:#DC3429;">/</span><span style="color:#DC3428;">/</span><span style="color:#DB3428;">/</span><span style="color:#DB3328;">/</span><span style="color:#DB3327;">/</span><span style="color:#DA3327;">/</span><span style="color:#DA3327;">/</span><span style="color:#DA3227;">/</span><span style="color:#DA3226;">*</span><span style="color:#D93226;">*</span><span style="color:#D93126;">*</span><span style="color:#D93126;">*</span><span style="color:#D83125;">*</span><span style="color:#D83025;">*</span><span style="color:#D83025;">*</span><span style="color:#D83025;">*</span><span style="color:#D72F24;">*</span><span style="color:#D72F24;">*</span><span style="color:#D72F24;">*</span><span style="color:#D72F24;">*</span><span style="color:#D72F24;">*</span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><br><span style="color:#7F000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#DE372B;">/</span><span style="color:#DE372B;">/</span><span style="color:#DE372A;">/</span><span style="color:#DE362A;">/</span><span style="color:#DD362A;">/</span><span style="color:#DD362A;">/</span><span style="color:#DD3529;">/</span><span style="color:#DC3529;">/</span><span style="color:#DC3529;">/</span><span style="color:#DC3429;">/</span><span style="color:#DC3428;">/</span><span style="color:#DB3428;">/</span><span style="color:#DB3428;">/</span><span style="color:#DB3328;">/</span><span style="color:#DB3327;">/</span><span style="color:#DA3327;">/</span><span style="color:#DA3227;">/</span><span style="color:#DA3227;">/</span><span style="color:#D93226;">*</span><span style="color:#D93126;">*</span><span style="color:#D93126;">*</span><span style="color:#D93125;">*</span><span style="color:#D83025;">*</span><span style="color:#D83025;">*</span><span style="color:#D83025;">*</span><span style="color:#D72F24;">*</span><span style="color:#D72F24;">*</span><span style="color:#D72F24;">*</span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><br><span style="color:#7F000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#32A551;">*</span><span style="color:#32A551;">*</span><span style="color:#E0392C;">/</span><span style="color:#DF382C;">/</span><span style="color:#DF382C;">/</span><span style="color:#DF382B;">/</span><span style="color:#DF372B;">/</span><span style="color:#DE372B;">/</span><span style="color:#DE372B;">/</span><span style="color:#DE362A;">/</span><span style="color:#DD362A;">/</span><span style="color:#4FBF5F5;">@</span><span style="color:#FDFDFD;">@</span><span style="color:#FDFDFD;">@</span><span style="color:#FDFDFD;">@</span><span style="color:#FDFDFD;">@</span><span style="color:#FDFDFD;">@</span><span style="color:#FDFDFD;">@</span><span style="color:#FDFDFD;">@</span><span style="color:#FDFDFD;">@</span><span style="color:#AFCF3D8;">@</span><span style="color:#FAC222;">#</span><span style="color:#FAC324;">#</span><span style="color:#FAC325;">#</span><span style="color:#FAC427;">#</span><span style="color:#FAC429;">#</span><span style="color:#FAC52A;">#</span><span style="color:#FAC52C;">#</span><span style="color:#FAC52D;">#</span><span style="color:#FAC62F;">#</span><span style="color:#FCC831;">#</span><span style="color:#FAC732;">#</span><span style="color:#7E000000;"> </span><br><span style="color:#7F000000;"> </span><span style="color:#31A450;">*</span><span style="color:#31A350;">*</span><span style="color:#30A350;">*</span><span style="color:#30A34F;">*</span><span style="color:#E13A2D;">/</span><span style="color:#E0392D;">/</span><span style="color:#E0392C;">/</span><span style="color:#E0392C;">/</span><span style="color:#DF382C;">/</span><span style="color:#DF382C;">/</span><span style="color:#FDFDFD;">@</span><span style="color:#FDFDFD;">@</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#FDFDFD;">@</span><span style="color:#FDFDFD;">@</span><span style="color:#FAC325;">#</span><span style="color:#FAC427;">#</span><span style="color:#FAC429;">#</span><span style="color:#FAC52A;">#</span><span style="color:#FAC52C;">#</span><span style="color:#FAC52D;">#</span><span style="color:#FAC62F;">#</span><span style="color:#FAC630;">#</span><span style="color:#FAC732;">#</span><span style="color:#FAC733;">#</span><br><span style="color:#7F000000;"> </span><span style="color:#30A24F;">*</span><span style="color:#2FA24E;">*</span><span style="color:#2FA14E;">*</span><span style="color:#2EA14E;">*</span><span style="color:#2EA04D;">*</span><span style="color:#E23B2E;">/</span><span style="color:#E13A2E;">/</span><span style="color:#E13A2D;">/</span><span style="color:#E13A2D;">/</span><span style="color:#FDFDFD;">@</span><span style="color:#E6EFFA;">@</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#FCFCFC;">@</span><span style="color:#FDFDFD;">@</span><span style="color:#FAC427;">#</span><span style="color:#FAC429;">#</span><span style="color:#FAC52A;">#</span><span style="color:#FAC52C;">#</span><span style="color:#FAC52D;">#</span><span style="color:#FAC62F;">#</span><span style="color:#FAC630;">#</span><span style="color:#FAC732;">#</span><span style="color:#FAC733;">#</span><br><span style="color:#52FA24F;">*</span><span style="color:#2EA04D;">*</span><span style="color:#2EA04D;">*</span><span style="color:#2D9F4D;">*</span><span style="color:#2D9F4C;">*</span><span style="color:#2D9E4C;">*</span><span style="color:#2C9E4B;">*</span><span style="color:#2C9D4B;">*</span><span style="color:#E23B2F;">/</span><span style="color:#FDFDFD;">@</span><span style="color:#FDFDFD;">@</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#FDFDFD;">@</span><span style="color:#FDFDFD;">@</span><span style="color:#FAC429;">#</span><span style="color:#FAC52A;">#</span><span style="color:#FAC52C;">#</span><span style="color:#FAC52D;">#</span><span style="color:#FAC62F;">#</span><span style="color:#FAC630;">#</span><span style="color:#FAC732;">#</span><span style="color:#FAC733;">#</span><br><span style="color:#7F000000;"> </span><span style="color:#2C9E4C;">*</span><span style="color:#2C9E4B;">*</span><span style="color:#2C9D4B;">*</span><span style="color:#2B9D4B;">*</span><span style="color:#2B9C4A;">*</span><span style="color:#2B9C4A;">*</span><span style="color:#2A9C4A;">*</span><span style="color:#2A9B49;">*</span><span style="color:#E33D2F;">/</span><span style="color:#FDFDFD;">@</span><span style="color:#F3F7FC;">@</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1A73E8;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#FDFDFD;">@</span><span style="color:#FDFDFD;">@</span><span style="color:#FAC427;">#</span><span style="color:#FAC429;">#</span><span style="color:#FAC52A;">#</span><span style="color:#FAC52C;">#</span><span style="color:#FAC52D;">#</span><span style="color:#FAC62F;">#</span><span style="color:#FCC831;">#</span><span style="color:#FAC732;">#</span><span style="color:#FAC733;">#</span><br><span style="color:#7F000000;"> </span><span style="color:#2B9C4A;">*</span><span style="color:#2A9C4A;">*</span><span style="color:#2A9B4A;">*</span><span style="color:#2A9B49;">*</span><span style="color:#299B49;">*</span><span style="color:#299A48;">*</span><span style="color:#299A48;">*</span><span style="color:#289948;">*</span><span style="color:#289947;">*</span><span style="color:#289847;">*</span><span style="color:#FDFDFD;">@</span><span style="color:#FDFDFD;">@</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#1972E6;">/</span><span style="color:#FDFDFD;">@</span><span style="color:#FDFDFD;">@</span><span style="color:#FAC325;">#</span><span style="color:#FAC427;">#</span><span style="color:#FAC429;">#</span><span style="color:#FAC52A;">#</span><span style="color:#FAC52C;">#</span><span style="color:#FAC52D;">#</span><span style="color:#FAC62F;">#</span><span style="color:#FAC630;">#</span><span style="color:#FAC732;">#</span><span style="color:#FAC733;">#</span><br><span style="color:#7F000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#299A48;">*</span><span style="color:#299A48;">*</span><span style="color:#289948;">*</span><span style="color:#289947;">*</span><span style="color:#279847;">*</span><span style="color:#279847;">*</span><span style="color:#279746;">*</span><span style="color:#269746;">*</span><span style="color:#269746;">*</span><span style="color:#269645;">*</span><span style="color:#259645;">*</span><span style="color:#18B7DBC2;">%</span><span style="color:#FDFDFD;">@</span><span style="color:#FDFDFD;">@</span><span style="color:#FDFDFD;">@</span><span style="color:#FDFDFD;">@</span><span style="color:#FDFDFD;">@</span><span style="color:#FDFDFD;">@</span><span style="color:#FDFDFD;">@</span><span style="color:#FDFDFD;">@</span><span style="color:#D46A360;">/</span><span style="color:#219141;">*</span><span style="color:#FAC324;">#</span><span style="color:#FAC325;">#</span><span style="color:#FAC427;">#</span><span style="color:#FAC429;">#</span><span style="color:#FAC52A;">#</span><span style="color:#FAC52C;">#</span><span style="color:#FAC52D;">#</span><span style="color:#FAC62F;">#</span><span style="color:#FAC630;">#</span><span style="color:#FAC732;">#</span><span style="color:#7E000000;"> </span><br><span style="color:#7F000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#279746;">*</span><span style="color:#269746;">*</span><span style="color:#269645;">*</span><span style="color:#269645;">*</span><span style="color:#259645;">*</span><span style="color:#259544;">*</span><span style="color:#249544;">*</span><span style="color:#249444;">*</span><span style="color:#249443;">*</span><span style="color:#239443;">*</span><span style="color:#239343;">*</span><span style="color:#239342;">*</span><span style="color:#229242;">*</span><span style="color:#229242;">*</span><span style="color:#229141;">*</span><span style="color:#219141;">*</span><span style="color:#219041;">*</span><span style="color:#209040;">*</span><span style="color:#FAC221;">#</span><span style="color:#FAC222;">#</span><span style="color:#FAC324;">#</span><span style="color:#FAC325;">#</span><span style="color:#FAC427;">#</span><span style="color:#FAC429;">#</span><span style="color:#FAC52A;">#</span><span style="color:#FAC52C;">#</span><span style="color:#FAC52D;">#</span><span style="color:#FAC62F;">#</span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><br><span style="color:#7F000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#249544;">*</span><span style="color:#249444;">*</span><span style="color:#249443;">*</span><span style="color:#239343;">*</span><span style="color:#239343;">*</span><span style="color:#239342;">*</span><span style="color:#229242;">*</span><span style="color:#229242;">*</span><span style="color:#219141;">*</span><span style="color:#219141;">*</span><span style="color:#219041;">*</span><span style="color:#209040;">*</span><span style="color:#208F40;">*</span><span style="color:#208F3F;">*</span><span style="color:#1F8F3F;">*</span><span style="color:#FAC21F;">#</span><span style="color:#FAC221;">#</span><span style="color:#FAC222;">#</span><span style="color:#FAC324;">#</span><span style="color:#FAC325;">#</span><span style="color:#FAC427;">#</span><span style="color:#FAC429;">#</span><span style="color:#FAC52A;">#</span><span style="color:#FAC52C;">#</span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><br><span style="color:#7F000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#229241;">*</span><span style="color:#219141;">*</span><span style="color:#219141;">*</span><span style="color:#219040;">*</span><span style="color:#209040;">*</span><span style="color:#208F40;">*</span><span style="color:#1F8F3F;">*</span><span style="color:#1F8E3F;">*</span><span style="color:#1F8E3F;">*</span><span style="color:#1E8E3E;">*</span><span style="color:#FAC11C;">#</span><span style="color:#FAC11D;">#</span><span style="color:#FAC21F;">#</span><span style="color:#FAC221;">#</span><span style="color:#FAC222;">#</span><span style="color:#FAC324;">#</span><span style="color:#FAC325;">#</span><span style="color:#FAC427;">#</span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span>`
    } else if (logo == "Safari") {
        return `<span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> 
</span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;">
</span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;">
</span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;">
</span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;">
</span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span
    style="color:#65CCCCCC;">&amp;</span><span style="color:#5BCECECE;">&amp;</span><span style="color:#7F000000;">
</span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;">
</span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;">
</span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;">
</span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;">
</span><span style="color:#7F000000;"> </span><span style="color:#7F000000;"> </span><span style="color:#7F000000;">
</span><br><span style="color:#7F000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;">
</span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;">
</span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;">
</span><span style="color:#F8F8F8;">@</span><span style="color:#F8F8F8;">@</span><span
    style="color:#F8F8F8;">@</span><span style="color:#1B83F2;">(</span><span style="color:#1D83F5;">(</span><span
    style="color:#1E84F7;">(</span><span style="color:#1D87F6;">(</span><span style="color:#F2F0F1;">@</span><span
    style="color:#1C89F6;">(</span><span style="color:#1C89F6;">(</span><span style="color:#F2F0F1;">@</span><span
    style="color:#1D87F6;">(</span><span style="color:#1E85F7;">(</span><span style="color:#1D84F5;">(</span><span
    style="color:#1C83F3;">(</span><span style="color:#F8F8F8;">@</span><span style="color:#F8F8F8;">@</span><span
    style="color:#F8F8F8;">@</span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span
    style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span
    style="color:#7F000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;">
</span><br><span style="color:#7F000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;">
</span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;">
</span><span style="color:#F3F3F3;">@</span><span style="color:#F3F3F3;">@</span><span
    style="color:#1A82F0;">(</span><span style="color:#F2F0F1;">@</span><span style="color:#1D88F6;">(</span><span
    style="color:#F2F0F1;">@</span><span style="color:#1993F4;">(</span><span style="color:#1897F3;">(</span><span
    style="color:#179BF2;">(</span><span style="color:#F2F0F1;">@</span><span style="color:#16A2F3;">(</span><span
    style="color:#15A1F1;">(</span><span style="color:#15A1F1;">(</span><span style="color:#15A0F1;">(</span><span
    style="color:#F2F0F1;">@</span><span style="color:#169CF2;">(</span><span style="color:#1898F3;">(</span><span
    style="color:#1993F4;">(</span><span style="color:#BED9F1;">&amp;</span><span style="color:#1D89F6;">(</span><span
    style="color:#F2F0F1;">@</span><span style="color:#1B82F1;">(</span><span style="color:#F3F3F3;">@</span><span
    style="color:#F3F3F3;">@</span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span
    style="color:#7F000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;">
</span><br><span style="color:#7F000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;">
</span><span style="color:#7E000000;"> </span><span style="color:#EEEEEE;">@</span><span
    style="color:#EEEEEE;">@</span><span style="color:#1A82F0;">(</span><span style="color:#2A8BF5;">(</span><span
    style="color:#1C8AF6;">(</span><span style="color:#1A92F4;">(</span><span style="color:#1799F3;">(</span><span
    style="color:#15A0F1;">(</span><span style="color:#13A6F0;">(</span><span style="color:#11ACEF;">(</span><span
    style="color:#10ADEE;">(</span><span style="color:#10AEEE;">(</span><span style="color:#10AFEE;">(</span><span
    style="color:#0FAFED;">(</span><span style="color:#0FAFED;">(</span><span style="color:#10AFEE;">(</span><span
    style="color:#10AEEE;">(</span><span style="color:#10ADEE;">(</span><span style="color:#11ACEF;">(</span><span
    style="color:#13A7F0;">(</span><span style="color:#15A1F1;">(</span><span style="color:#179AF3;">(</span><span
    style="color:#1993F4;">(</span><span style="color:#FD504F;">(</span><span style="color:#F1EFF0;">@</span><span
    style="color:#1B82F1;">(</span><span style="color:#EEEEEE;">@</span><span style="color:#EEEEEE;">@</span><span
    style="color:#7F000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;">
</span><br><span style="color:#7F000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;">
</span><span style="color:#E9E9E9;">@</span><span style="color:#1780EB;">(</span><span
    style="color:#1B82F1;">(</span><span style="color:#F2F0F1;">@</span><span style="color:#1B8DF5;">(</span><span
    style="color:#1998F5;">(</span><span style="color:#159FF2;">(</span><span style="color:#13A7F0;">(</span><span
    style="color:#11ADEF;">(</span><span style="color:#10AFEE;">(</span><span style="color:#0FB1ED;">(</span><span
    style="color:#0EB2EC;">(</span><span style="color:#0DB4EB;">(</span><span style="color:#0EB7ED;">(</span><span
    style="color:#0CB5EA;">(</span><span style="color:#0CB5EA;">(</span><span style="color:#0DB5EB;">(</span><span
    style="color:#0DB4EB;">(</span><span style="color:#0EB3EC;">(</span><span style="color:#0FB1ED;">(</span><span
    style="color:#FD504F;">(</span><span style="color:#FF5150;">(</span><span style="color:#BF3C3C;">/</span><span
    style="color:#0E6CA1;">*</span><span style="color:#1898F3;">(</span><span style="color:#1A8FF5;">(</span><span
    style="color:#F2F0F1;">@</span><span style="color:#1B82F2;">(</span><span style="color:#1880EC;">(</span><span
    style="color:#EBEBEB;">@</span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><br><span
    style="color:#7F000000;"> </span><span style="color:#7E000000;"> </span><span
    style="color:#E4E4E4;">&amp;</span><span style="color:#167FE8;">/</span><span
    style="color:#ABCCF0;">&amp;</span><span style="color:#F2F0F1;">@</span><span style="color:#1C8BF6;">(</span><span
    style="color:#1994F4;">(</span><span style="color:#169EF2;">(</span><span style="color:#13A7F0;">(</span><span
    style="color:#10ADEE;">(</span><span style="color:#0FAFED;">(</span><span style="color:#0EB2EC;">(</span><span
    style="color:#0DB4EB;">(</span><span style="color:#0CB6EA;">(</span><span style="color:#0AB8E9;">(</span><span
    style="color:#09BAE8;">(</span><span style="color:#08BBE7;">(</span><span style="color:#08BBE7;">(</span><span
    style="color:#09B9E7;">(</span><span style="color:#FD504F;">(</span><span style="color:#FD504F;">(</span><span
    style="color:#BF3C3C;">/</span><span style="color:#BF3C3C;">/</span><span style="color:#0A749C;">*</span><span
    style="color:#10AEEE;">(</span><span style="color:#12A9F0;">(</span><span style="color:#159FF1;">(</span><span
    style="color:#1896F3;">(</span><span style="color:#1B8DF5;">(</span><span style="color:#F2F0F1;">@</span><span
    style="color:#F2F0F1;">@</span><span style="color:#1781EB;">(</span><span style="color:#E4E4E4;">&amp;</span><span
    style="color:#7E000000;"> </span><br><span style="color:#7F000000;"> </span><span
    style="color:#7CACACA;">%</span><span style="color:#DFDFDF;">&amp;</span><span style="color:#167FE8;">/</span><span
    style="color:#1A82EF;">(</span><span style="color:#1D84F6;">(</span><span style="color:#1B8CF5;">(</span><span
    style="color:#1896F3;">(</span><span style="color:#159FF1;">(</span><span style="color:#12A9F0;">(</span><span
    style="color:#10AEEE;">(</span><span style="color:#0FB0ED;">(</span><span style="color:#0EB2EC;">(</span><span
    style="color:#0DB5EB;">(</span><span style="color:#0BB7E9;">(</span><span style="color:#09BAE8;">(</span><span
    style="color:#FF5150;">(</span><span style="color:#FD504F;">(</span><span style="color:#FD504F;">(</span><span
    style="color:#FD504F;">(</span><span style="color:#BF3C3C;">/</span><span style="color:#BF3C3C;">/</span><span
    style="color:#077598;">*</span><span style="color:#0EB3EC;">(</span><span style="color:#0FB1ED;">(</span><span
    style="color:#10AEEE;">(</span><span style="color:#11ABEF;">(</span><span style="color:#15A1F1;">(</span><span
    style="color:#1898F3;">(</span><span style="color:#1B8EF5;">(</span><span style="color:#1E84F7;">(</span><span
    style="color:#1B82F0;">(</span><span style="color:#1882EC;">(</span><span style="color:#DFDFDF;">&amp;</span><span
    style="color:#DEDEDE;">&amp;</span><br><span style="color:#7F000000;"> </span><span
    style="color:#DADADA;">&amp;</span><span style="color:#DADADA;">&amp;</span><span
    style="color:#157FE6;">/</span><span style="color:#1981ED;">(</span><span style="color:#1C83F4;">(</span><span
    style="color:#1D89F6;">(</span><span style="color:#1A92F4;">(</span><span style="color:#179BF2;">(</span><span
    style="color:#14A4F1;">(</span><span style="color:#11ACEF;">(</span><span style="color:#10AFEE;">(</span><span
    style="color:#0FB1ED;">(</span><span style="color:#0EB3EC;">(</span><span style="color:#EFEFEF;">@</span><span
    style="color:#EFEFEF;">@</span><span style="color:#EFEFEF;">@</span><span style="color:#B4B4B4;">%</span><span
    style="color:#B4B4B4;">%</span><span style="color:#BF3C3C;">/</span><span style="color:#BF3C3C;">/</span><span
    style="color:#0DB5EA;">(</span><span style="color:#0DB3EB;">(</span><span style="color:#0EB1EC;">(</span><span
    style="color:#10AFEE;">(</span><span style="color:#11ADEF;">(</span><span style="color:#13A6F0;">(</span><span
    style="color:#169DF2;">(</span><span style="color:#1994F4;">(</span><span style="color:#1C8AF6;">(</span><span
    style="color:#1D83F5;">(</span><span style="color:#1981EE;">(</span><span style="color:#1781EA;">(</span><span
    style="color:#DADADA;">&amp;</span><span style="color:#DADADA;">&amp;</span><br><span style="color:#7F000000;">
</span><span style="color:#74000000;"> </span><span style="color:#D5D5D5;">&amp;</span><span
    style="color:#137EE2;">/</span><span style="color:#1781EA;">(</span><span style="color:#1981EE;">(</span><span
    style="color:#1D83F4;">(</span><span style="color:#1C89F6;">(</span><span style="color:#1B93F6;">(</span><span
    style="color:#179AF3;">(</span><span style="color:#14A2F1;">(</span><span style="color:#12A9F0;">(</span><span
    style="color:#F1F1F1;">@</span><span style="color:#EFEFEF;">@</span><span style="color:#EFEFEF;">@</span><span
    style="color:#B4B4B4;">%</span><span style="color:#B6B6B6;">%</span><span style="color:#B4B4B4;">%</span><span
    style="color:#0EAEE5;">(</span><span style="color:#0EB2EC;">(</span><span style="color:#0FB3EE;">(</span><span
    style="color:#0FB0ED;">(</span><span style="color:#10AFEE;">(</span><span style="color:#10ADEE;">(</span><span
    style="color:#12ACF1;">(</span><span style="color:#14A3F1;">(</span><span style="color:#179BF2;">(</span><span
    style="color:#1993F4;">(</span><span style="color:#1D8CF8;">(</span><span style="color:#1D84F5;">(</span><span
    style="color:#1A82EF;">(</span><span style="color:#1780E9;">(</span><span style="color:#1480E5;">/</span><span
    style="color:#D5D5D5;">&amp;</span><span style="color:#73000000;"> </span><br><span style="color:#7F000000;">
</span><span style="color:#7C000000;"> </span><span style="color:#D0D0D0;">&amp;</span><span
    style="color:#D0D0D0;">&amp;</span><span style="color:#127EE1;">/</span><span style="color:#F2F0F1;">@</span><span
    style="color:#1880EC;">(</span><span style="color:#1B82F1;">(</span><span style="color:#1E84F7;">(</span><span
    style="color:#1C8BF6;">(</span><span style="color:#1A92F4;">(</span><span style="color:#EFEFEF;">@</span><span
    style="color:#B4B4B4;">%</span><span style="color:#B4B4B4;">%</span><span style="color:#0D75A8;">*</span><span
    style="color:#11ABEF;">(</span><span style="color:#11ACEF;">(</span><span style="color:#11ADEF;">(</span><span
    style="color:#11ADEF;">(</span><span style="color:#11ACEF;">(</span><span style="color:#11ABEF;">(</span><span
    style="color:#12A8F0;">(</span><span style="color:#14A4F1;">(</span><span style="color:#159FF2;">(</span><span
    style="color:#1799F3;">(</span><span style="color:#1993F4;">(</span><span style="color:#1B8CF5;">(</span><span
    style="color:#1E85F7;">(</span><span style="color:#4799F1;">#</span><span style="color:#1981ED;">(</span><span
    style="color:#F2F0F1;">@</span><span style="color:#137EE2;">/</span><span style="color:#D2D2D2;">&amp;</span><span
    style="color:#D0D0D0;">&amp;</span><span style="color:#7C000000;"> </span><br><span style="color:#7F000000;">
</span><span style="color:#7E000000;"> </span><span style="color:#7C000000;"> </span><span style="color:#65000000;">
</span><span style="color:#CCCCCC;">&amp;</span><span style="color:#107CDC;">/</span><span
    style="color:#F2F0F1;">@</span><span style="color:#157FE6;">/</span><span style="color:#B9D2EF;">&amp;</span><span
    style="color:#B4B4B4;">%</span><span style="color:#104E90;">*</span><span style="color:#1B76DB;">/</span><span
    style="color:#1C89F6;">(</span><span style="color:#1B8EF5;">(</span><span style="color:#1A91F4;">(</span><span
    style="color:#1994F4;">(</span><span style="color:#1998F5;">(</span><span style="color:#1897F3;">(</span><span
    style="color:#1897F3;">(</span><span style="color:#1896F3;">(</span><span style="color:#1994F4;">(</span><span
    style="color:#1A92F4;">(</span><span style="color:#1B8EF5;">(</span><span style="color:#1C8AF6;">(</span><span
    style="color:#1E86F7;">(</span><span style="color:#1D83F4;">(</span><span style="color:#1A82F0;">(</span><span
    style="color:#F2F0F1;">@</span><span style="color:#167FE7;">/</span><span style="color:#F2F0F1;">@</span><span
    style="color:#107DDD;">/</span><span style="color:#CCCCCC;">&amp;</span><span style="color:#64000000;"> </span><span
    style="color:#7C000000;"> </span><span style="color:#7E000000;"> </span><br><span style="color:#7F000000;">
</span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;">
</span><span style="color:#76000000;"> </span><span style="color:#C7C7C7;">%</span><span
    style="color:#C7C7C7;">%</span><span style="color:#0F7CDB;">/</span><span style="color:#F2F0F1;">@</span><span
    style="color:#137EE2;">/</span><span style="color:#167FE5;">/</span><span style="color:#167FE9;">/</span><span
    style="color:#1880EC;">(</span><span style="color:#1981EE;">(</span><span style="color:#1A82F0;">(</span><span
    style="color:#1B82F2;">(</span><span style="color:#1C83F3;">(</span><span style="color:#1C83F3;">(</span><span
    style="color:#1C83F3;">(</span><span style="color:#1C83F3;">(</span><span style="color:#1B82F2;">(</span><span
    style="color:#1A82F0;">(</span><span style="color:#1981EE;">(</span><span style="color:#1881EC;">(</span><span
    style="color:#1780E9;">(</span><span style="color:#157FE6;">/</span><span style="color:#137EE3;">/</span><span
    style="color:#F2F0F1;">@</span><span style="color:#0F7CDB;">/</span><span style="color:#C7C7C7;">%</span><span
    style="color:#C7C7C7;">%</span><span style="color:#74000000;"> </span><span style="color:#7F000000;"> </span><span
    style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><br><span style="color:#7F000000;">
</span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;">
</span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#79000000;">
</span><span style="color:#66000000;"> </span><span style="color:#C4C4C4;">%</span><span
    style="color:#C2C2C2;">%</span><span style="color:#0F7CDB;">/</span><span style="color:#0F7CDB;">/</span><span
    style="color:#107CDC;">/</span><span style="color:#F2F0F1;">@</span><span style="color:#127EE0;">/</span><span
    style="color:#127EE1;">/</span><span style="color:#F4F2F3;">@</span><span style="color:#137EE2;">/</span><span
    style="color:#137EE2;">/</span><span style="color:#F2F0F1;">@</span><span style="color:#127EE1;">/</span><span
    style="color:#127EE0;">/</span><span style="color:#F2F0F1;">@</span><span style="color:#107CDC;">/</span><span
    style="color:#107DDD;">/</span><span style="color:#0F7CDB;">/</span><span style="color:#C2C2C2;">%</span><span
    style="color:#C2C2C2;">%</span><span style="color:#65000000;"> </span><span style="color:#79000000;"> </span><span
    style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7F000000;"> </span><span
    style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><br><span style="color:#7F000000;">
</span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;">
</span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;">
</span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7D000000;">
</span><span style="color:#76000000;"> </span><span style="color:#69000000;"> </span><span style="color:#59000000;">
</span><span style="color:#BDBDBD;">%</span><span style="color:#BDBDBD;">%</span><span
    style="color:#BDBDBD;">%</span><span style="color:#BDBDBD;">%</span><span style="color:#BDBDBD;">%</span><span
    style="color:#BDBDBD;">%</span><span style="color:#BDBDBD;">%</span><span style="color:#BDBDBD;">%</span><span
    style="color:#BDBDBD;">%</span><span style="color:#BDBDBD;">%</span><span style="color:#59000000;"> </span><span
    style="color:#68000000;"> </span><span style="color:#76000000;"> </span><span style="color:#7D000000;"> </span><span
    style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span
    style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span><span style="color:#7F000000;"> </span><span
    style="color:#7E000000;"> </span><span style="color:#7E000000;"> </span>`

    } else if (logo == "Opera") {
        return `<span style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#73150203;"> </span><span style="color:#AE81728;">*</span><span
    style="color:#DE21626;">*</span><span style="color:#79060000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><br><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#FD1A2C;">/</span><span
    style="color:#FD1A2C;">/</span><span style="color:#FD1A2C;">/</span><span style="color:#FF1B2D;">/</span><span
    style="color:#FD1A2C;">/</span><span style="color:#FD1A2C;">/</span><span style="color:#FD1A2C;">/</span><span
    style="color:#FF1B2D;">/</span><span style="color:#FD1A2C;">/</span><span style="color:#FD1A2C;">/</span><span
    style="color:#FD1A2C;">/</span><span style="color:#AF040A;">,</span><span style="color:#9A0000;">,</span><span
    style="color:#9A0000;">,</span><span style="color:#9A0000;">,</span><span style="color:#9C0000;">,</span><span
    style="color:#FD1A2C;">/</span><span style="color:#FD1A2C;">/</span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><br><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#FF1B2D;">/</span><span style="color:#FD1A2C;">/</span><span
    style="color:#FF1B2D;">/</span><span style="color:#FD1A2C;">/</span><span style="color:#FF1B2D;">/</span><span
    style="color:#FD1A2C;">/</span><span style="color:#FF1B2D;">/</span><span style="color:#FD1A2C;">/</span><span
    style="color:#FF1B2D;">/</span><span style="color:#A50808;">,</span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#425A060B;">.</span><span style="color:#A50808;">,</span><span style="color:#A70909;">,</span><span
    style="color:#A50808;">,</span><span style="color:#A70909;">,</span><span style="color:#A50808;">,</span><span
    style="color:#A70909;">,</span><span style="color:#A50808;">,</span><span style="color:#A70909;">,</span><span
    style="color:#A50808;">,</span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><br><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#FF1B2D;">/</span><span style="color:#FD1A2C;">/</span><span
    style="color:#FD1A2C;">/</span><span style="color:#FD1A2C;">/</span><span style="color:#FF1B2D;">/</span><span
    style="color:#FD1A2C;">/</span><span style="color:#FD1A2C;">/</span><span style="color:#FD1A2C;">/</span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#B41111;">,</span><span style="color:#B31111;">,</span><span style="color:#B31111;">,</span><span
    style="color:#B31111;">,</span><span style="color:#B41111;">,</span><span style="color:#B31111;">,</span><span
    style="color:#B31111;">,</span><span style="color:#B31111;">,</span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><br><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#FF1B2D;">/</span><span style="color:#FF1B2D;">/</span><span
    style="color:#FF1B2D;">/</span><span style="color:#FF1B2D;">/</span><span style="color:#FF1B2D;">/</span><span
    style="color:#FF1B2D;">/</span><span style="color:#FF1B2D;">/</span><span style="color:#FF1B2D;">/</span><span
    style="color:#FF1B2D;">/</span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#BF1A1A;">*</span><span style="color:#BF1A1A;">*</span><span
    style="color:#BF1A1A;">*</span><span style="color:#BF1A1A;">*</span><span style="color:#BF1A1A;">*</span><span
    style="color:#BF1A1A;">*</span><span style="color:#BF1A1A;">*</span><span style="color:#BF1A1A;">*</span><span
    style="color:#000000;"> </span><br><span style="color:#000000;"> </span><span style="color:#FB192B;">/</span><span
    style="color:#FB192B;">/</span><span style="color:#FB192B;">/</span><span style="color:#FD1A2C;">/</span><span
    style="color:#FB192B;">/</span><span style="color:#FB192B;">/</span><span style="color:#FB192B;">/</span><span
    style="color:#FD1A2C;">/</span><span style="color:#FB192B;">/</span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#C92222;">*</span><span style="color:#CB2323;">*</span><span
    style="color:#CA2323;">*</span><span style="color:#C92222;">*</span><span style="color:#C92222;">*</span><span
    style="color:#CB2323;">*</span><span style="color:#C92222;">*</span><span style="color:#C92222;">*</span><br><span
    style="color:#000000;"> </span><span style="color:#F8192B;">/</span><span style="color:#FA1A2C;">/</span><span
    style="color:#F8192B;">/</span><span style="color:#FA1A2C;">/</span><span style="color:#F8192B;">/</span><span
    style="color:#FA1A2C;">/</span><span style="color:#F8192B;">/</span><span style="color:#FA1A2C;">/</span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#D52C2C;">*</span><span style="color:#D62C2C;">*</span><span style="color:#D52C2C;">*</span><span
    style="color:#D62C2C;">*</span><span style="color:#D52C2C;">*</span><span style="color:#D62C2C;">*</span><span
    style="color:#D52C2C;">*</span><span style="color:#D62C2C;">*</span><br><span style="color:#F11629;">*</span><span
    style="color:#F21729;">*</span><span style="color:#F21729;">*</span><span style="color:#F21729;">*</span><span
    style="color:#F4182A;">/</span><span style="color:#F21729;">*</span><span style="color:#F21729;">*</span><span
    style="color:#F21729;">*</span><span style="color:#F4182A;">/</span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#E13334;">/</span><span
    style="color:#E23435;">/</span><span style="color:#E13334;">/</span><span style="color:#E13334;">/</span><span
    style="color:#E13334;">/</span><span style="color:#E23435;">/</span><span style="color:#E13334;">/</span><span
    style="color:#E13334;">/</span><br><span style="color:#000000;"> </span><span style="color:#EE1528;">*</span><span
    style="color:#EE1528;">*</span><span style="color:#EE1528;">*</span><span style="color:#EE1528;">*</span><span
    style="color:#EE1528;">*</span><span style="color:#EE1528;">*</span><span style="color:#EE1528;">*</span><span
    style="color:#EE1528;">*</span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#EE3E3E;">/</span><span style="color:#EE3E3E;">/</span><span
    style="color:#EE3E3E;">/</span><span style="color:#EE3E3E;">/</span><span style="color:#EE3E3E;">/</span><span
    style="color:#EE3E3E;">/</span><span style="color:#EE3E3E;">/</span><span style="color:#EE3E3E;">/</span><br><span
    style="color:#000000;"> </span><span style="color:#E31124;">*</span><span style="color:#E31124;">*</span><span
    style="color:#E31124;">*</span><span style="color:#E51225;">*</span><span style="color:#E31124;">*</span><span
    style="color:#E31124;">*</span><span style="color:#E31124;">*</span><span style="color:#E51225;">*</span><span
    style="color:#E31124;">*</span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#F84646;">(</span><span style="color:#FA4747;">(</span><span style="color:#F84646;">(</span><span
    style="color:#F84646;">(</span><span style="color:#F84646;">(</span><span style="color:#FA4747;">(</span><span
    style="color:#F84646;">(</span><span style="color:#F84646;">(</span><br><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#DA0F22;">*</span><span style="color:#D80E21;">*</span><span
    style="color:#DA0F22;">*</span><span style="color:#D80E21;">*</span><span style="color:#DA0F22;">*</span><span
    style="color:#D80E21;">*</span><span style="color:#DA0F22;">*</span><span style="color:#D80E21;">*</span><span
    style="color:#DA0F22;">*</span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#FF4B4B;">(</span><span style="color:#FD4A4A;">(</span><span
    style="color:#FF4B4B;">(</span><span style="color:#FD4A4A;">(</span><span style="color:#FF4B4B;">(</span><span
    style="color:#FD4A4A;">(</span><span style="color:#FF4B4B;">(</span><span style="color:#FD4A4A;">(</span><span
    style="color:#000000;"> </span><br><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#CF0C1F;">*</span><span
    style="color:#CD0B1E;">*</span><span style="color:#CD0B1E;">*</span><span style="color:#CD0B1E;">*</span><span
    style="color:#CF0C1F;">*</span><span style="color:#CD0B1E;">*</span><span style="color:#CD0B1E;">*</span><span
    style="color:#CD0B1E;">*</span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#FF4B4B;">(</span><span style="color:#FD4A4A;">(</span><span
    style="color:#FD4A4A;">(</span><span style="color:#FD4A4A;">(</span><span style="color:#FF4B4B;">(</span><span
    style="color:#FD4A4A;">(</span><span style="color:#FD4A4A;">(</span><span style="color:#FD4A4A;">(</span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><br><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#C1071B;">,</span><span style="color:#C1071B;">,</span><span style="color:#C1071B;">,</span><span
    style="color:#C1071B;">,</span><span style="color:#C1071B;">,</span><span style="color:#C1071B;">,</span><span
    style="color:#C1071B;">,</span><span style="color:#C1071B;">,</span><span style="color:#C1071B;">,</span><span
    style="color:#FF4B4B;">(</span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#14D43D3D;">/</span><span
    style="color:#FF4B4B;">(</span><span style="color:#FF4B4B;">(</span><span style="color:#FF4B4B;">(</span><span
    style="color:#FF4B4B;">(</span><span style="color:#FF4B4B;">(</span><span style="color:#FF4B4B;">(</span><span
    style="color:#FF4B4B;">(</span><span style="color:#FF4B4B;">(</span><span style="color:#FF4B4B;">(</span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><br><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#B20317;">,</span><span
    style="color:#B20317;">,</span><span style="color:#B20317;">,</span><span style="color:#B40317;">,</span><span
    style="color:#B20317;">,</span><span style="color:#B20317;">,</span><span style="color:#B20317;">,</span><span
    style="color:#B40317;">,</span><span style="color:#B20317;">,</span><span style="color:#B20317;">,</span><span
    style="color:#B20317;">,</span><span style="color:#DB2931;">/</span><span style="color:#FD4A4A;">(</span><span
    style="color:#FD4A4A;">(</span><span style="color:#FD4A4A;">(</span><span style="color:#F03C40;">/</span><span
    style="color:#B20317;">,</span><span style="color:#B20317;">,</span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span><span style="color:#000000;"> </span><span style="color:#000000;"> </span><span
    style="color:#000000;"> </span>`
    } else if (logo == "NEON") {
        return '<span style="color:#1BDB99;">             `..---+/---..`<br>         `---.``   ``   `.---.`<br>      .--.`        ``        `-:-.<br>    `:/:     `.----//----.`     :/-<br>   .:.    `---`          `--.`    .:`<br>  .:`   `--`                .:-    `:.<br> `/    `:.      `.-::-.`      -:`   `/`<br> /.    /.     `:++++++++:`     .:    .:<br>`/    .:     `+++++++++++/      /`   `+`<br>/+`   --     .++++++++++++`     :.   .+:<br>`/    .:     `+++++++++++/      /`   `+`<br> /`    /.     `:++++++++:`     .:    .:<br> ./    `:.      `.:::-.`      -:`   `/`<br>  .:`   `--`                .:-    `:.<br>   .:.    `---`          `--.`    .:`<br>    `:/:     `.----//----.`     :/-<br>      .-:.`        ``        `-:-.<br>         `---.``   ``   `.---.`<br>             `..---+/---..`<br></span>'
    }
}