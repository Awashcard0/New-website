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


