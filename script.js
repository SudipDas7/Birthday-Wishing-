// 🎊 Confetti Canvas Animation
const canvas = document.getElementById('confetti-canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const confetti = [];
for (let i = 0; i < 150; i++) {
  confetti.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 2,
    d: Math.random() * 10 + 2,
    color: `hsl(${Math.random() * 360}, 100%, 70%)`,
    tilt: Math.random() * 10 - 10
  });
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach((c) => {
    ctx.beginPath();
    ctx.lineWidth = c.r;
    ctx.strokeStyle = c.color;
    ctx.moveTo(c.x + c.tilt, c.y);
    ctx.lineTo(c.x + c.tilt + c.r, c.y + c.r);
    ctx.stroke();
  });
  updateConfetti();
}

function updateConfetti() {
  confetti.forEach((c) => {
    c.y += Math.cos(c.d) + 1 + c.r / 2;
    c.x += Math.sin(c.d);
    if (c.y > canvas.height) {
      c.y = -10;
      c.x = Math.random() * canvas.width;
    }
  });
}

function animate() {
  drawConfetti();
  requestAnimationFrame(animate);
}
//animate();

// 🎉 Countdown to Birthday: May 21 at 1:30 PM
const now = new Date();
const currentYear = now.getFullYear();

// Set birthday date for this year
let birthday = new Date(`March 22, ${currentYear} 23:43:00`);

// If birthday has already passed this year, switch to next year
if (birthday < now) {
  birthday = new Date(`March 22, ${currentYear + 1} 23:36:00`);
}

const countdown = setInterval(() => {
  const currentTime = new Date().getTime();
  const distance = birthday - currentTime;

  if (distance <= 0) {
    clearInterval(countdown);
  
    const countdownCard = document.querySelector(".countdown-card");
    const finalMessage = document.getElementById("final-message");
    const nextBtn = document.getElementById("next-btn");
  
    if (countdownCard) countdownCard.style.display = "none";
    if (finalMessage) finalMessage.style.display = "block";

    const music = document.getElementById("birthday-music");
    if (music) music.play().catch(e => console.log("Autoplay blocked:", e));

    startCelebrationSequence();
  
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        finalMessage.style.display = "none";
        const cakeWrapper = document.getElementById("cake-wrapper");
        if (cakeWrapper) cakeWrapper.style.display = "flex";
      });
    }
  
    return;
  }
  
  
  
 
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update the DOM
  document.getElementById("days").innerText = days.toString().padStart(2, "0");
  document.getElementById("hours").innerText = hours.toString().padStart(2, "0");
  document.getElementById("minutes").innerText = minutes.toString().padStart(2, "0");
  document.getElementById("seconds").innerText = seconds.toString().padStart(2, "0");

}, 1000);

// 🎂 Show Cake After Countdown Ends (example: after 2 mins)
setTimeout(() => {
  document.getElementById("cake-wrapper").style.display = "flex";
}, 120000); // ⏱ change as needed for final timing

// 🕯 Blow Candle Logic
const flame = document.getElementById("flame");
const blowBtn = document.getElementById("blow-btn");
const sparkleCanvas = document.getElementById("sparkleCanvas");
const sparkleCtx = sparkleCanvas.getContext("2d");
sparkleCanvas.width = window.innerWidth;
sparkleCanvas.height = window.innerHeight;

let sparkles = [];

if (blowBtn) {
  blowBtn.addEventListener("click", () => {
    if (flame) flame.style.display = "none";

    // Remove the cake
    const cakeWrapper = document.getElementById("cake-wrapper");
    if (cakeWrapper) cakeWrapper.style.display = "none";

    // Show the birthday wish card
    const wishCard = document.getElementById("wish-card");
    if (wishCard) wishCard.style.display = "block";

    // Start effects
    startSparkles();
    triggerFireworkBlast();
  });
}


function startSparkles() {
  for (let i = 0; i < 200; i++) {
    sparkles.push({
      x: Math.random() * sparkleCanvas.width, // spread across screen
      y: Math.random() * sparkleCanvas.height,
      size: Math.random() * 6 + 3, // make them bigger
      speedX: (Math.random() - 0.5) * 10,
      speedY: (Math.random() - 0.5) * 10,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`
    });
  }
  animateSparkles();
}


function animateSparkles() {
  sparkleCtx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);
  for (let i = 0; i < sparkles.length; i++) {
    const s = sparkles[i];
    sparkleCtx.beginPath();
    sparkleCtx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    sparkleCtx.fillStyle = s.color;
    sparkleCtx.fill();
    s.x += s.speedX;
    s.y += s.speedY;
    s.size *= 0.95;
  }
  sparkles = sparkles.filter(s => s.size > 0.5);
  if (sparkles.length > 0) {
    requestAnimationFrame(animateSparkles);
  }
}

function triggerFireworkBlast() {
  let count = 0;
  const interval = setInterval(() => {
    if (count >= 3) {
      clearInterval(interval);
      return;
    }
    launchFireworks();
    count++;
  }, 1200); // blast every 1.2 seconds
}
function launchFireworks() {
  for (let i = 0; i < 100; i++) {
    sparkles.push({
      x: Math.random() * sparkleCanvas.width,
      y: Math.random() * sparkleCanvas.height,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 8,
      speedY: (Math.random() - 0.5) * 8,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`
    });
  }
  animateSparkles();
}

// Back to start button handler
const backBtn = document.getElementById("back-to-start-btn");

if (backBtn) {
  backBtn.addEventListener("click", () => {
    const wishCard = document.getElementById("wish-card");
    const finalCard = document.getElementById("final-wish-card");
    
    if (wishCard) wishCard.style.display = "none";
    if (finalCard) finalCard.style.display = "block";
  });
}

function startCelebrationSequence() {
  let blastCount = 0;

  const blastInterval = setInterval(() => {
    if (blastCount >= 3) {
      clearInterval(blastInterval);

      // 🎊 After 3 blasts, start falling confetti
      animate();
      return;
    }

    launchFireworks(); // your existing blast logic
    blastCount++;
  }, 1000); // 1 blast per second
}
