const phrases = [
    "learning rust the hard way...",
    "debugging for the thirteenth hour straight...",
    "probably rewriting stuff in Rust for no reason...",
    "fighting the borrow checker and losing gracefully...",
    "using unsafe code safely (I think).",
    "my code compiles, therefore I am.",
    "learning one panic at a time...",
    "writing bugs with love <3",
    "certain people are actively rooting for a repeat offender.",
];

let lastIdx = null;

async function animateText(element, text) {
    element.innerHTML = "";

    // typing animation
    for (const char of text) {
        element.innerHTML += char;
        await new Promise(r => setTimeout(r, 60)); // typing speed
    }

    await new Promise(r => setTimeout(r, 1000)); // pause before highlight

    // highlight effect
    element.style.background = "#b9dcdd";
    element.style.color = "#6FA9BB";
    element.style.transition = "0.2s";
    await new Promise(r => setTimeout(r, 300));

    // deletion animation
    for (let i = text.length; i > 0; i--) {
        element.innerHTML = text.slice(0, i - 1);
        await new Promise(r => setTimeout(r, 30));
    }

    element.style.background = "";
    element.style.color = "";
}

async function startAnimation() {
    const element = document.querySelector(".tagline");

    while (true) {
        let idx;
        do {
            idx = Math.floor(Math.random() * phrases.length);
        } while (idx === lastIdx);

        await animateText(element, phrases[idx]);
        lastIdx = idx;
    }
}

// Start when DOM is ready
document.addEventListener("DOMContentLoaded", startAnimation);