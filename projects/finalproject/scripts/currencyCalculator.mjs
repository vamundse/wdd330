import { getParam } from "./utilities.mjs";

export class CurrencyConversion {
  constructor() {
    this.from = getParam() || localStorage.getItem('from-currency');
    this.to = localStorage.getItem('to-currency');
    this.fromAmount = parseFloat(localStorage.getItem('from-amount'));
    this.toAmount = parseFloat(localStorage.getItem('to-amount'));
  }

  currencyConvertFromTo() {
    const toValue = document.getElementById('to-value');
    toValue.value = "";
    fetch(`https://api.frankfurter.dev/v1/latest?base=${this.from}&symbols=${this.to}`)
    .then((resp) => resp.json())
    .then((data) => {
      
      const convertedAmount = (this.fromAmount * data.rates[this.to]).toFixed(2);
      localStorage.setItem('to-amount', convertedAmount);
      toValue.value = convertedAmount;
    });
  }

  currencyConvertToFrom() {
    const toValue = document.getElementById('to-value');
    toValue.value = "";
    fetch(`https://api.frankfurter.dev/v1/latest?base=${this.to}&symbols=${this.from}`)
    .then((resp) => resp.json())
    .then((data) => {
      const convertedAmount = (this.toAmount * data.rates[this.from]).toFixed(2);
      localStorage.setItem('from-amount', convertedAmount);
      fromValue.value = convertedAmount;
    });
  }

  swapButton() {
    const fromCurrency = document.getElementById('from-currency')
    const fromValue = document.getElementById('from-value');
    const toCurrency = document.getElementById('to-currency');
    const toValue = document.getElementById('to-value');
    const swapButton = document.getElementById('swap');

    swapButton.addEventListener('click', () => {
      const fromAmount = localStorage.getItem('from-amount');
      const fromCode = localStorage.getItem('from-currency');
      const toAmount = localStorage.getItem('to-amount');
      const toCode = localStorage.getItem('to-currency');
    
      localStorage.setItem('to-amount', fromAmount);
      localStorage.setItem('to-currency', fromCode);
      localStorage.setItem('from-amount', toAmount);
      localStorage.setItem('from-currency', toCode);

      fromValue.value = toAmount;
      fromCurrency.value = toCode;
      toValue.value = fromAmount;
      toCurrency.value = fromCode;

      this.fromAmount = parseFloat(toAmount);
      this.from = toCode;
      this.toAmount = parseFloat(fromAmount);
      this.to = fromCode;
    });
  }

  getUserInput() {
    const fromCurrency = document.getElementById('from-currency')
    const fromValue = document.getElementById('from-value');
    const toCurrency = document.getElementById('to-currency');
    const toValue = document.getElementById('to-value');

    const fromAmount = localStorage.getItem('from-amount');
    const storedFromCode = localStorage.getItem('from-currency');
    const toAmount = localStorage.getItem('to-amount');
    const storedToCode = localStorage.getItem('to-currency');

    if (fromAmount && storedFromCode && storedToCode && toAmount) {
      fromValue.value = fromAmount;
      fromCurrency.value = storedFromCode;
      toCurrency.value = storedToCode;
      toValue.value = toAmount;
    }

    toValue.addEventListener('input', () => {
      const toAmount = toValue.value;
      const fromAmount = fromValue.value;
      const fromCode = fromCurrency.value;
      const toCode = toCurrency.value;

      this.toAmount = parseFloat(toAmount);
      this.fromAmount = parseFloat(fromAmount);
      this.from = fromCode;
      this.to = toCode;

      localStorage.setItem('to-amount', toAmount);
      localStorage.setItem('from-currency', fromCode);
      localStorage.setItem('to-currency', toCode);
      localStorage.setItem('from-amount', fromAmount);

      this.currencyConvertToFrom();
    });

    toCurrency.addEventListener('change', () => {
      const toAmount = toValue.value;
      const fromAmount = fromValue.value;
      const fromCode = fromCurrency.value;
      const toCode = toCurrency.value;

      this.toAmount = parseFloat(toAmount);
      this.fromAmount = parseFloat(fromAmount);
      this.from = fromCode;
      this.to = toCode;

      localStorage.setItem('to-amount', toAmount);
      localStorage.setItem('from-currency', fromCode);
      localStorage.setItem('to-currency', toCode);
      localStorage.setItem('from-amount', fromAmount);

      this.currencyConvertToFrom();
    });

    fromValue.addEventListener('input', () => {
      const fromAmount = fromValue.value;
      const fromCode = fromCurrency.value;
      const toAmount = toValue.value;
      const toCode = toCurrency.value;

      this.fromAmount = parseFloat(fromAmount);
      this.from = fromCode;
      this.to = toCode;
      this.toValue = parseFloat(toAmount);

      localStorage.setItem('from-amount', fromAmount);
      localStorage.setItem('from-currency', fromCode);
      localStorage.setItem('to-currency', toCode);
      localStorage.setItem('to-amount', toAmount);

      this.currencyConvertFromTo();
    });

    fromCurrency.addEventListener('change', () => {
      const fromAmount = fromValue.value;
      const fromCode = fromCurrency.value;
      const toAmount = toValue.value; 
      const toCode = toCurrency.value;

      this.fromAmount = parseFloat(fromAmount);
      this.from = fromCode;
      this.to = toCode;
      this.toValue = parseFloat(toAmount);

      localStorage.setItem('from-amount', fromAmount);
      localStorage.setItem('from-currency', fromCode);
      localStorage.setItem('to-currency', toCode);
      localStorage.setItem('to-amount', toAmount);

      this.currencyConvertFromTo();
    })
  }

  async setOptions() {
    const currencies = await this.getCurrencies();
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
      Object.keys(currencies).forEach(currency => {
        let option = this.optionTemplate(currency);
        select.insertAdjacentHTML('beforeend', option);
      });
    });
  }

  async getCurrencies() {
    const response = await fetch('https://api.frankfurter.dev/v1/currencies');
    const data = await response.json();
    console.log('Currency - getCurrency for conversion', data);
    return data;
  }

  optionTemplate(currency) {
    let html = "";
    html = `<option value="${currency}">${currency}</option>`;
    return html;
  }
}