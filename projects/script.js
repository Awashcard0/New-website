
const loader = document.querySelector('.loader');
const nameElement = document.querySelector('.loader__name');

const projectsContainer = document.querySelector('.projects-container');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const modalImage = document.querySelector('.modal-image');
const modalTitle = document.querySelector('.modal-title');
const modalDescription = document.querySelector('.modal-description');
const modalLink = document.querySelector('.modal-link');
const closeBtn = document.querySelector('.close');

// Function to hide the loader and show the content
function showContent() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  loader.classList.add('hidden');
}

// Add event listener for animation end
nameElement.addEventListener('animationend', showContent);

// setTimeout(() => {
//   showContent();
// }, 2000);

const toggleSwitch = document.getElementById('dark-mode-toggle');

// Function to set the theme based on the user's preference
function setTheme(theme) {
  const body = document.body;
  body.className = theme;
  modalContent.className = `modal-content ${theme}`;
}

// Function to toggle the theme between light and dark
function toggleTheme() {
  const body = document.body;
  body.classList.toggle('dark-mode');
  modalContent.classList.toggle('dark-mode');
}

// Event listener for the dark mode toggle switch
toggleSwitch.addEventListener('change', () => {
  toggleTheme();
});

// Check the user's preference for dark mode
const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (userPrefersDark) {
  toggleSwitch.checked = true;
  setTheme('dark-mode');
}

// Function to display the project details in the modal
function displayProjectDetails(project) {
  const imageSrc = project.style.backgroundImage.slice(5, -2);
  const title = project.querySelector('h3').textContent;
  const description = project.querySelector('.project-details p').textContent;
  const link = project.querySelector('.project-details a');

  modalImage.src = imageSrc;
  modalTitle.textContent = title;
  modalDescription.textContent = description;
  modalLink.href = link.href;

  modal.classList.add('show');
  closeBtn.focus();
}

// Event listener for project click
projectsContainer.addEventListener('click', (event) => {
  const project = event.target.closest('.project');
  if (project) {
    displayProjectDetails(project);
  }
});

projectsContainer.addEventListener("keydown", (event) => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  }

  if (event.keyCode === 13 || event.keyCode === 32) {
    const project = event.target.closest('.project');
    if (project) {
      displayProjectDetails(project);
    }
  }
});

// Event listener for close button click
closeBtn.addEventListener('click', () => {
  modal.classList.remove('show');
});

closeBtn.addEventListener("keydown", (event) => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  }

  if (event.keyCode === 13 || event.keyCode === 32) {
    modal.classList.remove('show');
  }
});

var fadeScreen = document.getElementById('screensaver');
        var fadeTimer;
        
        function fadeToBlack() {
            fadeScreen.style.opacity = '1';
            fadeScreen.style.pointerEvents = 'auto';
        }
        
        function unfade() {
            fadeScreen.style.opacity = '0';
            fadeScreen.style.pointerEvents = 'none';
            resetFadeTimer();
        }
        
        function resetFadeTimer() {
            clearTimeout(fadeTimer);
            fadeTimer = setTimeout(fadeToBlack, 60000);
        }
        
        document.addEventListener('mousemove', function() {
            unfade();
        });

        document.addEventListener(`keydown`, function() {
            unfade();
        });
        
        resetFadeTimer();