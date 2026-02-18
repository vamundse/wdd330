import { getStockData } from "./apiDataFetch.mjs";
import { StockTickers } from "./stockList.mjs";

export class StockSearch {
    constructor(element, param) {
        this.element = element;
        this.param = param;
    }

    async renderStockSearch() {
        // Load mock stock data from shared JSON file
        let mockStockData;
        try {
            const response = await fetch('data/mockStockData.json');
            mockStockData = await response.json();
        } catch (error) {
            console.error('Failed to load mock stock data:', error);
            return;
        }

        // gets the codes we want to create tickers for
        const getTickers = Object.keys(mockStockData).filter(key =>
            key.toLowerCase().includes(this.param.toLowerCase()) ||
            mockStockData[key].name.toLowerCase().includes(this.param.toLowerCase())
        );
        // console.log("tickers:", getTickers);
        const tickers = getTickers; //await this.getTickers();

        if (tickers.length > 0) {
            // gets the stockListTemplate method from the StockTickers class
            const stockResults = document.querySelector(".search-results");
            const stockResultsDiv = document.createElement('div');
            const heading = document.createElement('h3');
            const table = document.createElement('table');

            stockResultsDiv.classList.add('stock-results');
            heading.textContent = 'Stock results';
            table.classList.add('stocks-table');

            // gets the data, adds the template and appends the tr
            // to the HTML element, which should be a table
            for (const ticker of tickers) {
                const data = /*mockStockData[ticker]; //*/ await getStockData(ticker);
                const tickerRow = this.stockSearchTemplate(data);
                this.element.appendChild(tickerRow);
                table.appendChild(tickerRow);
            };
            stockResultsDiv.appendChild(heading);
            stockResultsDiv.appendChild(table);
            stockResults.appendChild(stockResultsDiv);
        }
    }

    async getTickers() {
        const param = this.param;
        const responseStockList = await fetch('./data/stockList.json');
        const dataStockList = await responseStockList.json();
        const responseStockApi = await fetch(`https://financialmodelingprep.com/stable/search-name?query=${param}&apikey=wZKvioZjhLFJbsgC79HVeyDpHCIhmsAa`);
        const dataStockApi = await responseStockApi.json();
        const filteredData = dataStockApi.filter(stock => {
            return dataStockList.includes(stock.symbol);
        });
        console.log(filteredData);
        if (filteredData.length === 0) {
            console.error('No valid tickers were found, we do not have access to all');
        }
        const codeData = filteredData.map(stock => {
            return stock.symbol;
        });
        console.log(codeData);
        return codeData;
    }

    stockSearchTemplate(data) {
        // making the template
        const ticker = document.createElement('a');
        ticker.href = `./stocks.html?${data.symbol}`;
        ticker.classList.add('search-ticker');
        const name = document.createElement('div');
        name.innerHTML = `${data.name}`;
        const symbol = document.createElement('div');
        symbol.innerHTML = `${data.symbol}`;

        // adding the sections to the main tr
        ticker.appendChild(name);
        ticker.appendChild(symbol);

        // returning the tr
        return ticker;
    }
}