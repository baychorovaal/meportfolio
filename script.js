const cursor = document.getElementById("cursor");
const cursorTrail = document.getElementById("cursor-trail");

const isTouchDevice = () =>
  window.matchMedia("(hover: none), (pointer: coarse)").matches ||
  window.innerWidth <= 1024;

if (isTouchDevice()) {
  document.body.classList.add("cursor-disabled");
}

const cursorState = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  trailX: window.innerWidth / 2,
  trailY: window.innerHeight / 2,
};

const setCursorPosition = () => {
  cursor.style.left = `${cursorState.x}px`;
  cursor.style.top = `${cursorState.y}px`;
  cursorTrail.style.left = `${cursorState.trailX}px`;
  cursorTrail.style.top = `${cursorState.trailY}px`;
};

const animateCursor = () => {
  cursorState.trailX += (cursorState.x - cursorState.trailX) * 0.12;
  cursorState.trailY += (cursorState.y - cursorState.trailY) * 0.12;
  setCursorPosition();
  requestAnimationFrame(animateCursor);
};

window.addEventListener("mousemove", (event) => {
  if (document.body.classList.contains("cursor-disabled")) {
    return;
  }
  cursorState.x = event.clientX;
  cursorState.y = event.clientY;
});

const hoverTargets = "a, button, .btn, .project-card, .contact-card";

document.querySelectorAll(hoverTargets).forEach((element) => {
  element.addEventListener("mouseenter", () => {
    if (document.body.classList.contains("cursor-disabled")) {
      return;
    }
    document.body.classList.add("cursor-hover");
  });
  element.addEventListener("mouseleave", () => {
    document.body.classList.remove("cursor-hover");
  });
});

fetch("https://leetcode-stats-api.herokuapp.com/baychorovaal")
  .then((res) => res.json())
  .then((data) => {
    document.getElementById("leetcode-solved").textContent = data.totalSolved;
    document.getElementById("leetcode-easy").textContent = data.easySolved;
    document.getElementById("leetcode-medium").textContent = data.mediumSolved;
    document.getElementById("leetcode-hard").textContent = data.hardSolved;
  })
  .catch(() => {
    document.getElementById("leetcode-solved").textContent = "N/A";
    document.getElementById("leetcode-easy").textContent = "N/A";
    document.getElementById("leetcode-medium").textContent = "N/A";
    document.getElementById("leetcode-hard").textContent = "N/A";
  });

if (!document.body.classList.contains("cursor-disabled")) {
  animateCursor();
}
