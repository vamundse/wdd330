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
        const apiKey = "f52b88432ac34ea7992ba153bed76bbb";
        const apiUrl = `https://newsapi.org/v2/everything?q=${category}&apiKey=${apiKey}&language=en`;
        try {
            const response = await fetch(apiUrl);
            if(!response.ok) {
                    throw new Error(`HTTP Error! status: ${response.status}`)
            }
            const data = await response.json();
            console.log("NewsApi data", data);
            return data.articles;
        } catch(error) {
            console.error("Failed to fetch news data:", error);
            return null;
            }
        }