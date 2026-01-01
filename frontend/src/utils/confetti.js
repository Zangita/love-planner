import confetti from 'canvas-confetti';

export function fireConfetti() {
    confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff5c8a', '#fbc2eb', '#a6c1ee', '#ffd1dc'],
    });
}