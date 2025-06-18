fetch("https://api.awashcard0.com/api/music/playing")
    .then(response => response.json())
    .then(data => {
        handleMusic(data);
    });

let music_progress_date
let music_progress
let music_state

setInterval(() => {
    fetch("https://api.awashcard0.com/api/music/playing")
        .then(response => response.json())
        .then(data => {
            handleMusic(data);
        });
}, 18000);

setTimeout(() => {
    document.querySelector(".screensaverMusic").style.display = "block";
}, 2000);
    

// https://open.spotify.com/track/1udKn1oNKYQSQ9OmiIWCMu

function handleMusic(data) {
	const screensaverMusicElement = document.querySelector(".screensaverMusic");

    if (data.state == "idle" || data.state == "paused" || window.innerWidth < 980) {
        screensaverMusicElement.style.opacity = "0";
    } else {
		randomSSMusicPos(data);
    }
}

function randomSSMusicPos(data) {
    const screensaverMusicElement = document.querySelector(".screensaverMusic");
	const ssAlbumCover = document.getElementById("ss-album-cover");
	const ssSongName = document.getElementById("ss-song-name");
	const ssSongTitle = document.getElementById("ss-song-title");

	screensaverMusicElement.style.opacity = "0";

	setTimeout(() => {
		ssAlbumCover.src = data.image;
		ssSongTitle.innerText = `${data.artist} - ${data.album}`;
		ssSongName.innerText = data.title;
		screensaverMusicElement.style.right = Math.floor(Math.random() * 67) + "%";
		screensaverMusicElement.style.top = Math.floor(Math.random() * 60) + "%";
		screensaverMusicElement.style.opacity = "1";
	}, 2000);
}


// Add event listener for animation end
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.loader-name').addEventListener('animationend', () => {
        setTimeout(() => {
            document.querySelector('.loader').classList.add('hidden');
        }, 500);
    });
});
