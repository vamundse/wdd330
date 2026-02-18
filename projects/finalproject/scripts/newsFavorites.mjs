export class FavoriteNews {

    removeFromLocalStorage() {
        document.addEventListener('click', (e) => {
            if(e.target.classList.contains('remove-news-fav')) {
                console.log('Button clicked!');
                let favorites = JSON.parse(localStorage.getItem('news-favorites')) || [];
                const topicElement = e.target.closest('.fav-news-topic');
                if(topicElement) {
                    const topic = topicElement.dataset.topic;
                    console.log('Removing:', topic);
                    const newFavorites = favorites.filter(fav => fav !== topic);
                    localStorage.setItem('news-favorites', JSON.stringify(newFavorites));
                    topicElement.remove();
                }
            };
        });
    }

    openFavoriteList() {
        const list = document.getElementById('news-topics');
        const button = document.querySelector('.news-favorites-list button');
        button.addEventListener('click', () => {
            button.classList.toggle('open');
            list.classList.toggle('open');
        });
    }

    makeDatalist() {
        const listElement = document.getElementById('news-topics');
        let html = "";
        const favoriteList = JSON.parse(localStorage.getItem('news-favorites')) || [];
        favoriteList.forEach(favorite => {
            html += this.datalistTemplate(favorite);
        });
        listElement.innerHTML = html;
    }

    addToLocalStorage() {
        const button = document.getElementById('add-news-button');
        button.addEventListener('click', () => {
            console.log('button pushed')
            const topicInput = document.getElementById('add-favorite-news').value;
            let favorites = JSON.parse(localStorage.getItem('news-favorites')) || [];
            if(!favorites.includes(topicInput)) {
                favorites.push(topicInput);
                console.log('Added:', topicInput)
                localStorage.setItem('news-favorites', JSON.stringify(favorites));
                this.makeDatalist();
            }
        });
    }

    datalistTemplate(topic) {
        let html = `
        <div class="fav-news-topic" data-topic="${topic}">
        <a href="?${topic}">${topic}</a>
        <button class="remove-news-fav">x</button>
        </div>`;
        return html;
    }
}