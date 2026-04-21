const word = "  kraizer  ";
const nextWord = "enter here";
const stage = document.getElementById("stage");
let currentWord = word;

// Function to get responsive font size
function getFontSize() {
  const vw = window.innerWidth * 0.08;
  return Math.max(24, Math.min(96, vw));
}

// Function to get text width
function getTextWidth(text, fontSize) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = fontSize + 'px Arial';
  return ctx.measureText(text).width;
}

// Get current font size
const fontSize = getFontSize();

// Calculate positions
let positions = [];
let x = 0;
const gap = 20;

for (let i = 0; i < word.length; i++) {
  positions.push(x);
  x += getTextWidth(word[i], fontSize) + gap;
}

const totalWidth = x - gap;
const startX = window.innerWidth / 2 - totalWidth / 2;
const startY = window.innerHeight / 2 - fontSize / 2;

let delay = 3000;
const letterGroups = [];

// Assemble initial word
[...word].forEach((char, i) => {
  const pieces = 4;
  letterGroups[i] = [];

  currentWord = word;

  for (let p = 0; p < pieces; p++) {
    const span = document.createElement("span");
    span.className = "fragment";
    span.textContent = char;

    span.style.left = `${startX + positions[i]}px`;
    span.style.top = `${startY}px`;

    span.style.setProperty("--sx", `${(Math.random() - 0.5) * 800}px`);
    span.style.setProperty("--sy", `${(Math.random() - 0.5) * 600}px`);
    span.style.setProperty("--rot", `${(Math.random() - 0.5) * 120}deg`);

    stage.appendChild(span);
    letterGroups[i].push(span);

    // Add click handler for clickable text
    span.addEventListener('click', () => {
      if (span.classList.contains('clickable')) {
        window.location.href = 'WebpageLayouts/placeholder.html';
      }
    });

    setTimeout(() => {
      span.classList.add("assemble");
    }, delay);

    delay += 60;
  }
});

// 🔁 Flip letters, THEN reveal "enter"
setTimeout(() => {

  currentWord = nextWord;

  // 1️⃣ Flip OUT (hide original word)
  letterGroups.forEach(group => {
    group.forEach(span => {
      span.classList.add("flip-out");
    });
  });

  // 2️⃣ After flip-out completes, change text + flip IN
  setTimeout(() => {
    const currentFontSize = getFontSize();

    letterGroups.forEach((group, i) => {
      const newChar = nextWord[i] || "";

      group.forEach(span => {
        span.textContent = newChar;
        if (newChar) {
          span.classList.add('clickable');
        } else {
          span.classList.remove('clickable');
        }
        span.classList.remove("flip-out");
        span.classList.add("flip-in");
      });
    });

    // Reposition for equal spacing in "enter"
    positions = [];
    let x = 0;
    for (let i = 0; i < nextWord.length; i++) {
      positions.push(x);
      x += getTextWidth(nextWord[i], currentFontSize) + gap;
    }
    const newTotalWidth = x - gap;
    const newStartX = window.innerWidth / 2 - newTotalWidth / 2;
    const newStartY = window.innerHeight / 2 - currentFontSize / 2;

    // Update positions
    letterGroups.forEach((group, i) => {
      if (i < nextWord.length) {
        group.forEach(span => {
          span.style.left = `${newStartX + positions[i]}px`;
          span.style.top = `${newStartY}px`;
        });
      } else {
        group.forEach(span => {
          span.style.display = 'none';
        });
      }
    });
  }, 600); // must match flipOut duration
}, 13000);

  // currentWord = nextWord;

// Start word flip loop after initial animations
function startWordFlipLoop(
  firstWord,
  secondWord,
  delayAfterEnter = 5000
) {
  let showingSecond = false;

  function flipTo(targetWord) {

    // Flip OUT
    letterGroups.forEach(group => {
      group.forEach(span => {
        span.classList.remove("flip-in");
        span.classList.add("flip-out");
      });
    });

    // After flip-out completes
    setTimeout(() => {

      const currentFontSize = getFontSize();

      // Recalculate spacing for target word
      let positions = [];
      let x = 0;
      for (let i = 0; i < targetWord.length; i++) {
        positions.push(x);
        x += getTextWidth(targetWord[i], currentFontSize) + gap;
      }

      const totalWidth = x - gap;
      const newStartX = window.innerWidth / 2 - totalWidth / 2;
      const newStartY = window.innerHeight / 2 - currentFontSize / 2;

      // Swap letters + reposition
      letterGroups.forEach((group, i) => {
        if (i < targetWord.length) {
          group.forEach(span => {
            span.style.display = '';
            span.textContent = targetWord[i];
            if (targetWord === nextWord) {
              span.classList.add('clickable');
            } else {
              span.classList.remove('clickable');
            }
            span.style.left = `${newStartX + positions[i]}px`;
            span.style.top = `${newStartY}px`;
            span.classList.remove("flip-out");
            span.classList.add("flip-in");
          });
        } else {
          group.forEach(span => {
            span.style.display = 'none';
            span.classList.remove('clickable');
          });
        }
      });

    }, 600); // flip-out duration
  }

  // currentWord = targetWord;

  function loop() {
    if (!showingSecond) {
      flipTo(secondWord);
      showingSecond = true;
      setTimeout(loop, delayAfterEnter);
      currentWord = secondWord;
    } else {
      flipTo(firstWord);
      showingSecond = false;
      setTimeout(loop, 5000);
      currentWord = firstWord;
    }
  }

  loop();
}

// --- Popup Windows Background Effect ---
function createPopupWindowsBackground() {
  const popupBackground = document.getElementById('popup-background');
  if (!popupBackground) return;

  // Remove existing popups if any
  popupBackground.innerHTML = '';

  const popupCount = 12;
  const titles = [
    'Welcome', 'Info', 'Notice', 'Hello!', 'Update', 'System',
    'Alert', 'Message', 'Tip', 'About', 'Contact', 'Help'
  ];
  const contents = [
    'Enjoy exploring Kraizer!',
    'This is a demo window.',
    'All systems operational.',
    'Check out the features.',
    'Stay tuned for updates.',
    'Need help? Reach out!',
    'Random popup for style.',
    'Drag and drop coming soon.',
    'Try resizing your window.',
    'More features on the way.',
    'Thanks for visiting!',
    'Have a great day!'
  ];

  for (let i = 0; i < popupCount; i++) {
    const popup = document.createElement('div');
    popup.className = 'popup-window';
    // Random position within viewport
    const left = Math.random() * (window.innerWidth - 280) + 10;
    const top = Math.random() * (window.innerHeight - 180) + 10;
    popup.style.left = `${left}px`;
    popup.style.top = `${top}px`;
    // Staggered animation delay
    popup.style.transitionDelay = `${0.2 + i * 0.13}s`;

    // Title bar
    const titleBar = document.createElement('div');
    titleBar.className = 'title-bar';
    titleBar.textContent = titles[i % titles.length];
    popup.appendChild(titleBar);

    // Content
    const content = document.createElement('div');
    content.className = 'content';
    content.textContent = contents[i % contents.length];
    popup.appendChild(content);

    popupBackground.appendChild(popup);
    // Animate in
    setTimeout(() => popup.classList.add('visible'), 100 + i * 180);
  }
}

window.addEventListener('DOMContentLoaded', createPopupWindowsBackground);
window.addEventListener('resize', createPopupWindowsBackground);

// Start the loop after initial animations
setTimeout(() => {
  startWordFlipLoop(nextWord, word, 5000);
}, 18000);

// Handle window resize
window.addEventListener('resize', () => {
  const newFontSize = getFontSize();
  // Recalculate positions for currentWord
  let positions = [];
  let x = 0;
  for (let i = 0; i < currentWord.length; i++) {
    positions.push(x);
    x += getTextWidth(currentWord[i], newFontSize) + gap;
  }
  const totalWidth = x - gap;
  const newStartX = window.innerWidth / 2 - totalWidth / 2;
  const newStartY = window.innerHeight / 2 - newFontSize / 2;
  // Update all visible spans
  letterGroups.forEach((group, i) => {
    if (i < currentWord.length) {
      group.forEach(span => {
        span.style.left = `${newStartX + positions[i]}px`;
        span.style.top = `${newStartY}px`;
      });
    }
  });
});

