const word = "kraizer";
const nextWord = "enter";
const stage = document.getElementById("stage");

// Function to get text width
function getTextWidth(text) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = '96px Arial';
  return ctx.measureText(text).width;
}

// Calculate positions
let positions = [];
let x = 0;
const gap = 20;

for (let i = 0; i < word.length; i++) {
  positions.push(x);
  x += getTextWidth(word[i]) + gap;
}

const totalWidth = x - gap;
const startX = window.innerWidth / 2 - totalWidth / 2;
const startY = window.innerHeight / 2 - 48;

let delay = 3000;
const letterGroups = [];

// Assemble initial word
[...word].forEach((char, i) => {
  const pieces = 4;
  letterGroups[i] = [];

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

    setTimeout(() => {
      span.classList.add("assemble");
    }, delay);

    delay += 60;
  }
});

// 🔁 Flip letters, THEN reveal "enter"
setTimeout(() => {

  // 1️⃣ Flip OUT (hide original word)
  letterGroups.forEach(group => {
    group.forEach(span => {
      span.classList.add("flip-out");
    });
  });

  // 2️⃣ After flip-out completes, change text + flip IN
  setTimeout(() => {
    letterGroups.forEach((group, i) => {
      const newChar = nextWord[i] || "";

      group.forEach(span => {
        span.textContent = newChar;
        span.classList.remove("flip-out");
        span.classList.add("flip-in");
      });
    });

    // Reposition for equal spacing in "enter"
    positions = [];
    let x = 0;
    for (let i = 0; i < nextWord.length; i++) {
      positions.push(x);
      x += getTextWidth(nextWord[i]) + gap;
    }
    const newTotalWidth = x - gap;
    const newStartX = window.innerWidth / 2 - newTotalWidth / 2;

    // Update positions
    letterGroups.forEach((group, i) => {
      if (i < nextWord.length) {
        group.forEach(span => {
          span.style.left = `${newStartX + positions[i]}px`;
        });
      } else {
        group.forEach(span => {
          span.style.display = 'none';
        });
      }
    });
  }, 600); // must match flipOut duration

}, 13000);
