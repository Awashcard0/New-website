    document.addEventListener("DOMContentLoaded", function(e) {
    var homeButton = document.createElement("btn");
    homeButton.setAttribute('tabindex', 0);
    homeButton.setAttribute('aria-label', 'Go to main directory');
    homeButton.setAttribute('role', 'button');
    homeButton.setAttribute('id', 'noKill');
    // homeButton.setAttribute('title', 'Hover to see user count for every awashcard0 site');
    homeButton.addEventListener('click', function(e) {
      document.body.classList.add('blockscreen');
      homeButton.addEventListener('transitionend', function(e) {
        window.requestAnimationFrame(function() {
          // Try forcing repaint
          homeButton.getBoundingClientRect();
          let utm = location.href
          document.getElementById("noKill").style.removeProperty('background-color');
          document.getElementById("noKill").style.removeProperty('backgroundColor');
          if (location.hostname == "awashcard0.ga" || location.hostname == "awashcard0.pages.dev") {
            var myDivs = document.getElementsByClassName("blockscreen");
                for (var i = 0; i < myDivs.length; i++) {
                myDivs[i].style.backgroundColor = "#00ff77";
                }
                removeAll();
            window.location = `/?utm=${utm}`;
          } else {
            var myDivs = document.getElementsByClassName("blockscreen");
                for (var i = 0; i < myDivs.length; i++) {
                myDivs[i].style.backgroundColor = "#3217ff";
                }
                removeAll();
            window.location = `http://awashcard0.pages.dev/?utm=${utm}`;
          }
        });
      });
    });
    homeButton.addEventListener('keydown', function(e) {
      if (e.keyCode === 13) homeButton.click();
    });
    document.body.appendChild(homeButton);


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

  // function updateusers() {
  //   if (showUsers) {
  //     var usersCount = document.createElement("span");
  //     usersCount.setAttribute('tabindex', 0);
  //     usersCount.setAttribute('aria-label', 'Go to main directory');
  //     usersCount.setAttribute('id', 'userThing');
  //     document.body.appendChild(usersCount);
  //     document.getElementById("userThing").innerHTML = "Users online: " + usersOnline;
  //   } else {
  //     document.getElementById("userThing").remove();
  //   }
  // }

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

fetch('/info.json')
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
      calloutClose.setAttribute('onclick', 'this.parentElement.style.display="none"')
      calloutClose.innerText = "×";
      callout.appendChild(calloutClose);
      
    }
  }