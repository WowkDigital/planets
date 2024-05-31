const canvas = document.getElementById('solarSystem');
let scale = 1;
let targetScale = 1;
let panX = 0;
let panY = 0;
let targetPanX = 0;
let targetPanY = 0;

// Obsługa powiększania przez scrollowanie
canvas.addEventListener('wheel', (event) => {
    event.preventDefault();
    const zoom = Math.exp(event.deltaY * -0.001);
    targetScale *= zoom;
});

// Obsługa przesuwania przez lewy przycisk myszy
let isPanning = false;
let startX, startY;

canvas.addEventListener('mousedown', (event) => {
    if (event.button === 0) {  // lewy przycisk myszy
        isPanning = true;
        startX = event.clientX - targetPanX;
        startY = event.clientY - targetPanY;
    }
});

canvas.addEventListener('mousemove', (event) => {
    if (isPanning) {
        targetPanX = event.clientX - startX;
        targetPanY = event.clientY - startY;
    }
});

canvas.addEventListener('mouseup', () => {
    isPanning = false;
});

canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

// Funkcja płynnego skalowania i przesuwania
function smoothTransform() {
    const smoothingFactor = 0.1;
    scale += (targetScale - scale) * smoothingFactor;
    panX += (targetPanX - panX) * smoothingFactor;
    panY += (targetPanY - panY) * smoothingFactor;
    requestAnimationFrame(smoothTransform);
}

smoothTransform();

// Eksportowanie zmiennych
export { scale, panX, panY };
