import * as stockList from "./stockList.mjs";
import * as stockOne from "./stockOne.mjs";

const inst = new stockOne.OneStock(document.querySelector(".display-stocks"));
inst.renderStockData();

/* Making stock data front page ticker */
const frontPageStocksElement = document.querySelector(".stocks-div");
const tickers = ['MSFT', 'AAPL', 'TSLA', 'META', 'AMZN', 'GOOGL'];
const frontPageStocks = new stockList.StockTickers(frontPageStocksElement, tickers);
frontPageStocks.init();
/* End of stock data front page*/