import * as currencyConversion from "./currencyCalculator.mjs";

const convertor = new currencyConversion.CurrencyConversion();
convertor.setOptions().then(() => {
    convertor.getUserInput();
    convertor.swapButton();
});

