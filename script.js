async function fetchValues() {
    try {
        const response = await fetch('values.txt');
        const text = await response.text();
        const lines = text.trim().split('\n');
        const container = document.getElementById('market-container');

        // Clear container in case of refresh
        container.innerHTML = '';

        lines.forEach(line => {
            // Skips empty lines or comments
            if (!line.trim() || line.startsWith('#')) return;

            const [name, price, demand, stock, img] = line.split('|').map(item => item.trim());

            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="textures/${img}" onerror="this.src='https://via.placeholder.com/100?text=No+Image'">
                <h3>${name}</h3>
                <div class="price">💰 ${price}</div>
                <div class="demand-tag">🔥 ${demand} Demand</div>
                <div class="stock">Stock: ${stock}</div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading values.txt:", error);
    }
}

// Load values when the page opens
window.onload = fetchValues;
