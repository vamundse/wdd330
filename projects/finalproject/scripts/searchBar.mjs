import * as newsSearch from "./newsSearch.mjs";
import * as currencySearch from "./currencySearch.mjs";
import * as stockSearch from "./stockSearch.mjs";
import { getSearchParam } from "./utilities.mjs";

export class SearchBar {
    constructor(element) {
        this.element = element;
    }

    init() {
        const param = getSearchParam();
        console.log("Search parameter:", param);
        if(param) {
            const main = document.querySelector('main');
            main.innerHTML = "";
            this.showCurrencySearch(param);
            this.showStockSearch(param);
            this.showNewsSearch(param);
        } else {
            this.element.classList.toggle('closed');
        }
    }

    showCurrencySearch(param) {
        const currencySearchClass = new currencySearch.CurrencySearch(this.element, param);
        currencySearchClass.renderCurrencySearch();
    }

    showStockSearch(param) {
        const stockSearchClass = new stockSearch.StockSearch(this.element, param);
        stockSearchClass.renderStockSearch();
    }
    
    showNewsSearch(param) {
        const newsSearchClass = new newsSearch.NewsSearch(this.element, param);
        newsSearchClass.renderNewsSearchResults();
    }

    
}