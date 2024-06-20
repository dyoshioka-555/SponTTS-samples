// script.js

// サンプルの音声ファイルリスト
const audioFiles = [
    [
        "wav\\20240604-csj-pred\\wav-365k\\A01M0565_0019636_0028888.wav",
        "wav\\20240604-csj-pred\\wav-658k\\A01M0565_0019636_0028888.wav",
        "wav\\20240604-csj-pred\\wav-830k\\A01M0565_0019636_0028888.wav"
    ],
    [
        "wav\\20240605-csj-pred\\wav-365k\\A01M0565_0019636_0028888.wav",
        "wav\\20240605-csj-pred\\wav-658k\\A01M0565_0019636_0028888.wav",
        "wav\\20240605-csj-pred\\wav-830k\\A01M0565_0019636_0028888.wav"
    ],
    // 追加の音声ファイルリストをここに追加
];

let currentIndex = 0;

const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

function updateAudioSources() {
    const currentFiles = audioFiles[currentIndex];
    const audioElements = document.querySelectorAll("audio");

    audioElements.forEach((audio, index) => {
        const source = audio.querySelector("source");
        source.src = currentFiles[index];
        audio.load();
    });
}

prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateAudioSources();
    }
});

nextButton.addEventListener("click", () => {
    if (currentIndex < audioFiles.length - 1) {
        currentIndex++;
        updateAudioSources();
    }
});

// 初期化
updateAudioSources();