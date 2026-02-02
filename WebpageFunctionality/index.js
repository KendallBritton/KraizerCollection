const word = "kraizer";
const stage = document.getElementById("stage");

// Center positioning
const startX = window.innerWidth / 2 - (word.length * 48);
const startY = window.innerHeight / 2 - 48;

let delay = 0;

[...word].forEach((char, i) => {
  const pieces = 4; // fragments per letter

  for (let p = 0; p < pieces; p++) {
    const span = document.createElement("span");
    span.className = "fragment";
    span.textContent = char;

    const offsetX = i * 96;
    const offsetY = 0;

    span.style.left = `${startX + offsetX}px`;
    span.style.top = `${startY + offsetY}px`;

    // random start scatter
    span.style.setProperty("--sx", `${(Math.random() - 0.5) * 800}px`);
    span.style.setProperty("--sy", `${(Math.random() - 0.5) * 600}px`);
    span.style.setProperty("--rot", `${(Math.random() - 0.5) * 120}deg`);

    stage.appendChild(span);

    setTimeout(() => {
      span.classList.add("assemble");
    }, delay);

    delay += 60;
  }
});

// Show enter button after 10 seconds
setTimeout(() => {
  const button = document.getElementById('enter-button');
  if (button) {
    button.style.display = 'block';
  }
}, 10000);

// Add click handler for enter button
document.getElementById('enter-button').addEventListener('click', () => {
  window.location.href = 'WebpageLayouts/placeholder.html';
});