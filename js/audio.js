let allSounds = [];
const backgroundMusic = new Audio("audio/gamemusic-6082.mp3");
const characterHitSound = new Audio("audio/young-man-being-hurt-95628.mp3");
const endbossHitSound = new Audio("audio/chicken-single-alarm-call-6056.mp3");
const enemyHitSound = new Audio(
  "audio/rooster-call-cock-a-doodle-doo-46096.mp3"
);
const characterDeadSound = new Audio("audio/verloren-89595.mp3");
const victorySound = new Audio(
  "audio/165491__chripei__victory-cry-reverb-2.wav"
);
const bottleBreakSound = new Audio("audio/566451__johnny97__break06.wav");
const collectedBottleSound = new Audio(
  "audio/387134__rdaly95__collecting_ammo.wav"
);
const collectedCoinSound = new Audio("audio/446134__justinvoke__collect-2.wav");
const jumpSound = new Audio("audio/cartoon-jump-6462.mp3");
const snoringSound = new Audio("audio/male-snore-1-29322.mp3");

/**
 * Plays audio object for selected time in ms.
 * @param {Audio} audio -- audio object
 * @param {Integer} timeMs -- duration time of audio
 */
function playAudioForMs(audio, timeMs) {
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

/**
 * Reinitialize all sounds for restart game
 */
function initializeAllSounds() {
  allSounds = [];
  allSounds.push(characterHitSound);
  allSounds.push(enemyHitSound);
  allSounds.push(characterDeadSound);
  allSounds.push(victorySound);
  allSounds.push(bottleBreakSound);
  allSounds.push(collectedBottleSound);
  allSounds.push(collectedCoinSound);
  allSounds.push(jumpSound);
  allSounds.push(snoringSound);
  allSounds.push(endbossHitSound);
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
