async function fetchValues() {
    try {
        const response = await fetch('values.txt');
        if (!response.ok) throw new Error('Could not find values.txt');
        
        const text = await response.text();
        const lines = text.trim().split('\n');
        const container = document.getElementById('market-container');

        container.innerHTML = '';

        lines.forEach(line => {
            if (!line.trim() || line.startsWith('#')) return;

            const [name, price, demand, stock, img] = line.split('|').map(item => item.trim());

            const card = document.createElement('div');
            card.className = 'card';
            
            // Note: We move the configuration into the VanillaTilt.init 
            // call below for better control over the "Pro" effects.
            card.innerHTML = `
                <img src="textures/${img}" onerror="this.src='https://via.placeholder.com/140?text=No+Img'">
                <h3>${name}</h3>
                <div class="price">💰 ${price}</div>
                <div class="demand-tag">${demand}</div>
                <div class="stock-info">Stock: ${stock}</div>
            `;
            
            container.appendChild(card);
        });

        // 1. Advanced 3D Tilt for Item Cards
        VanillaTilt.init(document.querySelectorAll(".card"), {
            max: 20,                // More tilt for better 3D depth
            speed: 1000,            // Faster, smoother transition
            perspective: 1000,      // Creates a stronger sense of distance
            scale: 1.05,            // Card grows slightly on hover
            glare: true,            // Enables the digital glare
            "max-glare": 0.4,       // Brightness of the glare
            gyroscope: true,        // Allows mobile users to tilt their phone to see 3D
            gyroscopeMinAngleX: -45,
            gyroscopeMaxAngleX: 45,
            gyroscopeMinAngleY: -45,
            gyroscopeMaxAngleY: 45,
        });

        // 2. Parallax Effect for Background Shapes
        VanillaTilt.init(document.querySelectorAll(".shape"), {
            max: 10,
            speed: 2000,
            perspective: 2000,
            "mouse-event-element": document.body,
            reverse: true           // Background moves opposite to mouse for depth
        });

    } catch (error) {
        console.error("Techblox Market Error:", error);
        // Visual feedback if the file is missing
        document.getElementById('market-container').innerHTML = 
            `<p style="color:red; text-align:center;">Failed to load market data. Check values.txt</p>`;
    }
}

window.onload = fetchValues;
