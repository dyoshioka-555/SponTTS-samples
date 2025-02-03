document.addEventListener('DOMContentLoaded', (event) => {
    const systems3 = [
        {
            name: 'GT',
            baseDir: 'wav4\\ori',
            types: [''],
            displayElementId: 'displayTextMOS'
        },
        {
            name: 'FS2',
            baseDir: 'wav4\\Fastspeech2',
            types: [''],
            displayElementId: 'displayTextMOS'
        },
        {
            name: 'DVT',
            baseDir: 'wav4\\DVT',
            types: [''],
            displayElementId: 'displayTextMOS'
        },
    ];
    // {
    //         name: 'VITS',
    //         baseDir: 'wav\\20240516-vits-f-pred',
    //         types: ['800k', '900k', '1603k'],
    //         displayElementId: 'displayTextVITS'
    //      }
    const filenames3 = [
        "A03M0106_0127269_0133675.wav",
        "A01M0097_0396177_0400912.wav",
        "A04M0051_0204708_0214423.wav",
        "A05M0011_0168357_0179179.wav",
        "A04M0121_0662627_0669963.wav",
        "A06M0064_0277576_0288148.wav",
        "S00F0019_0201608_0209973.wav",
        "S00M0112_0306845_0316108.wav",

    ];
    let textMap = new Map();
    let currentIndex = 0;

    // transcripts.txtの内容を直接JavaScriptに埋め込む
    const transcriptData3 = `
A03M0106_0127269_0133675.wav,  1.ユニフィケーションの枠組みを使って<えーと>語彙の情報を文法に反映させていく枠組みというのが(ひ)有名ですでこれら
A01M0097_0396177_0400912.wav,  2.第二音調指令の終点は韻母の長さと共に直線的に増加する<えー>
A04M0051_0204708_0214423.wav,  3.で<えー>そのような通信手段によって対話内容が変わるというのも勿論なんですけども<えー>(そ)そこで行なわれる対話の目的
A05M0011_0168357_0179179.wav,  4.<うー>じゃ最初は百五十年前だったかと<ん>そう思うかもしれませんが百五十年前って言うと<ん>嘉永元年の尻尾から
A04M0121_0662627_0669963.wav,  5.<ま>適合率<ま>再現率は当然全ての部分文字列が取れてますから百パーセントこのような形で<ま>正解セットを作りまして
A06M0064_0277576_0288148.wav,  6.<えー>六の方では先生がそれがお分かりにならないて先生が来た場合にお分かりにならないっていう敬語を使いますで生徒が来た場合は<あー>使えません
S00F0019_0201608_0209973.wav,  7.<えーと>もう車を運転していても前が見えない状況でかなり怖い思いもして<えーと>スキー場まで行きました
S00M0112_0306845_0316108.wav,  8.<ま>一つ社会人としての生き方なのかなっていうこともありますけども<ま>性格と言っても色々ありましてね<まー>昼の生活夜の生活って色々ありますけども<まー><ま>触れなくても
`;

    function parseTranscriptData(data) {
        const lines = data.trim().split('\n');
        lines.forEach(line => {
            const [filename, text] = line.split(',');
            textMap.set(filename.trim(), text.trim());
        });
    }

    function generateFilePath(system, type, filename) {
        return `${system.baseDir}\\${filename}`;
    }

    function updateAudioSources() {
        systems3.forEach(system => {
            system.types.forEach((type, typeIndex) => {
                const audioElements = document.querySelectorAll(`.${system.name.toLowerCase()}-audio3-${typeIndex}`);
                audioElements.forEach((audio, filenameIndex) => {
                    const newIndex = (currentIndex + filenameIndex) % filenames3.length;
                    const filename = filenames3[newIndex];
                    const filePath = generateFilePath(system, type, filename);
                    audio.src = filePath;
                    audio.parentElement.load();

                    const displayTextElement = document.getElementById(system.displayElementId);
                    displayTextElement.innerText = textMap.get(filename) || "No text available";
                });
            });
        });
    }

    document.getElementById('prevButton3').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + filenames3.length) % filenames3.length;
        updateAudioSources();
    });

    document.getElementById('nextButton3').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % filenames3.length;
        updateAudioSources();
    });

    // 初期状態でtranscriptDataを解析してテキストマップを作成
    parseTranscriptData(transcriptData3);
    updateAudioSources();
});