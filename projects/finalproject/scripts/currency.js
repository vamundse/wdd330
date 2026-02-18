import * as currencyConversion from "./currencyCalculator.mjs";
import * as currencyList from "./currencyList.mjs";

const convertor = new currencyConversion.CurrencyConversion();
convertor.init();

/* Making currency data front page data */
const selectedCurrencies = ['USD', 'CAD', 'CHF', 'EUR', 'GBP', 'JPY', 'CNY'];
const element = document.getElementById("pop-cur");
const baseCurrency = 'EUR';
const frontPageCurrency = new currencyList.CurrencyTable(element, selectedCurrencies, baseCurrency);
frontPageCurrency.init();
/* End of currency data front page */