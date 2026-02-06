export class Search {
    constructor(element) {
        this.element = element;
    }

    async init() {
        const newsSearch = await this.renderNewsSearch();
        // const currencySearch = await this.renderCurrencySearch();
        // const stockSearch = await this.renderStockSearch();
        this.element.appendChild(newsSearch);
        // this.element.appendChild(currencySearch);
        // this.element.appenChild(stockSearch);
    }

    async renderNewsSearch() {
        const param = this.getSearchParam();
        console.log(param);
        if(param) {
            const data = await this.getNewsAPIData(param);
            let html = "";
            const newsResults = document.createElement('div');
            const header = document.createElement('h3');
            newsResults.classList.add('news-results');
            header.textContent = 'News results';
            data.slice(0,4).forEach((article) => {
                html += this.newsSearchtemplate(article);
            });
            newsResults.appendChild(header);
            newsResults.insertAdjacentHTML('beforeend', html);
            return newsResults;
        }
    }

    async renderCurrencySearch () {
        const data = await this.getCurrencyData();
        const html = await this.currencySearchTemplate(data);
        const results = document.createElement("div");
        results.classList.add("currency-results");
        const header = document.createElement("h3");
        header.textContent = "Currency results";
        const currencyResults = document.createElement("table");
        currencyResults.classList.add("currency-search");
        currencyResults.innerHTML = html;
        results.appendChild(header);
        results.appendChild(currencyResults);
        return results;
    }

    async renderStockSearch() {
            const tickers = await this.getStockSearch();
            for(const ticker of tickers) {
                const data = await this.getStockData(ticker);
                const tickerRow = this.stockDataTemplate(data);
                this.element.appendChild(tickerRow);
            };
        }

    

    async currencySearchTemplate(data) {
        const currencyData = Object.entries(data.data);
        const param = await this.getCurrencyCodes();
        const baseCurrency = param.split("%2C")[0];

        currencyData.sort((a, b) => {
            if(a[0] === `${baseCurrency}`) return -1;
            if(b[0] === `${baseCurrency}`) return 1;
            return 0;
        });

        let html = '';
        currencyData.forEach((row) => {
            const code = row[0];
            const value = row[1];
            html += `
                <tr>
                    <th class="currency-code">${code}</th>
                    <td class="currency-value">${(value * 100).toFixed(2)}</td>
                </tr>`;
            });
            console.log(html);
        return html;
    }

    stockDataTemplate(data) {
        const timeSeries = data["Time Series (Daily)"];
        const latestDate = Object.keys(timeSeries)[0];
        const latestData = timeSeries[latestDate];

        const symbol = data["Meta Data"]["2. Symbol"];
        const open = parseFloat(latestData["1. open"]);
        const close = parseFloat(latestData["4. close"]);
        const diff = close - open;
        const diffperc = diff / open * 100;

        const tr = document.createElement('tr');
        const thSymbol = document.createElement('th');
        thSymbol.textContent = symbol;

        const tdClose = document.createElement('td');
        tdClose.textContent = close;

        const tdDiff = document.createElement('td');
        tdDiff.textContent = `${diffperc.toFixed(2)}%`;

        function addClass() {
            if(diffperc > 0) {
                tdDiff.classList.add('positive');
            } else if(diffperc < 0) {
                tdDiff.classList.add('negative');
            }}

        addClass();

        tr.appendChild(thSymbol);
        tr.appendChild(tdClose);
        tr.appendChild(tdDiff);
    
        return tr;
    }

    async getStockSearch() {
        const apiKey = "ZoQtGzQBQC9xwGozGIKkN6h0sbVGtXWl";
        const param = this.getSearchParam();

        if(!param) {
            console.log("Search param:", param)
            return [];
        }

        const searchUrl = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${param}&apikey=${apiKey}`;
        const response = await fetch(searchUrl);

        try {
            if(!response.ok) {
                throw new Error(`HTTP Error! status: ${response.status}`)
            }
            const data = await response.json();
            const matches = data.bestMatches;
            const findCodes = matches.map(stock => stock["1. symbol"]);
            console.log(findCodes);
            return findCodes;
            } catch(error) {
                console.error("Failed to fetch stock data:", error);
                return null;
        }
    }

    async getCurrencyCodes() {
        const param = this.getSearchParam();
        console.log(param);
        const response = await fetch("./data/currencyList.json");
        const data = await response.json();
        const currencyList = data;
        console.log(currencyList);

        if(param.length === 3) {
            const findCode = currencyList.currencies.find(currency =>
                currency.code === param.toUpperCase());
            console.log(findCode);
            if(findCode) {
                console.log(param.toUpperCase());
                return param.toUpperCase();
            }
        }

        const findNames = currencyList.currencies.filter(currency =>
            currency.name.toLowerCase().includes(param.toLowerCase())
        );

        if(findNames.length === 1) {
            console.log(findNames[0].code);
            return findNames[0].code;
        } else if(findNames.length > 1) {
            const codes = findNames.map(currency => currency.code);
            console.log(codes.join("%2C"));
            return codes.join("%2C");
            }
    }

    async getStockData(param) {
        const apiKey = "ZoQtGzQBQC9xwGozGIKkN6h0sbVGtXWl";
        const apiURL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`;
        const response = await fetch(apiURL);
        try {
            if(!response.ok) {
                throw new Error(`HTTP Error! status: ${response.status}`)
            }
            const data = await response.json();
            console.log("get stock api data",data);
            return data;
            } catch(error) {
                console.error("Failed to fetch stock data:", error);
                return null;
            }
    }

    async getCurrencyData() {
        const apiKey = "fca_live_NGulpAaWHPrJgd2S9lOHgxBLiX0WKsNatNiOzck4";
        const param = await this.getCurrencyCodes();
        const baseCurrency = param.split("%2C")[0];
        console.log(baseCurrency);
        const apiUrl = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&currencies=${param}&base_currency=${baseCurrency}`;
        try {
            const response = await fetch(apiUrl);
            if(!response.ok) {
                throw new Error(`HTTP Error! status: ${response.status}`)
            }
            const data = await response.json();
            console.log(data);
            return data;
        } catch(error) {
            console.error("Failed to fetch currency data:", error);
            return null;
            }
    }

    async getNewsAPIData(param) {
        const apiKey = "f52b88432ac34ea7992ba153bed76bbb";
        const apiUrl = `https://newsapi.org/v2/everything?q=${param}&apiKey=${apiKey}&language=en`;
        try {
            const response = await fetch(apiUrl);
            if(!response.ok) {
                    throw new Error(`HTTP Error! status: ${response.status}`)
            }
            const data = await response.json();
            console.log(data);
            return data.articles;
        } catch(error) {
            console.error("Failed to fetch news data:", error);
            return null;
            }
        }
}