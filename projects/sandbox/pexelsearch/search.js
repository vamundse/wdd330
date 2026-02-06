const apiKey = "0Xmgg5L21pld4C4feCt6bCxEpXvEgq2zyzs0RGY2PzhHsGCQdWCRFPUY";

//selectors

const searchForm = document.getElementById("search-form");
const searchResult = document.getElementById("result");

//event listeners

const setupListeners = () => {
    searchForm.addEventListener('submit', onSearchFormSubmit)
}

//event handlers

const onSearchFormSubmit = (e) => {
    e.preventDefault();

    const query = searchForm.query.value.trim();

    if(!query) {
        alert('Please provide a valid search term');
        return;
    }

    const apiURL = `https://api.pexels.com/v1/search?query=${query}&orientation=landscape`;

    fetchImages(apiURL).then((data) => displayResults(data));
}

//render functions

const displayResults = (data) => {
    data.photos.forEach(photo => {
        searchResult.innerHTML += `
            <div class="grid-item">
                <a href="${photo.url}" target="_blank">
                    <img src="${photo.src.medium}" alt="${photo.alt}" />
                        <div class="image-content">
                            <h3 class="photographer">${photo.photographer}</h3>
                        </div>
                </a>
            </div>
        `
    });
}

//helper functions

const fetchImages = async (apiURL) => {
    try {
        const response = await fetch(apiURL, {
            headers: { Authorization: apiKey}
        });

        if(!response.ok) {
            throw new Error(`HTTP Error! status=${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error('Fetch error', error);
    }
};

//initialize

setupListeners();