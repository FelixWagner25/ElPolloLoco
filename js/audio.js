const characterHitSound = new Audio(
  "https://cdn.freesound.org/previews/350/350923_5450487-lq.mp3"
);
const enemyHitSound = new Audio(
  "https://cdn.freesound.org/previews/193/193301_7037-lq.mp3"
);
const characterDeadSound = new Audio(
  "https://cdn.freesound.org/previews/350/350981_5450487-lq.mp3"
);
const enemyDeadSound = new Audio(
  "https://cdn.freesound.org/previews/165/165491_1617412-lq.mp3"
);
const bottleBreakSound = new Audio(
  "https://cdn.freesound.org/previews/566/566451_5409451-lq.mp3"
);
const collectedBottleSound = new Audio(
  "https://cdn.freesound.org/previews/387/387134_7161844-lq.mp3"
);
const collectedCoinSound = new Audio(
  "https://cdn.freesound.org/previews/446/446134_758593-lq.mp3"
);

function playFirstHalfSecond(audio) {
  audio.currentTime = 0;
  audio.play();
  setTimeout(() => {
    audio.pause();
    audio.currentTime = 0;
  }, 500);
}
