import * as stockOne from "./stockOne.mjs";
import { getParam } from "./utilities.mjs";
import * as addfavoriteStocks from "./stockFavorite.mjs";

const param = getParam();
if(param) {
    const paramStock = new stockOne.OneStock(document.querySelector('.param-stock'), [param]);
    paramStock.init();
} else {
    document.querySelector('.param-stock').classList.toggle('hide');
}

const popular = new stockOne.OneStock(document.querySelector('.pop-stocks'), ['MSFT', 'AAPL', 'META', 'AMZN', 'GOOGL', 'TSLA']);
popular.init();

const favoriteList = JSON.parse(localStorage.getItem('favorite-stocks'));
const favoriteStocks = new stockOne.OneStock(document.querySelector('.favorite-stock-list'), favoriteList);
favoriteStocks.init();

const instFavo = new addfavoriteStocks.FavoriteStock();
instFavo.init();
instFavo.addToLocalStorage();