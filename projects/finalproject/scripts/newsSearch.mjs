import { getNewsData } from "./apiDataFetch.mjs";

export class NewsSearch {
    constructor(element, param) {
        this.element = element;
        this.param = param;
    }

    async renderNewsSearchResults() {
        const param = this.param;
        if(param) {
            const data = await getNewsData(param);
            if(data && data.length > 0) {
                let html = "";
                const newsResults = document.createElement('div');
                const heading = document.createElement('h3');

                newsResults.classList.add('news-results');
                heading.textContent = 'News results';

                data.slice(0,2).forEach((article) => {
                    html += this.newsSearchArticleTemplate(article);
                });
                newsResults.appendChild(heading);
                newsResults.insertAdjacentHTML('beforeend', html);
                this.element.appendChild(newsResults);
            }
        }
    }

    newsSearchArticleTemplate(article) {
        const html = `
        <div class="search-article">    
            <div class="search-article-meta">
                <p>${article.source.name} - ${article.publishedAt.split('T')[0]}</p>
            </div>    
            <div>
                <a href="${article.url}"><img src="${article.urlToImage}" alt="${article.title}"></a>
            </div>
            <div>
                <a href="${article.url}"><h4>${article.title}</h4></a>
            </div>
        </div>`;
        return html;
    }
}

export class NewsFavorites {
    constructor(element, param) {
        this.element = element;
        this.param = param;
    }

    async renderNewsSearchResults() {
        const param = this.param;
        if(param) {
            const data = await getNewsData(param);
            if(data && data.length > 0) {
                let html = "";
                const newsResults = document.createElement('div');

                newsResults.classList.add('news-results');

                data.slice(0,2).forEach((article) => {
                    html += this.newsFavoritesTemplate(article);
                });
                newsResults.insertAdjacentHTML('beforeend', html);
                this.element.appendChild(newsResults);
            } else {
                document.getElementById('news-message').innerHTML = `We didn't have any relevant ${param} articles at the time.`;
            }
        }
    }

    newsFavoritesTemplate(article) {
        let image = article.urlToImage;
        let imageLarge = article.urlToImage;
        if (!image) {
            image = "images/news-placeholder.webp"
            imageLarge = "images/news-placeholder-large.webp"
        }
        let html = `
            <div class="headline">
            <div class="image">
                <a href="${article.url}">
                    <picture>
                        <source media="(min-width: 511px) and (max-width: 1023px)" srcset="${imageLarge}"/>
                        <img src="${image}" width="510" height="340" alt="${article.title}"/>
                    </picture>
                </a>
                <p class="media">${article.source.name}, ${article.publishedAt.split("T")[0]}</p>
            </div>
                <a href="${article.url}">
                    <h2>${article.title}</h2>
                </a>
            </div>`
        return html;
    }
}