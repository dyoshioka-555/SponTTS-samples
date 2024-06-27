document.addEventListener('DOMContentLoaded', (event) => {
    const systems = [
        {
            name: 'DVT',
            baseDir: 'wav\\20240604-csj-pred',
            types: ['365k', '658k', '830k'],
            displayElementId: 'displayTextDVT'
        },
        {
            name: 'DVT_F',
            baseDir: 'wav\\20240520-csj-f-pred',
            types: ['590k', '755k', '818k'],
            displayElementId: 'displayTextDVT'
        },
        {
            name: 'DVT_TAG',
            baseDir: 'wav\\20240520-csj-tag-pred',
            types: ['588k', '651k', '738k'],
            displayElementId: 'displayTextDVT'
        },
        {
            name: 'DVT_TAG2',
            baseDir: 'wav\\20240518-csj-tag2-pred',
            types: ['420k', '657k', '773k'],
            displayElementId: 'displayTextDVT'
        },
        {
            name: 'GT',
            baseDir: 'wav\\test_wavs',
            types: ['0k'],
            displayElementId: 'displayTextDVT'
        }
    ];
    // {
    //         name: 'VITS',
    //         baseDir: 'wav\\20240516-vits-f-pred',
    //         types: ['800k', '900k', '1603k'],
    //         displayElementId: 'displayTextVITS'
    //      }
    const filenames = [
        "A01M0565_0019636_0028888.wav",
        "A01M0906_0094625_0098470.wav",
        "A03M0197_0360825_0363459.wav",
        "A05M0058_1965542_1972876.wav",
        "A09M0242_0688365_0694240.wav",
        "A11M0608_0590584_0599268.wav",
        "M01M0007_4965388_4971363.wav",
        "M01M0012_0466272_0476331.wav",
        "S00M1059_0048179_0052533.wav",
        "S04M1339_0014237_0019512.wav",
        "S05M1236_0649273_0658782.wav",
        "S07M1320_0213804_0224470.wav",
        "S08F0838_0087259_0091726.wav",
        "S08M0639_0440306_0446946.wav",
        "S08M1421_0750124_0754665.wav",
    ];
    let textMap = new Map();
    let currentIndex = 0;

    // transcripts.txtの内容を直接JavaScriptに埋め込む
    const transcriptData = `
A01M0565_0019636_0028888.wav,  1. でこれ英語でまず<うー>考えられた<あのー>概念でして<えー>標的単語キャットというのがありますとそれの<おー>第一音韻を<おー><ん>
A01M0906_0094625_0098470.wav,  2. 文部省科学技術庁(す)<あー>技術センターの<えー>ＮＡＣＳＩＳのデーターベースを
A03M0197_0360825_0363459.wav,  3. <え>その(す)文書に対する<えー>全てのタームに
A05M0058_1965542_1972876.wav,  4. ただあれは<あの>(サ)東京サントリーの<おー>ホールがこれを(う)多少意識して作ったもんで一種のコマーシャルとして
A09M0242_0688365_0694240.wav,  5. <ま>例えば<えー><ま>労働者のシーン人間のシーンそれから水没する山室<おー>のシーン
A11M0608_0590584_0599268.wav,  6. <えー>(よ)四人の被験者が延べ四十六分音声対話を車の中でずっとやっているとそれをＪｕｌｉｕｓの<お>認識エンジンとＩＰＡの接話マイク(もで)(う)
M01M0007_4965388_4971363.wav,  7. 階段が(あ)付いておりまして<えー>姥が池の方に<えー>下りていくあるいは(い)この写真は
M01M0012_0466272_0476331.wav,  8. <えー>(せ)<ま>縄文文化についてもですね実は<えー>大陸から切り離されて縄文文化というものは世界の<おー>新石器文化の流れの中ではですね
S00M1059_0048179_0052533.wav,  9. 何か絵が(す)自分絵が好きになったのかなっていうのは<えーっと>思います
S04M1339_0014237_0019512.wav, 10. <おー>愛犬は<あー>柴犬で名前は琵琶と(い)琵琶と言います
S05M1236_0649273_0658782.wav, 11. <あのー>三人目っつうのはつい(せ)<えー>去年の(お)秋に辞めたんですけどもそいつは<まー>一番最初に辞めたい辞めたいっつった人間なんですけどもえてしてそういうもんですが<えー>
S07M1320_0213804_0224470.wav, 12. <まー>最終的にレンズにしても火が<まー>必要ということで<ま>火があればですね<まー>救助の合図ののろしとかそういったのも<まー>
S08F0838_0087259_0091726.wav, 13. <あの>区の<あのー><まー>区の<その><あ><えーとー>主婦向けの
S08M0639_0440306_0446946.wav, 14. (き)急激にここ来て<んっすね>(ん)(だ)(バル)バブルが弾けまして世の中が変わりましたんですね債権者が
S08M1421_0750124_0754665.wav, 15. <えー>そういう<うー>大事な<あー>ことは<あー>必ず記入しておくことと
`;

    function parseTranscriptData(data) {
        const lines = data.trim().split('\n');
        lines.forEach(line => {
            const [filename, text] = line.split(',');
            textMap.set(filename.trim(), text.trim());
        });
    }

    function generateFilePath(system, type, filename) {
        return `${system.baseDir}\\wav-${type}\\${filename}`;
    }

    function updateAudioSources() {
        systems.forEach(system => {
            system.types.forEach((type, typeIndex) => {
                const audioElements = document.querySelectorAll(`.${system.name.toLowerCase()}-audio-${typeIndex}`);
                audioElements.forEach((audio, filenameIndex) => {
                    const newIndex = (currentIndex + filenameIndex) % filenames.length;
                    const filename = filenames[newIndex];
                    const filePath = generateFilePath(system, type, filename);
                    audio.src = filePath;
                    audio.parentElement.load();

                    const displayTextElement = document.getElementById(system.displayElementId);
                    displayTextElement.innerText = textMap.get(filename) || "No text available";
                });
            });
        });
    }

    document.getElementById('prevButton').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + filenames.length) % filenames.length;
        updateAudioSources();
    });

    document.getElementById('nextButton').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % filenames.length;
        updateAudioSources();
    });

    // 初期状態でtranscriptDataを解析してテキストマップを作成
    parseTranscriptData(transcriptData);
    updateAudioSources();
});