import { initHamburgerMenu } from "./burger.mjs";
//import * as newsList from "./newsList.mjs";
//import * as stockList from "./stockList.mjs";
import * as currencyList from "./currencyList.mjs";
import * as searchBar from "./searchBar.mjs";
import { header, footer } from "./headerAndFooter.mjs";
import { yearCopyright, pageUpdated } from "./utilities.mjs";

/* Loads the dynamic header and footer */
header().then(() => initHamburgerMenu());
footer().then(() => {
    yearCopyright();
    pageUpdated();
});
/* End of the dynamic header and footer */

/* Making business front page news list */
/*const newsElement = document.getElementById("top-news");
const frontPageNews = new newsList.NewsList(newsElement);
frontPageNews.init();*/
/* End of business front page news list */

/* Making stock data front page ticker */
/*const frontPageStocksElement = document.querySelector(".stocks-div");
const tickers = ['MSFT', 'AAPL', 'TSLA', 'META', 'AMZN', 'GOOGL'];
const frontPageStocks = new stockList.StockTickers(frontPageStocksElement, tickers);
frontPageStocks.init();*/
/* End of stock data front page*/

/* Making currency data front page data */
const selectedCurrencies = ['USD', 'CAD', 'CHF', 'EUR', 'GBP', 'JPY', 'CNY'];
const element = document.getElementById("top-cur");
const baseCurrency = 'EUR';
const frontPageCurrency = new currencyList.CurrencyList(element, selectedCurrencies, baseCurrency);
frontPageCurrency.init();
/* End of currency data front page */

/* Search function */
const searchLocation = document.querySelector('.search-results');
const search = new searchBar.SearchBar(searchLocation);
search.init();
/* End of search function */