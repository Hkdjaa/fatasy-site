// --- Mouse sparkle trail ---
document.addEventListener('mousemove', e => {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = e.pageX + 'px';
    sparkle.style.top = e.pageY + 'px';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 500);
});

// --- Popup modals ---
function openModal(id) {
    document.getElementById(id).style.display = 'flex';
}
function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

document.querySelectorAll('input, textarea, button').forEach(el => {
    el.addEventListener('mousemove', e => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.width = '4px';
        sparkle.style.height = '4px';
        sparkle.style.left = e.pageX + 'px';
        sparkle.style.top = e.pageY + 'px';
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 400);
    });
});