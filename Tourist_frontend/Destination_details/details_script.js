document.addEventListener('DOMContentLoaded', () => {

    // --- TEMPORARY DATA FOR DETAILS PAGE ---
    // Contains the rich, detailed data needed for the details view.
    const allAttractionsDetails = [
        // Lohagad Fort details for testing ID=3 click
        { 
            id: "3", 
            name: "Lohagad Fort: Sunrise Trek & History Tour", 
            location: "Lonavala, Maharashtra / 5 Hours (Approx.)", 
            rating: "4.5/5 (Based on 89 reviews)", 
            price: 850,
            description: "Lohagad (Iron Fort) is one of the most popular and accessible hill forts near Pune and Mumbai. Standing at an elevation of 3,400 feet, this fort offers breathtaking panoramic views of the Pawna Lake and the surrounding lush green valleys. Join us for an unforgettable morning trek combined with a deep dive into the fort's rich Maratha history.",
            images: [ "lohagad_main.jpg", "lohagad_side_1.jpg", "lohagad_side_2.jpg" ] 
        },
        // Placeholder entry for ID 1 (Shaniwar Wada)
        { 
            id: "1", 
            name: "Shaniwar Wada Palace", 
            location: "Pune City Center", 
            rating: "4.2/5 (Based on 120 reviews)", 
            price: 450,
            description: "Historical seat of the Peshwa rulers of the Maratha Empire.",
            images: [ "Shaniwar_Wada.jpg", "Shaniwar_Wada_2.jpg", "Shaniwar_Wada_3.jpg" ] 
        }
        // ... You must add all other attraction IDs here ...
    ];

    // 1. GET THE ID FROM THE URL
    const urlParams = new URLSearchParams(window.location.search);
    const attractionId = urlParams.get('id');

    const detailContainer = document.getElementById('detail-view-container');

    if (!attractionId) {
        detailContainer.innerHTML = '<p style="text-align: center;">Error: Attraction ID not found in URL. Please click a card on the homepage.</p>';
        return;
    }

    // 2. FIND THE MATCHING DATA
    const itemData = allAttractionsDetails.find(item => item.id === attractionId);

    if (!itemData) {
        detailContainer.innerHTML = `<p style="text-align: center;">Error: Data for ID ${attractionId} not found in dataset.</p>`;
        return;
    }

    // 3. RENDER THE DETAILS
    const detailHTML = `
        <div class="gallery-wrapper">
            <div class="main-image">
                <img src="assets/${itemData.images[0]}" alt="${itemData.name} main view">
            </div>
            <div class="side-images">
                <img src="assets/${itemData.images[1]}" alt="${itemData.name} side view 1">
                <img src="assets/${itemData.images[2]}" alt="${itemData.name} side view 2">
                <div class="image-overlay">
                    + ${itemData.images.length - 2}
                </div>
            </div>
        </div>

        <h1 class="attraction-name">${itemData.name}</h1>
        <p class="attraction-meta">
            <i class="fas fa-map-marker-alt"></i> ${itemData.location}
        </p>
        <p class="attraction-meta">${itemData.rating}</p>
        
        <p class="attraction-price">
            ₹ ${itemData.price} per person
        </p>
        
        <p class="attraction-description">${itemData.description}</p>
    `;

    detailContainer.innerHTML = detailHTML;
});