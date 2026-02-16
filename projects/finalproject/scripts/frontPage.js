import * as newsList from "./newsList.mjs";
import * as stockList from "./stockList.mjs";
import * as currencyList from "./currencyList.mjs";

/* Making business front page news list */
const newsElement = document.getElementById("top-news");
const frontPageNews = new newsList.NewsList(newsElement);
frontPageNews.init();
/* End of business front page news list */

/* Making stock data front page ticker */
const frontPageStocksElement = document.querySelector(".stocks-div");
const tickers = ['MSFT', 'AAPL', 'TSLA', 'META', 'AMZN', 'GOOGL'];
const frontPageStocks = new stockList.StockTickers(frontPageStocksElement, tickers);
frontPageStocks.init();
/* End of stock data front page*/

/* Making currency data front page data */
const selectedCurrencies = ['USD', 'CAD', 'CHF', 'EUR', 'GBP', 'JPY', 'CNY'];
const element = document.getElementById("top-cur");
const baseCurrency = 'EUR';
const frontPageCurrency = new currencyList.CurrencyList(element, selectedCurrencies, baseCurrency);
frontPageCurrency.init();
/* End of currency data front page */