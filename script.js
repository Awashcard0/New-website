
const loader = document.querySelector('.loader');
const nameElement = document.querySelector('.loader__name');

// Function to hide the loader and show the content
function showContent() {
  loader.classList.add('hidden');
}

// Add event listener for animation end
nameElement.addEventListener('animationend', showContent);

const toggleSwitch = document.getElementById('dark-mode-toggle');

// Function to set the theme based on the user's preference
function setTheme(theme) {
  const body = document.body;
  body.className = theme;
}

// Function to toggle the theme between light and dark
function toggleTheme() {
  const body = document.body;
  body.classList.toggle('dark-mode');
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

const projectsContainer = document.querySelector('.projects-container');
const modal = document.querySelector('.modal');
const modalImage = document.querySelector('.modal-image');
const modalTitle = document.querySelector('.modal-title');
const modalDescription = document.querySelector('.modal-description');
const modalLink = document.querySelector('.modal-link');
const closeBtn = document.querySelector('.close');

// Function to display the project details in the modal
function displayProjectDetails(project) {
  const imageSrc = project.style.backgroundImage.slice(5, -2);
  const title = project.querySelector('h3').textContent;
  const description = project.querySelector('.project-details p').textContent;
  const link = project.querySelector('.project-details a').href;

  modalImage.src = imageSrc;
  modalTitle.textContent = title;
  modalDescription.textContent = description;
  modalLink.href = link;

  modal.classList.add('show');
}

// Event listener for project click
projectsContainer.addEventListener('click', (event) => {
  const project = event.target.closest('.project');
  if (project) {
    displayProjectDetails(project);
  }
});

// Event listener for close button click
closeBtn.addEventListener('click', () => {
  modal.classList.remove('show');
});