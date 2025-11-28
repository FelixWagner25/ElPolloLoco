let allSounds = [];

const characterHitSound = new Audio(
  "https://cdn.freesound.org/previews/350/350923_5450487-lq.mp3"
);
allSounds.push(characterHitSound);

const enemyHitSound = new Audio(
  "https://cdn.freesound.org/previews/193/193301_7037-lq.mp3"
);
allSounds.push(enemyHitSound);

const characterDeadSound = new Audio(
  "https://cdn.freesound.org/previews/350/350981_5450487-lq.mp3"
);
allSounds.push(characterDeadSound);

const enemyDeadSound = new Audio(
  "https://cdn.freesound.org/previews/165/165491_1617412-lq.mp3"
);
allSounds.push(enemyDeadSound);

const bottleBreakSound = new Audio(
  "https://cdn.freesound.org/previews/566/566451_5409451-lq.mp3"
);
allSounds.push(bottleBreakSound);

const collectedBottleSound = new Audio(
  "https://cdn.freesound.org/previews/387/387134_7161844-lq.mp3"
);
allSounds.push(collectedBottleSound);

const collectedCoinSound = new Audio(
  "https://cdn.freesound.org/previews/446/446134_758593-lq.mp3"
);
allSounds.push(collectedCoinSound);

function playAudioForMs(audio, timeMs) {
  if (gameStatus === "open") {
    audio.currentTime = 0;
    let audioStartTime = new Date().getTime();
    audio.play();
    let samplingInterval50mS = setInterval(() => {
      let currentTime = new Date().getTime();
      if (currentTime - audioStartTime >= timeMs) {
        audio.pause();
        audio.currentTime = 0;
        clearInterval(samplingInterval50mS);
      }
    }, 50);
  }
}

function stopAllSounds() {
  allSounds.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
}
