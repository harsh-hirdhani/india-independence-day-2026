const particleContainer =
    document.querySelector(".particles");

const particleColors = [
    "#ff9933",
    "#ffffff",
    "#138808"
];

for (let i = 0; i < 40; i++) {

    const particle = document.createElement("span");

    particle.classList.add("particle");

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.animationDuration =
        8 + Math.random() * 12 + "s";

    particle.style.animationDelay =
        Math.random() * 8 + "s";

    particle.style.background =
        particleColors[
            Math.floor(
                Math.random() * particleColors.length
            )
        ];

    particleContainer.appendChild(particle);
}
// INDEPENDENCE DAY COUNTDOWN

const independenceDay =
    new Date("August 15, 2026 00:00:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();

    const difference =
        independenceDay - now;

    if (difference <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;
    }

    const days =
        Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

    const minutes =
        Math.floor(
            (difference / (1000 * 60)) % 60
        );

    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

updateCountdown();

setInterval(updateCountdown, 1000);
// MUSIC PLAYER

const music =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");

musicButton.addEventListener("click", function () {

    if (music.paused) {

        music.play();

        musicButton.textContent =
            "⏸ Pause Music";

    } else {

        music.pause();

        musicButton.textContent =
            "▶ Play Music";
    }

});
// Celebrate India button

const celebrateButton =
    document.getElementById("celebrateButton");

const celebrationMessage =
    document.getElementById("celebrationMessage");

celebrateButton.addEventListener(
    "click",
    function () {

        celebrationMessage.style.display =
            "block";

        // Launch several fireworks

        for (let i = 0; i < 8; i++) {

            setTimeout(function () {

                createFirework();

            }, i * 300);
        }
    }
);
// ===============================
// INDEPENDENCE DAY FIREWORKS
// ===============================

const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

let fireworks = [];
let particles = [];

function createFirework() {

    const x = Math.random() * canvas.width;
    const y = Math.random() * (canvas.height * 0.55);

    fireworks.push({
        x: x,
        y: canvas.height,
        targetY: y,
        speed: 8
    });
}

function explode(x, y) {

    const colors = [
        "#ff9933",
        "#ffffff",
        "#138808"
    ];

    for (let i = 0; i < 60; i++) {

        const angle =
            Math.random() * Math.PI * 2;

        const speed =
            Math.random() * 6 + 2;

        particles.push({
            x: x,
            y: y,

            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,

            alpha: 1,

            color:
                colors[
                    Math.floor(
                        Math.random() * colors.length
                    )
                ]
        });
    }
}

function animateFireworks() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // Fireworks going upward

    fireworks.forEach((firework, index) => {

        firework.y -= firework.speed;

        ctx.beginPath();

        ctx.arc(
            firework.x,
            firework.y,
            3,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#ffffff";
        ctx.fill();

        if (firework.y <= firework.targetY) {

            explode(
                firework.x,
                firework.y
            );

            fireworks.splice(index, 1);
        }
    });

    // Explosion particles

    particles.forEach((particle, index) => {

        particle.x += particle.vx;
        particle.y += particle.vy;

        particle.vy += 0.04;

        particle.alpha -= 0.015;

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            2,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            particle.color;

        ctx.globalAlpha =
            particle.alpha;

        ctx.fill();

        ctx.globalAlpha = 1;

        if (particle.alpha <= 0) {
            particles.splice(index, 1);
        }
    });

    requestAnimationFrame(
        animateFireworks
    );
}

animateFireworks();
function playMusic() {
    const music = document.getElementById("backgroundMusic");
    const button = document.getElementById("musicButton");

    if (music.paused) {
        music.play()
            .then(function () {
                button.innerHTML = "⏸ Pause Music";
            })
            .catch(function (error) {
                console.log(error);
                alert("Music file cannot be played. Please check the MP3 file.");
            });
    } else {
        music.pause();
        button.innerHTML = "▶ Play Music";
    }
}
