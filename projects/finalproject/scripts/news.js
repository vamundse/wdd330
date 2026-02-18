import * as newsList from "./newsList.mjs";
import * as favoriteNews from "./newsFavorites.mjs";
import * as newsSearch from "./newsSearch.mjs";
import { getParam } from "./utilities.mjs";

const newsFavorites = new favoriteNews.FavoriteNews();
newsFavorites.addToLocalStorage();
newsFavorites.makeDatalist();
newsFavorites.openFavoriteList();
newsFavorites.removeFromLocalStorage();

const param = getParam();
if(param) {
    const searchNews = new newsSearch.NewsFavorites(document.querySelector('.all-news-results'), param);
    searchNews.renderNewsSearchResults();
} else {
    document.getElementById('news-message').innerHTML = `Pick a favorite topic to see relevant articles.`;
}


/* Making business front page news list */
const newsElement = document.getElementById("top-news");
const frontPageNews = new newsList.NewsList(newsElement);
frontPageNews.init();
/* End of business front page news list */