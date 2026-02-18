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
        html += `<div class="cur-base-value"><a href="./currency.html?from=${baseData.base}">${baseData.base} ${(baseData.amount * 100).toFixed(2)}</a></div>`;
        rates.forEach((row) => {
            html += `<div class="cur-value"><a href="./currency.html?from=${row[0]}">${row[0]} ${(row[1] * 100).toFixed(2)}</a></div>`;
        });
        return html;
    }
}

export class CurrencyTable {
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
        html += `
            <tr class="currency-base">
                <th class="cur-base-name-table">${baseData.base}</th>
                <th class="cur-base-value-table">${(baseData.amount * 100).toFixed(2)}</th>
            </tr>`;
        rates.forEach((row) => {
            html += `
            <tr class="currency-other">
                <td class="cur-name-table">${row[0]}</td>
                <td class="cur-value-table">${(row[1] * 100).toFixed(2)}</td>
            </tr>`;
        });
        return html;
    }
}