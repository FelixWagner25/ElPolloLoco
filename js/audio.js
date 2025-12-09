let allSounds = [];
const characterHitSound = new Audio("audio/350923__cabled_mess__hurt_c_01.wav");
const enemyHitSound = new Audio("audio/193301__timkahn__match-strike-05.wav");
const characterDeadSound = new Audio(
  "audio/350981__cabled_mess__lose_c_09.wav"
);
const enemyDeadSound = new Audio(
  "audio/165491__chripei__victory-cry-reverb-2.wav"
);
const bottleBreakSound = new Audio("audio/566451__johnny97__break06.wav");
const collectedBottleSound = new Audio(
  "audio/387134__rdaly95__collecting_ammo.wav"
);
const collectedCoinSound = new Audio("audio/446134__justinvoke__collect-2.wav");

/**
 * Plays audio object for selected time in ms.
 * @param {Audio} audio -- audio object
 * @param {Integer} timeMs -- duration time of audio
 */
function playAudioForMs(audio, timeMs) {
  if (gameStatus === "open") {
    audio.currentTime = 0;
    let audioStartTime = new Date().getTime();
    let currentTime = 0;
    audio.play();
    let samplingInterval50mS = setInterval(() => {
      currentTime = new Date().getTime();
      if (currentTime - audioStartTime >= timeMs) {
        audio.pause();
        audio.currentTime = 0;
        clearInterval(samplingInterval50mS);
      }
    }, 50);
  }
}

/**
 * Reinitialize all sounds for restart game
 */
function initializeAllSounds() {
  allSounds = [];
  allSounds.push(characterHitSound);
  allSounds.push(enemyHitSound);
  allSounds.push(characterDeadSound);
  allSounds.push(enemyDeadSound);
  allSounds.push(bottleBreakSound);
  allSounds.push(collectedBottleSound);
  allSounds.push(collectedCoinSound);
}

/**
 * Stops all audios.
 */
function stopAllSounds() {
  allSounds.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
}
