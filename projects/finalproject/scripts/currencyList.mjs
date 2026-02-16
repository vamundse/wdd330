import { getCurrencyData } from "./apiDataFetch.mjs";

export class CurrencyList {
    constructor(element, selectedCurrencies, baseCurrency) {
        this.element = element;
        this.selectedCurrencies = selectedCurrencies;
        this.baseCurrency = baseCurrency;
    }
    async init() {
        this.renderList();
    };

    async renderList() {
        const data = await getCurrencyData(this.selectedCurrencies, this.baseCurrency);
        const html = this.listTemplate(data);
        this.element.innerHTML = html;
    }

    listTemplate(data) {
        const baseData = data;
        const rates = Object.entries(data.rates);
        let html = '';
        html += `<div><a href="./currency.html" class="ticker-title">Currency</a></div>`
        html += `<div class="cur-base-value"><a href="./currency.html">${baseData.base} ${(baseData.amount * 100).toFixed(2)}</a></div>`;
        rates.forEach((row) => {
            html += `<div class="cur-value"><a href="./currency.html">${row[0]} ${(row[1] * 100).toFixed(2)}</a></div>`;
        });
        return html;
    }
}