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
        let html = "";
        list.slice(0, 9).forEach(article => {
            html += this.topNewsTemplate(article);
        });
        this.element.innerHTML = html;
    }

    /*topNewsTemplate(article) {
        let image = article.urlToImage;
        let imageLarge = article.urlToImage;
        if (!image) {
            image = "images/news-placeholder.webp"
            imageLarge = "images/news-placeholder-large.webp"
        }
        return `<div class="headline">
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
    </div>`;
    }*/

    topNewsTemplate(article) {
        let image = article.thread.main_image;
        let imageLarge = article.thread.main_image;
        if (!image) {
            image = "images/news-placeholder.webp"
            imageLarge = "images/news-placeholder-large.webp"
        }
        return `<div class="headline">
        <div class="image">
            <a href="${article.thread.url}">
                <picture>
                    <source media="(min-width: 511px) and (max-width: 1023px)" srcset="${imageLarge}"/>
                    <img src="${image}" width="510" height="340" alt="${article.thread.title}"/>
                </picture>
            </a>
            <p class="media">${article.thread.site}, ${article.thread.published.split("T")[0]}</p>
        </div>
        <a href="${article.thread.url}">
            <h2>${article.thread.title}</h2>
        </a>
    </div>`;
    }
}