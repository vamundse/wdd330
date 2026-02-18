export class CurrencySearch {
    constructor(element, param) {
        this.element = element
        this.param = param;
    }

    async renderCurrencySearch() {
        const selectedCurrencies = await this.getCurrencies();
        console.log("currencies:", selectedCurrencies);
        if(selectedCurrencies && selectedCurrencies.length > 0) {
            const currencyResults = document.createElement('div');
            const heading = document.createElement('h3');
            const div = document.createElement('div');

            currencyResults.classList.add('currency-results');
            heading.textContent = 'Currency results';
            const html = this.currencySearchTemplate(selectedCurrencies);
            div.insertAdjacentHTML("beforeend", html);
            currencyResults.appendChild(heading);
            currencyResults.appendChild(div);
            this.element.appendChild(currencyResults);
        }
    }

    async getCurrencyCodes() {
        const currencies = await this.getCurrencies();
        if(currencies.length === 1) {
            console.log(currencies[0].code);
            return currencies[0].code;
        } else if(currencies.length > 1) {
            const codes = currencies.map(currency => currency[0]);
            console.log("Currency codes to data fetch:", codes);
            return codes;
        } else {
            console.error("No currencies found, try another search term");
        }
    }

    async getCurrencies() {
        const param = this.param;
        const response = await fetch("https://api.frankfurter.dev/v1/currencies");
        const data = await response.json();
        const currencyList = Object.entries(data);
        console.log("Currency code and name List:", currencyList);
        if(param.length === 3) {
            const findCode = currencyList.find(currency =>
                currency[0] === param.toUpperCase());
            console.log(findCode);
            if(findCode) {
                console.log("Currency Code found:", param.toUpperCase());
                return [findCode];
            }
        }
        const findNames = currencyList.filter(currency =>
            currency[1].toLowerCase().includes(param.toLowerCase())
        );
        console.log("Currency names:", findNames);
        return findNames;
    }

    currencySearchTemplate(data) {
        let html = "";
        data.forEach(currency => {
            html += `<div class="currency-search-row"><a href="./currency?from=${currency[0]}">${currency[1]} - ${currency[0]}</a></div>`;
        });
        return html;
    }
}