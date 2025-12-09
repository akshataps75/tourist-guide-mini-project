document.addEventListener('DOMContentLoaded', () => {


// ----------------------------------------------------------------------------    
// IMPORTANT NOTE: The data below (attractionData, experienceData, etc.) is
// currently in arrays (attractionData, experienceData, gemsData) for prototyping the UI. This will be replaced 
// by live API calls to fetch the true dataset in the next development phase.
// ----------------------------------------------------------------------------


    const attractionData = [
        { id: 1, name: "Shaniwar Wada", location: "Pune City", image: "Shaniwar_Wada.jpg", tags: ["forts", "history"] },
        { id: 2, name: "Aga Khan Palace", location: "Kalyani Nagar", image: "Pune_Palace.jpg", tags: ["history", "architecture"] },
        { id: 3, name: "Sinhagad Fort", location: "Near Khadakwasla", image: "Sinhagad.jpg", tags: ["forts", "hills"] },
        { id: 4, name: "Katraj Snake Park", location: "Katraj", image: "Katraj_snake.jpg", tags: ["wildlife"] },
        { id: 5, name: "Osho Garden", location: "Koregaon Park", image: "Osho_park.jpg", tags: ["nature"] },
        { id: 6, name: "Dagadusheth Mandir", location: "Budhwar Peth", image: "Dagdusheth.jpg", tags: ["spiritual"] },
        // Added tags for filtering demonstration: "food", "forts", "hills", "events"
    ];

    const experienceData = [
        { id: 10, name: "Pawna Lake Camping", location: "Lonavala Road", image: "Pawan.jpg" },
    ];

    const gemsData = [
        { id: 20, name: "Mahatma Phule Market", location: "Near Mandai", image: "Mahatma_Phule.jpg" },
        { id: 21, name: "Vetal Tekdi Sunrise Point", location: "Kothrud", image: "Vetal_Tekdi.jpg" },
    ];

    // --- STATE MANAGEMENT ---
    let activeFilters = ["food"]; // Initialize with the active filter from HTML

    // --- CORE RENDERING FUNCTION ---
    const renderCards = (data, containerId) => {
        const wrapper = document.getElementById(containerId);
        const container = wrapper ? wrapper.querySelector('.carousel-container') : null;

        if (!container) {
            console.error(`Container with ID ${containerId} or its carousel-container not found.`);
            return;
        }

        container.innerHTML = ''; // Clear existing cards

        // Filter the data based on active filters (Only applies to Attractions in this example)
        let dataToRender = data;
        if (containerId === 'attractions-carousel' && activeFilters.length > 0) {
            dataToRender = data.filter(item => {
                // Check if the item has at least one tag that is in the activeFilters array
                return item.tags && item.tags.some(tag => activeFilters.includes(tag));
            });
        }
        // If dataToRender is empty, show a message
        if (dataToRender.length === 0) {
             container.innerHTML = '<p style="padding: 20px; text-align: center;">No attractions match the current filter(s).</p>';
             return;
        }

        const cardHTML = dataToRender.map(item => `
            <div class="destination-card" data-id="${item.id}">
                <div class="card-placeholder" 
                        style="background-image: url('assets/${item.image}'); 
                                background-size: cover; 
                                background-position: center;">
                </div> 
                <p class="card-name">${item.name}</p>
                <p class="card-location">
                    <i class="fas fa-map-marker-alt"></i> ${item.location}
                </p>
            </div>
        `).join('');

        container.innerHTML = cardHTML;
    };


    // --- FILTER CHIP LOGIC ---

    const filterChips = document.querySelectorAll('.filter-chip');
    
    // CONSOLIDATED updateFilterState function
    const updateFilterState = (chip) => {
        const filterName = chip.getAttribute('data-filter');
        const isActive = chip.classList.contains('active');

        if (isActive) {
            chip.classList.remove('active');
            // Remove from the activeFilters array
            activeFilters = activeFilters.filter(f => f !== filterName);
        } else {
            chip.classList.add('active');
            // Add to the activeFilters array
            activeFilters.push(filterName);
        }

        console.log("Active Filters:", activeFilters); 
        
        // RENDER CALL: Re-render the cards based on the new filter state
        renderCards(attractionData, 'attractions-carousel'); 
    };

    // Attach click listeners to all filter chips
    filterChips.forEach(chip => {
        chip.addEventListener('click', (event) => {
            const clickedElement = event.target;
            
            if (clickedElement.classList.contains('filter-remove-icon')) {
                // Case 1: Clicked on the 'x' icon within an active chip
                const parentChip = clickedElement.closest('.filter-chip');
                if (parentChip) {
                    updateFilterState(parentChip);
                }
            } else if (clickedElement.classList.contains('filter-chip')) {
                // Case 2: Clicked on the chip itself (to toggle)
                updateFilterState(clickedElement);
            }
        });
    });

    // --- CAROUSEL NAVIGATION LOGIC ---

    const carouselWrappers = document.querySelectorAll('.carousel-wrapper');

    carouselWrappers.forEach(wrapper => {
        const container = wrapper.querySelector('.carousel-container');
        const leftArrow = wrapper.querySelector('.nav-arrow.left');
        const rightArrow = wrapper.querySelector('.nav-arrow.right');
        
        const scrollAmount = 530; // 2 cards width + gap

        if (leftArrow) {
            leftArrow.addEventListener('click', () => {
                container.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            });
        }

        if (rightArrow) {
            rightArrow.addEventListener('click', () => {
                container.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });
        }
    });

    // --- LOCATION INTERACTIVITY ---
    const locationTag = document.querySelector('.location-tag');
    locationTag.addEventListener('click', () => {
        alert('Location picker/selector modal would open here to change the city.');
    });

    // --- INITIAL RENDER CALLS (Run on page load) ---
    renderCards(attractionData, 'attractions-carousel'); 
    renderCards(experienceData, 'trending-carousel');
    renderCards(gemsData, 'gems-carousel');

});