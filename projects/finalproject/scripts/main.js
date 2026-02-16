import { initHamburgerMenu } from "./burger.mjs";
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

/* Search function */
const searchLocation = document.querySelector('.search-results');
const search = new searchBar.SearchBar(searchLocation);
search.init();
/* End of search function */