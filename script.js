document.addEventListener('DOMContentLoaded', async () => {
    const paletteSelector = document.getElementById('palette-selector');
    const paletteContainer = document.getElementById('palette');

    const response = await fetch('pallete.json');
    const palettes = await response.json();

    palettes.forEach(palette => {
        const option = document.createElement('option');
        option.value = palette.id;
        option.textContent = `${palette.emoji} ${palette.paletteName}`;
        paletteSelector.appendChild(option);
    });

    function renderPalette(paletteId) {
        paletteContainer.innerHTML = '';
        const selectedPalette = palettes.find(palette => palette.id === paletteId);
        if (selectedPalette) {
            selectedPalette.colors.forEach(({ color, name }) => {
                const colorBox = document.createElement('div');
                colorBox.className = 'color-box';
                colorBox.style.backgroundColor = color;
                colorBox.textContent = name;

                colorBox.addEventListener('click', () => {
                    playNotification(); 
                    navigator.clipboard.writeText(color).then(() => {
                        showPopup(name, color); 
                    });
                });

                paletteContainer.appendChild(colorBox);
            });
        }
    }

    function playNotification() {
        const sound = new Audio('src_notify.mp3');
        sound.play();
    }

    function showPopup(name, color) {
        const popup = document.createElement('div');
        popup.className = 'popup';
        popup.style.backgroundColor = color;
        popup.innerHTML = `<p>Copied: ${name}</p>`;
        document.body.appendChild(popup);

        setTimeout(() => {
            popup.remove();
        }, 2000);
    }

    paletteSelector.addEventListener('change', (e) => {
        renderPalette(e.target.value);
    });

    if (palettes.length > 0) {
        renderPalette(palettes[0].id);
    }
});
