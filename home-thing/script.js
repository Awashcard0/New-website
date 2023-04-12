document.addEventListener("DOMContentLoaded", function(e) {
    var homeButton = document.createElement("btn");
    homeButton.setAttribute('tabindex', 0);
    homeButton.setAttribute('aria-label', 'Go to main directory');
    homeButton.setAttribute('role', 'button');
    homeButton.addEventListener('click', function(e) {
      document.body.classList.add('blockscreen');
      homeButton.addEventListener('transitionend', function(e) {
        window.requestAnimationFrame(function() {
          // Try forcing repaint
          homeButton.getBoundingClientRect();
          let utm = location.href
          if (location.hostname == "awashcard0.ga" || location.hostname == "awashcard0.pages.dev") {
            // document.getElementsByClassName('blockscreen').style.backgroundColor = "green";
            window.location = `/?utm=${utm}`;
          } else {
            // document.getElementsByClassName('blockscreen').style.backgroundColor = "blue";
            window.location = `http://awashcard0.pages.dev/?utm=${utm}`;
          }
        });
      });
    });
    homeButton.addEventListener('keydown', function(e) {
      if (e.keyCode === 13) homeButton.click();
    });
    document.body.appendChild(homeButton);
  }, {once: true});

  //set favicon

 document.querySelector("link[rel='shortcut icon']").href = "http://awashcard0.pages.dev/favicon.ico";

 document.querySelector("link[rel*='icon']").href = "http://awashcard0.pages.dev/favicon.ico";