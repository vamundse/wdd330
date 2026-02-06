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