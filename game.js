const hiragana = [
  { char: 'あ', romaji: 'a' }, { char: 'い', romaji: 'i' }, { char: 'う', romaji: 'u' },
  { char: 'え', romaji: 'e' }, { char: 'お', romaji: 'o' },
  { char: 'か', romaji: 'ka' }, { char: 'き', romaji: 'ki' }, { char: 'く', romaji: 'ku' },
  { char: 'け', romaji: 'ke' }, { char: 'こ', romaji: 'ko' },
  { char: 'さ', romaji: 'sa' }, { char: 'し', romaji: 'shi' }, { char: 'す', romaji: 'su' },
  { char: 'せ', romaji: 'se' }, { char: 'そ', romaji: 'so' },
  { char: 'た', romaji: 'ta' }, { char: 'ち', romaji: 'chi' }, { char: 'つ', romaji: 'tsu' },
  { char: 'て', romaji: 'te' }, { char: 'と', romaji: 'to' },
  { char: 'な', romaji: 'na' }, { char: 'に', romaji: 'ni' }, { char: 'ぬ', romaji: 'nu' },
  { char: 'ね', romaji: 'ne' }, { char: 'の', romaji: 'no' },
  { char: 'は', romaji: 'ha' }, { char: 'ひ', romaji: 'hi' }, { char: 'ふ', romaji: 'fu' },
  { char: 'へ', romaji: 'he' }, { char: 'ほ', romaji: 'ho' },
  { char: 'ま', romaji: 'ma' }, { char: 'み', romaji: 'mi' }, { char: 'む', romaji: 'mu' },
  { char: 'め', romaji: 'me' }, { char: 'も', romaji: 'mo' },
  { char: 'や', romaji: 'ya' }, { char: 'ゆ', romaji: 'yu' }, { char: 'よ', romaji: 'yo' },
  { char: 'ら', romaji: 'ra' }, { char: 'り', romaji: 'ri' }, { char: 'る', romaji: 'ru' },
  { char: 'れ', romaji: 're' }, { char: 'ろ', romaji: 'ro' },
  { char: 'わ', romaji: 'wa' }, { char: 'を', romaji: 'wo' }, { char: 'ん', romaji: 'n' }
];

const katakana = [
  { char: 'ア', romaji: 'a' }, { char: 'イ', romaji: 'i' }, { char: 'ウ', romaji: 'u' },
  { char: 'エ', romaji: 'e' }, { char: 'オ', romaji: 'o' },
  { char: 'カ', romaji: 'ka' }, { char: 'キ', romaji: 'ki' }, { char: 'ク', romaji: 'ku' },
  { char: 'ケ', romaji: 'ke' }, { char: 'コ', romaji: 'ko' },
  { char: 'サ', romaji: 'sa' }, { char: 'シ', romaji: 'shi' }, { char: 'ス', romaji: 'su' },
  { char: 'セ', romaji: 'se' }, { char: 'ソ', romaji: 'so' },
  { char: 'タ', romaji: 'ta' }, { char: 'チ', romaji: 'chi' }, { char: 'ツ', romaji: 'tsu' },
  { char: 'テ', romaji: 'te' }, { char: 'ト', romaji: 'to' },
  { char: 'ナ', romaji: 'na' }, { char: 'ニ', romaji: 'ni' }, { char: 'ヌ', romaji: 'nu' },
  { char: 'ネ', romaji: 'ne' }, { char: 'ノ', romaji: 'no' },
  { char: 'ハ', romaji: 'ha' }, { char: 'ヒ', romaji: 'hi' }, { char: 'フ', romaji: 'fu' },
  { char: 'ヘ', romaji: 'he' }, { char: 'ホ', romaji: 'ho' },
  { char: 'マ', romaji: 'ma' }, { char: 'ミ', romaji: 'mi' }, { char: 'ム', romaji: 'mu' },
  { char: 'メ', romaji: 'me' }, { char: 'モ', romaji: 'mo' },
  { char: 'ヤ', romaji: 'ya' }, { char: 'ユ', romaji: 'yu' }, { char: 'ヨ', romaji: 'yo' },
  { char: 'ラ', romaji: 'ra' }, { char: 'リ', romaji: 'ri' }, { char: 'ル', romaji: 'ru' },
  { char: 'レ', romaji: 're' }, { char: 'ロ', romaji: 'ro' },
  { char: 'ワ', romaji: 'wa' }, { char: 'ヲ', romaji: 'wo' }, { char: 'ン', romaji: 'n' }
];

let currentSet = [];
let currentIndex = 0;
let correctCount = 0;
let waiting = false;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startGame(type) {
  currentSet = type === 'hiragana' ? [...hiragana] : [...katakana];
  shuffle(currentSet);
  currentIndex = 0;
  correctCount = 0;
  document.getElementById('score').innerText = 'Correct: 0';
  document.getElementById('home').style.display = 'none';
  document.getElementById('endScreen').style.display = 'none';
  document.getElementById('game').style.display = 'block';
  showCharacter();
}

function showCharacter() {
  if (currentIndex >= currentSet.length) {
    endGame();
    return;
  }
  const current = currentSet[currentIndex];
  document.getElementById('kanaChar').innerText = current.char;
  document.getElementById('answerInput').value = '';
  document.getElementById('feedback').innerText = '';
  document.getElementById('answerInput').focus();
  waiting = false;
}

function submitAnswer() {
  if (waiting) return;
  waiting = true;

  const input = document.getElementById('answerInput').value.trim().toLowerCase();
  const current = currentSet[currentIndex];
  if (input === current.romaji) {
    correctCount++;
    document.getElementById('feedback').innerText = 'Correct!';
    document.getElementById('feedback').style.color = 'green';
  } else {
    document.getElementById('feedback').innerText = `Wrong! Correct: ${current.romaji}`;
    document.getElementById('feedback').style.color = 'red';
  }
  document.getElementById('score').innerText = `Correct: ${correctCount}`;
  currentIndex++;
  setTimeout(showCharacter, 1000);
}

function endGame() {
  document.getElementById('game').style.display = 'none';
  document.getElementById('endScreen').style.display = 'block';
  document.getElementById('finalScore').innerText = `You got ${correctCount} out of ${currentSet.length} correct!`;
}

function goHome() {
  document.getElementById('game').style.display = 'none';
  document.getElementById('endScreen').style.display = 'none';
  document.getElementById('home').style.display = 'block';
}

document.getElementById('answerInput').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    submitAnswer();
  }
});