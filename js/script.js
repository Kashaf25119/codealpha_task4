const songs = [

    {
        title: "Passori",
        artist: "Ali sethi",
        src: "musics/Coke Studio Season 14 Pasoori Ali Sethi x Shae Gill.mp3"
    },

    {
        title: "Jhol",
        artist: "Mannu",
        src: "musics/Jhol Coke Studio Pakistan Season 15 Maanu x Annural Khalid.mp3"
    },

    {
        title: "Pal Pal",
        artist: "Afusic",
        src: "musics/Afusic - Pal Pal (Official Music Video) Prod. @AliSoomroMusic.mp3"
    }

];


let currentSong = 0;


const audio = new Audio();


const songTitle =
    document.getElementById("song-title");

const artist =
    document.getElementById("artist");

const playButton =
    document.getElementById("play");

const previousButton =
    document.getElementById("previous");

const nextButton =
    document.getElementById("next");

const progress =
    document.getElementById("progress");

const currentTime =
    document.getElementById("current-time");

const duration =
    document.getElementById("duration");

const volume =
    document.getElementById("volume");

const playlist =
    document.getElementById("playlist");



/* ================= LOAD SONG ================= */

function loadSong(index) {

    const song = songs[index];

    songTitle.textContent =
        song.title;

    artist.textContent =
        song.artist;

    audio.src =
        song.src;

    updatePlaylist();

}



/* ================= PLAY ================= */

function playSong() {

    audio.play();

    playButton.textContent = "⏸";

}



/* ================= PAUSE ================= */

function pauseSong() {

    audio.pause();

    playButton.textContent = "▶";

}



/* ================= PLAY / PAUSE ================= */

playButton.addEventListener(
    "click",
    function () {

        if (audio.paused) {

            playSong();

        } else {

            pauseSong();

        }

    }
);



/* ================= NEXT ================= */

function nextSong() {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

}


nextButton.addEventListener(
    "click",
    nextSong
);



/* ================= PREVIOUS ================= */

function previousSong() {

    currentSong--;

    if (currentSong < 0) {

        currentSong =
            songs.length - 1;

    }

    loadSong(currentSong);

    playSong();

}


previousButton.addEventListener(
    "click",
    previousSong
);



/* ================= TIME UPDATE ================= */

audio.addEventListener(
    "timeupdate",
    function () {

        if (audio.duration) {

            const progressPercent =
                (audio.currentTime /
                audio.duration) * 100;

            progress.value =
                progressPercent;

            currentTime.textContent =
                formatTime(audio.currentTime);

        }

    }
);



/* ================= SONG DURATION ================= */

audio.addEventListener(
    "loadedmetadata",
    function () {

        duration.textContent =
            formatTime(audio.duration);

    }
);



/* ================= PROGRESS BAR ================= */

progress.addEventListener(
    "input",
    function () {

        const newTime =
            (progress.value / 100)
            * audio.duration;

        audio.currentTime =
            newTime;

    }
);



/* ================= VOLUME ================= */

volume.addEventListener(
    "input",
    function () {

        audio.volume =
            volume.value;

    }
);



/* ================= FORMAT TIME ================= */

function formatTime(seconds) {

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);

    return (
        minutes +
        ":" +
        remainingSeconds
            .toString()
            .padStart(2, "0")
    );

}



/* ================= AUTOPLAY NEXT ================= */

audio.addEventListener(
    "ended",
    function () {

        nextSong();

    }
);



/* ================= PLAYLIST ================= */

function createPlaylist() {

    playlist.innerHTML = "";

    songs.forEach(
        function (song, index) {

            const li =
                document.createElement("li");

            li.textContent =
                song.title +
                " - " +
                song.artist;

            li.addEventListener(
                "click",
                function () {

                    currentSong = index;

                    loadSong(currentSong);

                    playSong();

                }
            );

            playlist.appendChild(li);

        }
    );

}



/* ================= ACTIVE SONG ================= */

function updatePlaylist() {

    const items =
        playlist.querySelectorAll("li");

    items.forEach(
        function (item, index) {

            if (index === currentSong) {

                item.classList.add("active");

            } else {

                item.classList.remove("active");

            }

        }
    );

}



/* ================= INITIALIZE ================= */

loadSong(currentSong);

createPlaylist();