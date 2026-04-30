async function fetchValues() {
    try {
        const response = await fetch('values.txt');
        const text = await response.text();
        const lines = text.trim().split('\n');
        const container = document.getElementById('market-container');

        lines.forEach(line => {
            if (!line.trim() || line.startsWith('#')) return;

            const [name, price, demand, stock, img] = line.split('|').map(item => item.trim());

            const card = document.createElement('div');
            card.className = 'card';
            
            // This attribute tells Tilt.js how to behave
            card.setAttribute('data-tilt', '');
            card.setAttribute('data-tilt-max', '15'); 
            card.setAttribute('data-tilt-speed', '400');
            card.setAttribute('data-tilt-glare', 'true');
            card.setAttribute('data-tilt-max-glare', '0.3');

            card.innerHTML = `
                <img src="textures/${img}" onerror="this.src='https://via.placeholder.com/120'">
                <h3>${name}</h3>
                <div class="price">💰 ${price}</div>
                <div class="demand-tag">${demand}</div>
                <div style="margin-top:10px; color:#666">Stock: ${stock}</div>
            `;
            
            container.appendChild(card);
        });

        // Initialize Tilt on the newly created cards
        VanillaTilt.init(document.querySelectorAll(".card"));

    } catch (error) {
        console.error("Error:", error);
    }
}

window.onload = fetchValues;
