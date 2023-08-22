let homeThingOpen = false;
let online = false;

    document.addEventListener("DOMContentLoaded", function(e) {
    var homeButton = document.createElement("btn");
    homeButton.setAttribute('tabindex', 0);
    homeButton.setAttribute('aria-label', 'Go to main directory');
    homeButton.setAttribute('role', 'button');
    homeButton.setAttribute('id', 'noKill');
    // homeButton.setAttribute('title', 'Hover to see user count for every awashcard0 site');
    homeButton.addEventListener('click', function(e) {

      if (!homeThingOpen) {
        var settingsPage = document.createElement("div");
        settingsPage.setAttribute('tabindex', 0);
        settingsPage.setAttribute('class', "settings-background");
        document.body.appendChild(settingsPage);
  
        settingsPage.innerHTML = `
        <h1>Settings</h1>
        <span class="close" onclick="closeHomeThing(this.parentElement)">×</span>
        <a href="https://awashcard0.pages.dev/" class="homeLink">Go home</a>
        <button onclick="askForDarkMode()">Ask for dark mode</button>
        <p id="HomeThingShowFPS">FPS: Loading</p>
        `;
      } else {
        startExit();
      }

      homeThingOpen = true;
      // document.body.classList.add('blockscreen');
      // homeButton.addEventListener('transitionend', function(e) {
      //   window.requestAnimationFrame(function() {
      //     // Try forcing repaint
      //     homeButton.getBoundingClientRect();
      //     let utm = location.href
      //     document.getElementById("noKill").style.removeProperty('background-color');
      //     document.getElementById("noKill").style.removeProperty('backgroundColor');
      //     if (location.hostname == "awashcard0.ga" || location.hostname == "awashcard0.pages.dev") {
      //       var myDivs = document.getElementsByClassName("blockscreen");
      //           for (var i = 0; i < myDivs.length; i++) {
      //           myDivs[i].style.backgroundColor = "#00ff77";
      //           }
      //           removeAll();
      //       window.location = `/?utm=${utm}`;
      //     } else {
      //       var myDivs = document.getElementsByClassName("blockscreen");
      //           for (var i = 0; i < myDivs.length; i++) {
      //           myDivs[i].style.backgroundColor = "#3217ff";
      //           }
      //           removeAll();
      //       window.location = `http://awashcard0.pages.dev/?utm=${utm}`;
      //     }
      //   });
      // });
      // See if on pages.dev
    });
    homeButton.addEventListener('keydown', function(e) {
      if (e.keyCode === 13) homeButton.click();
    });
    document.body.appendChild(homeButton);

    if (location.hostname == 'awashcard0.pages.dev' || location.hostname == 'www.awashcard0.com') {
      fetch("https://awashcard0.com/")
      .then(response => {
        if (response.status === 200) {
          location.href = `https://awashcard0.com${location.pathname}`
        }
      }
      );
    }

homeButton.addEventListener("mouseenter", function(e) {
  showUsers = true;
  updateusers();
});

homeButton.addEventListener("mouseleave", function(e) {
  showUsers = false;
  updateusers();
});

  }, {once: true});

  let showUsers = false;

  function removeAll() {
    var body = document.getElementsByTagName("body")[0];
    while (body.firstChild) {
      if (body.firstChild.id === "noKill") {
        break;
      } else {
        body.removeChild(body.firstChild);
      }
    }
  }

  function updateusers() {
    if (showUsers) {
      var usersCount = document.createElement("span");
      usersCount.setAttribute('tabindex', 0);
      usersCount.setAttribute('aria-label', 'Go to main directory');
      usersCount.setAttribute('id', 'userThing');
      document.body.appendChild(usersCount);
      // document.getElementById("userThing").innerHTML = "Users online: " + usersOnline;
      document.getElementById("userThing").innerHTML = "Not working";
    } else {
      document.getElementById("userThing").remove();
    }
  }

  var usersOnline = 1;

  //  setInterval(() => {
  //     fetch('https://usercount.awashcard0.repl.co/')
  //       .then(response => response.text())
  //       .catch(error => console.error(error));
  //   }, 4500);

  //   setInterval(() => {
  //     fetch('https://usercount.awashcard0.repl.co/count')
  //       .then(response => response.text())
  //       .then(count => usersOnline = count);
  //     if (showUsers) {document.getElementById("userThing").innerHTML = "Users online: " + usersOnline};
  //   }, 5000);

fetch('https://awashcard0.pages.dev/info.json')
  .then(response => response.json())
  .then(info => gotInfo(info))
  .catch(error => console.error(error));

  function gotInfo(info) {
    // Check if in dev mode
    if (info.devMode) {
      var callout = document.createElement("div");
      callout.setAttribute('tabindex', 0);
      callout.setAttribute('class', 'callout');
      document.body.appendChild(callout);

      var calloutTitle = document.createElement("h1");
      calloutTitle.setAttribute('tabindex', 0);
      calloutTitle.setAttribute('class', 'callout-title');
      calloutTitle.innerText = "My website is in development mode";
      callout.appendChild(calloutTitle);

      var calloutText = document.createElement("div");
      calloutText.setAttribute('tabindex', 0);
      calloutText.setAttribute('class', 'callout-main');
      calloutText.innerText = "This means that I am currently working on my website and stuff may change. If you notice something that is wrong I'm probably working on it";
      callout.appendChild(calloutText);

      var calloutClose = document.createElement("span");
      calloutClose.setAttribute('tabindex', 0);
      calloutClose.setAttribute('class', 'callout-closebtn');
      calloutClose.setAttribute('onclick', 'body.removeChild(this.parentElement)')
      calloutClose.innerText = "×";
      callout.appendChild(calloutClose);
      
    }
  }

  function closeHomeThing(element) {
    homeThingOpen = false;
    document.body.removeChild(element);
  }

  function askForDarkMode() {
    var element = document.body;
    element.classList.toggle("full-page-dark-mode"); 
  }

function startExit() {
  let callout = document.createElement("div");
      callout.setAttribute('class', 'exitBackground');
      callout.setAttribute('id', 'exitBackgroundDiv')
      document.body.appendChild(callout);

      let calloutClose = document.createElement("h1");
      calloutClose.setAttribute('class', 'exitNameElement');
      calloutClose.innerText = "Awashcard0";
      callout.appendChild(calloutClose);

      const exitBackground = document.getElementById('exitBackgroundDiv');
      const exitNameElement = document.querySelector('.exitNameElement');

      exitBackground.style.backgroundColor = "#111";
      exitBackground.style.opacity = "1";

      exitNameElement.addEventListener('animationend', function() {
        if (online) {
            location.href = "https://awashcard0.com/"
        } else {
            location.href = "https://awashcard0.pages.dev/"
        }
        
      });
}

var FPSstartTime = Date.now();
var FPSframe = 0;

function tickFPS() {
  let time = Date.now();
  FPSframe++;
  if (time - FPSstartTime > 1000) {
    if (homeThingOpen) {
      document.getElementById("HomeThingShowFPS").innerHTML = "FPS: " + (FPSframe / ((time - FPSstartTime) / 1000)).toFixed(1);
    }
      FPSstartTime = time;
      FPSframe = 0;
	}
  window.requestAnimationFrame(tickFPS);
}
tickFPS();

fetch("https://awashcard0.com/")
      .then(response => {
        if (response.status === 200) {
          online = true;
        } else {
          online = false;
        }
      }
      );