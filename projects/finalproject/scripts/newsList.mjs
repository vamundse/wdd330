import { getNewsData } from "./apiDataFetch.mjs";

export class NewsList {
    constructor(element) {
        this.element = element;
        const select = document.forms.newsselect;
        select.addEventListener('change', () => this.init());
    }

    async init() {
        const category = this.getCategoryFromSelect();
        const list = await getNewsData(category);
        this.renderNewsList(list);
    }

    getCategoryFromSelect() {
        const select = document.forms.newsselect;
        const category = select.newscategory.value;
        return category;
    }

    renderNewsList(list) {
        this.element.innerHTML = "";
        list.slice(0, 1).forEach(article => {
            this.element.innerHTML += this.topNewsTemplate(article);
        });
    }

    topNewsTemplate(article) {
        let image = article.urlToImage;
        if (!image) {
            image = "images/news-placeholder.webp"
        }
        return `<div class="headline">
        <div class="image">
            <a href="${article.url}">
                <img src="${image}">
            </a>
            <p class="media">${article.source.name}, ${article.publishedAt.split("T")[0]}</p>
        </div>
        <a href="${article.url}">
            <h3>${article.title}</h3>
        </a>
    </div>`;
    }
}