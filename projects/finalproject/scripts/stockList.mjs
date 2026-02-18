// imports a function that gets data from the stockApi
import { getStockData } from "./apiDataFetch.mjs";

export class StockTickers {
    constructor(element, tickers) {
        this.element = element; // HTML element
        this.tickers = tickers; // A list of the stock ticker codes we want data about
    }

    async init() {
        await this.renderFrontPageTickers();
    }

    async renderFrontPageTickers() {
        // gets the tickers we want to get data for
        const tickers = this.tickers;

        const div = document.createElement('div');
        div.classList.add('stocks-section');
        const header = document.createElement('div');
        header.innerHTML = `<a href="./stocks.html">Stocks</a>`;
        header.classList.add('ticker-title');
        div.appendChild(header);

        // gets the data, adds the template and appends the tr
        // to the HTML element, which should be a table
        for (const ticker of tickers) {
            const data = await getStockData(ticker);
            const tickerRow = this.stockListTemplate(data);
            div.appendChild(tickerRow);
        }
        this.element.appendChild(div);
    }

    stockListTemplate(data) {
        // making the template
        const ticker = document.createElement('a');
        ticker.href = `./stocks.html?${data.symbol}`;
        ticker.classList.add('stocks-ticker');
        const symbol = document.createElement('div');
        symbol.innerHTML = `${data.symbol}`;
        const diff = document.createElement('div');
        diff.innerHTML = `${data.changePercentage.toFixed(2)}%`;

        // adding a class for positive and negative difference values
        if (data.changePercentage > 0) {
            diff.classList.add('positive');
        } else if (data.changePercentage < 0) {
            diff.classList.add('negative');
        }

        // adding the sections to the main tr
        ticker.appendChild(symbol);
        ticker.appendChild(diff);

        // returning the tr
        return ticker;
    }
}