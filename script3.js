document.addEventListener('DOMContentLoaded', (event) => {
    const systems2 = [
        {
            name: 'DVT2',
            baseDir: 'wav3\\Plain',
            types: [''],
            displayElementId: 'displayTextDVT2'
        },
        {
            name: 'DVT2_F',
            baseDir: 'wav3\\Auto',
            types: [''],
            displayElementId: 'displayTextDVT2'
        },
        {
            name: 'DVT2_TAG',
            baseDir: 'wav3\\Symbol',
            types: [''],
            displayElementId: 'displayTextDVT2'
        },
        {
            name: 'DVT2_TAG2',
            baseDir: 'wav3\\Tag',
            types: [''],
            displayElementId: 'displayTextDVT2'
        },
    ];
    // {
    //         name: 'VITS',
    //         baseDir: 'wav\\20240516-vits-f-pred',
    //         types: ['800k', '900k', '1603k'],
    //         displayElementId: 'displayTextVITS'
    //      }
    const filenames2 = [
        "A01M0910_0148162_0152806.wav",
        "A02M0094_1394929_1398309.wav",
        "A02M0475_0413866_0427718.wav",
        "A02M0766_0119246_0125338.wav",
        "A07F0568_0566882_0577408.wav",
        "M01M0011_1269465_1273516.wav",
        "S05F1450_0395016_0401256.wav",
        "S05M0541_0052697_0063509.wav",
        "S10F1409_0044063_0055523.wav",
        "S10M1591_0445263_0451173.wav",

    ];
    let textMap = new Map();
    let currentIndex = 0;

    // transcripts.txtの内容を直接JavaScriptに埋め込む
    const transcriptData2 = `
A01M0910_0148162_0152806.wav,  1.計算のやり方ですね先行する全ての音素とのペアを組むという点から
A02M0094_1394929_1398309.wav,  2.勿論ここでの標準値は先程申しましたように目安でありまして
A02M0475_0413866_0427718.wav,  3.この当のことが相手にとってのそもそも知ってることだとか分かることだとそういうことのうちに含まれるはずだと
A02M0766_0119246_0125338.wav,  4.それぞれタイプ別に代表的な方言の類別体系音調型式について
A07F0568_0566882_0577408.wav,  5.年齢が高い人っていうのはストレスをストレスとあまり感じないっていう形で解釈をした方がいいのではないかと
M01M0011_1269465_1273516.wav,  6.で枝を張っておっても枝はですねまっすぐに横へ伸びると
S05F1450_0395016_0401256.wav,  7.二日前に帰ってきたんですけれども一週間程沖縄でトレーニングを受けてきまして
S05M0541_0052697_0063509.wav,  8.当然芝居をやってる人は舞台にも詳しいし中には本を書く人もいたり
S10F1409_0044063_0055523.wav,  9.って答えると大抵の人はこう純文学で夏目漱石だとか芥川龍之介といった方がこう高尚な感じに受け取られるのかなとも思うんですけれども
S10M1591_0445263_0451173.wav, 10.それを繰り返して私は歴代の一番大切なものを作っては失ってを繰り返してきました
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
        systems2.forEach(system => {
            system.types.forEach((type, typeIndex) => {
                const audioElements = document.querySelectorAll(`.${system.name.toLowerCase()}-audio2-${typeIndex}`);
                audioElements.forEach((audio, filenameIndex) => {
                    const newIndex = (currentIndex + filenameIndex) % filenames2.length;
                    const filename = filenames2[newIndex];
                    const filePath = generateFilePath(system, type, filename);
                    audio.src = filePath;
                    audio.parentElement.load();

                    const displayTextElement = document.getElementById(system.displayElementId);
                    displayTextElement.innerText = textMap.get(filename) || "No text available";
                });
            });
        });
    }

    document.getElementById('prevButton2').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + filenames2.length) % filenames2.length;
        updateAudioSources();
    });

    document.getElementById('nextButton2').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % filenames2.length;
        updateAudioSources();
    });

    // 初期状態でtranscriptDataを解析してテキストマップを作成
    parseTranscriptData(transcriptData2);
    updateAudioSources();
});