async function fetchValues() {
    try {
        const response = await fetch('values.txt');
        if (!response.ok) throw new Error('Could not find values.txt');
        
        const text = await response.text();
        const lines = text.trim().split('\n');
        const container = document.getElementById('market-container');

        // Clear container to prevent duplicates
        container.innerHTML = '';

        lines.forEach(line => {
            // Ignore empty lines or comments
            if (!line.trim() || line.startsWith('#')) return;

            const [name, price, demand, stock, img] = line.split('|').map(item => item.trim());

            const card = document.createElement('div');
            card.className = 'card';
            
            // 3D Tilt Settings for the Cards
            card.setAttribute('data-tilt', '');
            card.setAttribute('data-tilt-max', '15'); 
            card.setAttribute('data-tilt-speed', '400');
            card.setAttribute('data-tilt-glare', 'true');
            card.setAttribute('data-tilt-max-glare', '0.3');
            card.setAttribute('data-tilt-perspective', '1000');

            card.innerHTML = `
                <img src="textures/${img}" onerror="this.src='https://via.placeholder.com/120?text=No+Img'">
                <h3>${name}</h3>
                <div class="price">💰 ${price}</div>
                <div class="demand-tag">${demand}</div>
                <div class="stock-info">Stock: ${stock}</div>
            `;
            
            container.appendChild(card);
        });

        // 1. Initialize 3D effect on the Item Cards
        VanillaTilt.init(document.querySelectorAll(".card"));

        // 2. Initialize 3D effect on Background Shapes (The "Shards")
        // We set these to move slightly differently for a parallax feel
        VanillaTilt.init(document.querySelectorAll(".shape"), {
            max: 10,
            speed: 1000,
            perspective: 2000,
            "mouse-event-element": document.body // Makes them react even if mouse isn't directly over them
        });

    } catch (error) {
        console.error("Techblox Market Error:", error);
    }
}

// Ensure the function runs after the page has loaded
window.onload = fetchValues;
