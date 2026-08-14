// ==========================================
// TRICOLOR PARTICLES
// ==========================================

const particleContainer =
    document.getElementById("particles");

const particleColors = [
    "#ff9933",
    "#ffffff",
    "#138808"
];


for (let i = 0; i < 60; i++) {

    const particle =
        document.createElement("span");

    particle.className = "particle";

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.animationDuration =
        (7 + Math.random() * 10) + "s";

    particle.style.animationDelay =
        (Math.random() * 8) + "s";

    particle.style.background =
        particleColors[
            Math.floor(
                Math.random() *
                particleColors.length
            )
        ];

    particleContainer.appendChild(
        particle
    );
}



// ==========================================
// COUNTDOWN
// ==========================================

const independenceDay =
    new Date(
        "August 15, 2026 00:00:00"
    ).getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    const difference =
        independenceDay - now;


    if (difference <= 0) {

        document.getElementById("days")
            .textContent = "00";

        document.getElementById("hours")
            .textContent = "00";

        document.getElementById("minutes")
            .textContent = "00";

        document.getElementById("seconds")
            .textContent = "00";

        return;
    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference /
                (1000 * 60 * 60)) % 24
        );


    const minutes =
        Math.floor(
            (difference /
                (1000 * 60)) % 60
        );


    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );


    document.getElementById("days")
        .textContent =
        String(days).padStart(2, "0");


    document.getElementById("hours")
        .textContent =
        String(hours).padStart(2, "0");


    document.getElementById("minutes")
        .textContent =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds")
        .textContent =
        String(seconds).padStart(2, "0");
}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);



// ==========================================
// MUSIC PLAYER
// ==========================================

const music =
    document.getElementById(
        "backgroundMusic"
    );


const musicButton =
    document.getElementById(
        "musicButton"
    );


musicButton.addEventListener(
    "click",
    async function () {

        try {

            if (music.paused) {

                await music.play();

                musicButton.textContent =
                    "⏸ Pause Music";

            } else {

                music.pause();

                musicButton.textContent =
                    "▶ Play Music";

            }

        } catch (error) {

            console.error(
                "Music error:",
                error
            );

            alert(
                "Music could not be played. Make sure independence-song.mp3 is in the same folder as index.html."
            );

        }

    }
);



// ==========================================
// CELEBRATE BUTTON
// ==========================================

const celebrateButton =
    document.getElementById(
        "celebrateButton"
    );


const celebrationMessage =
    document.getElementById(
        "celebrationMessage"
    );


celebrateButton.addEventListener(
    "click",
    function () {

        celebrationMessage.style.display =
            "block";


        for (
            let i = 0;
            i < 12;
            i++
        ) {

            setTimeout(
                function () {

                    createFirework();

                },
                i * 250
            );

        }

    }
);



// ==========================================
// FIREWORKS
// ==========================================

const canvas =
    document.getElementById(
        "fireworksCanvas"
    );


const ctx =
    canvas.getContext("2d");


function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;
}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


let fireworks = [];

let explosionParticles = [];



// ==========================================
// CREATE FIREWORK
// ==========================================

function createFirework() {

    const x =
        Math.random() *
        canvas.width;


    const targetY =
        100 +
        Math.random() *
        (canvas.height * 0.45);


    fireworks.push({

        x: x,

        y: canvas.height,

        targetY: targetY,

        speed:
            7 +
            Math.random() * 3

    });
}



// ==========================================
// EXPLODE
// ==========================================

function explode(
    x,
    y
) {

    const colors = [
        "#ff9933",
        "#ffffff",
        "#138808"
    ];


    for (
        let i = 0;
        i < 80;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI * 2;


        const speed =
            2 +
            Math.random() * 7;


        explosionParticles.push({

            x: x,

            y: y,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            alpha: 1,

            size:
                1 +
                Math.random() * 3,

            color:
                colors[
                    Math.floor(
                        Math.random() *
                        colors.length
                    )
                ]

        });

    }

}



// ==========================================
// ANIMATE FIREWORKS
// ==========================================

function animateFireworks() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Rockets

    fireworks.forEach(
        function (
            firework,
            index
        ) {

            firework.y -=
                firework.speed;


            ctx.beginPath();


            ctx.arc(
                firework.x,
                firework.y,
                3,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                "#ffffff";


            ctx.fill();


            if (
                firework.y <=
                firework.targetY
            ) {

                explode(
                    firework.x,
                    firework.y
                );


                fireworks.splice(
                    index,
                    1
                );

            }

        }
    );


    // Explosion particles

    explosionParticles.forEach(
        function (
            particle,
            index
        ) {

            particle.x +=
                particle.vx;


            particle.y +=
                particle.vy;


            particle.vy +=
                0.05;


            particle.alpha -=
                0.015;


            ctx.globalAlpha =
                particle.alpha;


            ctx.beginPath();


            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                particle.color;


            ctx.fill();


            if (
                particle.alpha <= 0
            ) {

                explosionParticles.splice(
                    index,
                    1
                );

            }

        }
    );


    ctx.globalAlpha = 1;


    requestAnimationFrame(
        animateFireworks
    );
}


animateFireworks();
