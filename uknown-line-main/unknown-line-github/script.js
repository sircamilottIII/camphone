(() => {
  "use strict";

  const screen = document.querySelector("#number-screen");
  const status = document.querySelector("#status-message");
  const keypad = document.querySelector(".keypad");
  const callButton = document.querySelector("#call-button");
  const deleteButton = document.querySelector("#delete-button");
  const clearButton = document.querySelector("#clear-button");
  const phone = document.querySelector(".phone");

  const MAX_LENGTH = 20;
  let number = "";
  let currentAudio = null;

  // Add your own codes and matching audio files here.
  // File paths are relative, so they work on GitHub Pages project URLs.
  const secretCodes = {
    "25042014": { message: "HAPPY BIRTHDAY!", audio: "./audio/entry-number-17.mp3" },
    "88":  { message: "WHY? JUST WHY?", audio: "./audio/haaland-haaland.mp3" },
    "11011001101001": { message: "HOW DO YOU KNOW THAT?", audio: "./audio/FINDME.APK ~ Project DIVA Deep blue.mp3" },
    "4102": { message: "THIS ISN'T RIGHT", audio: "./audio/pibby-glitch.mp3" },
    "837269738368696568": { message: "NO...NO!", audio: "./audio/heavy-breathing-scream.mp3" }
  };

  function renderNumber() {
    screen.textContent = number || "_";
  }

  function press(key) {
    if (number.length >= MAX_LENGTH) {
      status.textContent = "MAXIMUM NUMBER LENGTH REACHED.";
      return;
    }
    number += key;
    renderNumber();
    status.textContent = "READY TO CONNECT...";
  }

  function stopAudio() {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }
    phone.classList.remove("glitch");
  }

  function clearNumber() {
    stopAudio();
    number = "";
    renderNumber();
    status.textContent = "ENTER A NUMBER...";
  }

  function deleteLast() {
    number = number.slice(0, -1);
    renderNumber();
    if (!number) status.textContent = "ENTER A NUMBER...";
  }

  async function playErrorTone() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    let context;
    try {
      context = new AudioContextClass();
      if (context.state === "suspended") await context.resume();

      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sawtooth";
      oscillator.frequency.value = 95;
      gain.gain.value = 0.035;
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.18);
      oscillator.addEventListener("ended", () => context.close(), { once: true });
    } catch {
      if (context && context.state !== "closed") await context.close();
    }
  }

  async function dial() {
    stopAudio();

    if (!number) {
      status.textContent = "NO NUMBER ENTERED.";
      return;
    }

    const secret = secretCodes[number];

    if (!secret) {
      status.textContent = "NUMBER NOT FOUND.";
      await playErrorTone();
      return;
    }

    status.textContent = secret.message;
    phone.classList.add("glitch");

    currentAudio = new Audio(secret.audio);
    currentAudio.preload = "auto";

    currentAudio.addEventListener("ended", () => {
      phone.classList.remove("glitch");
      status.textContent = "TRANSMISSION ENDED.";
    }, { once: true });

    currentAudio.addEventListener("error", () => {
      phone.classList.remove("glitch");
      status.textContent = "AUDIO NOT FOUND. CHECK THE FILE PATH.";
    }, { once: true });

    try {
      await currentAudio.play();
    } catch {
      phone.classList.remove("glitch");
      status.textContent = "PLAYBACK FAILED. CHECK THE AUDIO FILE.";
    }
  }

  keypad.addEventListener("click", event => {
    const button = event.target.closest("button[data-key]");
    if (button) press(button.dataset.key);
  });

  callButton.addEventListener("click", dial);
  deleteButton.addEventListener("click", deleteLast);
  clearButton.addEventListener("click", clearNumber);

  document.addEventListener("keydown", event => {
    if (/^[0-9*#]$/.test(event.key)) press(event.key);
    else if (event.key === "Backspace") {
      event.preventDefault();
      deleteLast();
    } else if (event.key === "Enter") dial();
    else if (event.key === "Escape") clearNumber();
  });

  renderNumber();
})();
