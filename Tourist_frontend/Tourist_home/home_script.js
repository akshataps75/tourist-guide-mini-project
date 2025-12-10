document.addEventListener('DOMContentLoaded', () => {

    // --- DATA (Hardcoded Placeholder) ---
    // NOTE: This data MUST match the image file names in your 'assets/' folder exactly.
    const attractionData = [
        // Using IDs that match common examples (3 for Sinhagad/Forts, 1 for Shaniwar/History)
        { id: "1", name: "Shaniwar Wada", location: "Pune City", image: "Shaniwar_Wada.jpg", tags: ["forts", "history"] },
        { id: "2", name: "Aga Khan Palace", location: "Kalyani Nagar", image: "Pune_Palace.jpg", tags: ["history", "architecture"] },
        { id: "3", name: "Sinhagad Fort", location: "Near Khadakwasla", image: "Sinhagad.jpg", tags: ["forts", "hills"] },
        { id: "4", name: "Katraj Snake Park", location: "Katraj", image: "Katraj_snake.jpg", tags: ["wildlife"] },
        { id: "5", name: "Osho Garden", location: "Koregaon Park", image: "Osho_park.jpg", tags: ["nature"] },
        { id: "6", name: "Dagadusheth Mandir", location: "Budhwar Peth", image: "Dagdusheth.jpg", tags: ["spiritual"] },
        // Add more items here if you want more cards to show initially
    ];

    const experienceData = [
        { id: "10", name: "Pawna Lake Camping", location: "Lonavala Road", image: "Pawan.jpg" },
        // ... add more experience items
    ];

    const gemsData = [
        { id: "20", name: "Mahatma Phule Market", location: "Near Mandai", image: "Mahatma_Phule.jpg" },
        { id: "21", name: "Vetal Tekdi Sunrise Point", location: "Kothrud", image: "Vetal_Tekdi.jpg" },
    ];

    // --- STATE MANAGEMENT ---
    // Start with "food" filter active (even though no current data has "food" tag)
    let activeFilters = ["food"]; 

    // --- CORE RENDERING FUNCTION ---
    /**
     * Renders cards into a specified carousel container, applying filtering if necessary.
     */
    const renderCards = (data, containerId) => {
        const wrapper = document.getElementById(containerId);
        const container = wrapper ? wrapper.querySelector('.carousel-container') : null;

        if (!container) {
            console.error(`Container with ID ${containerId} not found.`);
            return;
        }

        container.innerHTML = ''; // Clear existing content

        // Apply filtering only to the 'attractions-carousel'
        let dataToRender = data;
        if (containerId === 'attractions-carousel' && activeFilters.length > 0) {
            dataToRender = data.filter(item => {
                // Check if the item's tags overlap with any of the active filters
                return item.tags && item.tags.some(tag => activeFilters.includes(tag));
            });
        }
        
        if (dataToRender.length === 0) {
            container.innerHTML = '<p style="padding: 20px; text-align: center; width: 100%;">No items match the current filter(s).</p>';
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
    
    const updateFilterState = (chip) => {
        const filterName = chip.getAttribute('data-filter');
        const isActive = chip.classList.contains('active');

        if (isActive) {
            chip.classList.remove('active');
            activeFilters = activeFilters.filter(f => f !== filterName);
        } else {
            chip.classList.add('active');
            activeFilters.push(filterName);
        }

        // Re-render the Attraction cards whenever a filter changes
        renderCards(attractionData, 'attractions-carousel'); 
    };

    filterChips.forEach(chip => {
        chip.addEventListener('click', (event) => {
            const clickedElement = event.target;
            
            if (clickedElement.classList.contains('filter-remove-icon')) {
                // Clicked the 'x'
                const parentChip = clickedElement.closest('.filter-chip');
                if (parentChip) {
                    updateFilterState(parentChip);
                }
            } else if (clickedElement.classList.contains('filter-chip')) {
                // Clicked the chip body
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
        
        const scrollAmount = 530; 

        if (leftArrow) {
            leftArrow.addEventListener('click', () => {
                container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
        }
        if (rightArrow) {
            rightArrow.addEventListener('click', () => {
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
        }
    });
    
    // --- CARD CLICK NAVIGATION LOGIC (To Details Page) ---
    const mainContentArea = document.querySelector('main.main-content');
    if (mainContentArea) {
        mainContentArea.addEventListener('click', (event) => {
            const clickedCard = event.target.closest('.destination-card');

            if (clickedCard) {
                const attractionId = clickedCard.getAttribute('data-id');
                // Navigate to the details page
                window.location.href = `details.html?id=${attractionId}`;
                event.preventDefault(); 
            }
        });
    }

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