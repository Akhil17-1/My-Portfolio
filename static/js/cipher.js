// cipher.js

// Global function to initialize the cipher challenge on the About page.
function initCipherChallenge() {
  const cipherOverlay = document.getElementById('cipher-overlay');
  if (!cipherOverlay) return;

  if (!window.phrases) {
    console.error("Phrases not loaded!");
    return;
  }

  // Helper: Return a random integer from 0 to max - 1.
  const getRandomInt = max => Math.floor(Math.random() * max);

  // Pick a random show.
  const shows = Object.keys(window.phrases);
  const randomShow = shows[getRandomInt(shows.length)];

  // Pick a random phrase from that show's array.
  const phraseArray = window.phrases[randomShow];
  const phrase = phraseArray[getRandomInt(phraseArray.length)];

  // --- Cipher Mechanisms ---
  // 1. Reverse Cipher: Reverses the string.
  const reverseCipher = str => str.split('').reverse().join('');
  
  // 2. Caesar Cipher: Shifts letters by a default of 3.
  const caesarCipher = (str, shift = 3) => {
    return str.split('').map(ch => {
      if (/[a-z]/.test(ch)) {
        const code = ch.charCodeAt(0) - 97;
        return String.fromCharCode(((code + shift) % 26) + 97);
      } else if (/[A-Z]/.test(ch)) {
        const code = ch.charCodeAt(0) - 65;
        return String.fromCharCode(((code + shift) % 26) + 65);
      }
      return ch;
    }).join('');
  };

  // 3. XOR Cipher: Applies XOR with key 42 by default.
  const xorCipher = (str, key = 42) => {
    return str.split('').map(ch => String.fromCharCode(ch.charCodeAt(0) ^ key)).join('');
  };

  // Array of available cipher mechanisms.
  const mechanisms = [
    { name: "reverse", func: reverseCipher },
    { name: "caesar", func: caesarCipher },
    { name: "xor", func: xorCipher }
  ];

  // Pick one mechanism at random.
  const chosen = mechanisms[getRandomInt(mechanisms.length)];
  const ciphered = chosen.func(phrase);

  // Display the cipher challenge prompt.
  const cipherPromptElement = document.getElementById('cipher-prompt');
  if (cipherPromptElement) {
    cipherPromptElement.innerText = `Decode the following cipher (${chosen.name}): ${ciphered}`;
  } else {
    console.error("Cipher prompt element not found.");
  }

  // Store the original phrase for verification.
  window.currentCipherChallenge = {
    original: phrase,
    mechanism: chosen.name,
    ciphered: ciphered
  };

  // Set up the submit button listener.
  const cipherSubmitBtn = document.getElementById('cipher-submit');
  if (cipherSubmitBtn) {
    // Remove any existing listener by replacing the node.
    cipherSubmitBtn.replaceWith(cipherSubmitBtn.cloneNode(true));
    document.getElementById('cipher-submit').addEventListener('click', () => {
      const userInput = document.getElementById('cipher-input').value.trim();
      if (userInput === window.currentCipherChallenge.original) {
        alert("Cipher cracked! Appreciate your efforts, letting you in.");
      } else {
        alert(`Appreciate your efforts! The correct answer was: "${window.currentCipherChallenge.original}". I'm letting you in anyway.`);
      }
      // Remove the overlay and remove the blur from the full content.
      cipherOverlay.style.display = 'none';
      const pageWrapper = document.getElementById('page-wrapper');
      if (pageWrapper) pageWrapper.style.filter = 'none';
    });
  } else {
    console.error("Cipher submit button not found.");
  }
}

// Expose the initializer globally.
window.initCipherChallenge = initCipherChallenge;