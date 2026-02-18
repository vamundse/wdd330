export async function getStockData(stockSymbolList) {
    const apiKey = "wZKvioZjhLFJbsgC79HVeyDpHCIhmsAa";
    const apiURL = `https://financialmodelingprep.com/stable/quote?symbol=${stockSymbolList}&apikey=${apiKey}`;
    const response = await fetch(apiURL);
    try {
        if(!response.ok) {
            throw new Error(`HTTP Error! status: ${response.status}`)
        }
        const data = await response.json();
        console.log("StockApi ticker data", data);
        return data[0];
        } catch(error) {
            console.error("Failed to fetch stock data:", error);
            return null;
        }
    }

export async function getCurrencyData(currencyList, baseCurrency) {
    let apiUrl = "";
    if(baseCurrency) {
        apiUrl = `https://api.frankfurter.dev/v1/latest?symbols=${currencyList}&base=${baseCurrency}`;
    } else {
        apiUrl = `https://api.frankfurter.dev/v1/latest?symbols=${currencyList}`;
    }
    try {
        const response = await fetch(apiUrl);
        if(!response.ok) {
            throw new Error(`HTTP Error! status: ${response.status}`)
        }
        const data = await response.json();
        console.log("CurrencyAPI data", data);
        return data;
        } catch(error) {
            console.error("Failed to fetch currency data:", error);
            return null;
    }
}

export async function getNewsData(category) {
    const apiKey = "4381b49d-ddea-45b3-92d3-3eaf7e4c1e97";
    const apiUrl = `https://api.webz.io/newsApiLite?token=${apiKey}&q=${category}`;
    try {
        const response = await fetch(apiUrl);
        if(!response.ok) {
                throw new Error(`HTTP Error! status: ${response.status}`)
        }
        const data = await response.json();
        console.log("Webz data", data);
        return data.posts;
    } catch(error) {
        console.error("Failed to fetch news data:", error);
    }
}