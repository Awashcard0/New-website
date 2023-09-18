// Get the DOM elements
const fileInput = document.getElementById('fileInput');
const audio1 = document.getElementById('audio1');
const audio2 = document.getElementById('audio2');
const volumeSlider = document.getElementById('volumeSlider');
audio2.src = 'second.mp3';

fileInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        audio1.src = URL.createObjectURL(file);
        audio1.play();
        audio2.play();
    }
});

volumeSlider.addEventListener('input', function () {
    audio1.volume = parseFloat(volumeSlider.value);
});
