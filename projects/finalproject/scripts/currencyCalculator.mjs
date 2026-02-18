import { getParam } from "./utilities.mjs";

export class CurrencyConversion {
  constructor() {
    this.fromCurrency;
    this.toCurrency;
    this.fromAmount;
    this.toAmount;
  }

  async init() {
    await this.setOptions();
    this.getParams();
    this.getUserInput();
    this.swapButton();
  }

  currencyConvertFromTo() {
    const toValue = document.getElementById('to-value');
    fetch(`https://api.frankfurter.dev/v1/latest?base=${this.fromCurrency}&symbols=${this.toCurrency}`)
    .then((resp) => resp.json())
    .then((data) => {
      const convertedAmount = (this.fromAmount * data.rates[this.toCurrency]).toFixed(2);
      localStorage.setItem('to-amount', convertedAmount);
      this.toAmount = convertedAmount;
      toValue.value = convertedAmount;
    });
  }

  currencyConvertToFrom() {
    const fromValue = document.getElementById('from-value');
    fetch(`https://api.frankfurter.dev/v1/latest?base=${this.toCurrency}&symbols=${this.fromCurrency}`)
    .then((resp) => resp.json())
    .then((data) => {
      const convertedAmount = (this.toAmount * data.rates[this.fromCurrency]).toFixed(2);
      localStorage.setItem('from-amount', convertedAmount);
      this.fromAmount = convertedAmount;
      fromValue.value = convertedAmount;
    });
  }

  getParams() {
    const param = getParam();
    let fromCurrency = 'EUR';
    let fromAmount;
    let toCurrency = 'USD';
    let toAmount;

    if(param) {
    const params = new URLSearchParams('?' + param)
    fromCurrency = params.get('from');
    fromAmount = params.get('from-value');
    toCurrency = params.get('to');
    toAmount = params.get('to-value')
    }

    localStorage.setItem('from-currency', fromCurrency);
    localStorage.setItem('to-currency', toCurrency);
    localStorage.setItem('from-amount', fromAmount);
    localStorage.setItem('to-amount', toAmount);

    this.fromCurrency = fromCurrency;
    this.toCurrency = toCurrency;
    this.fromAmount = fromAmount;
    this.toAmount = toAmount;

    this.setValuesForm();
  }

  getLocalStorage() {
    const fromAmount = localStorage.getItem('from-amount');
    const fromCurrency = localStorage.getItem('from-currency');
    const toAmount = localStorage.getItem('to-amount')
    const toCurrency = localStorage.getItem('to-currency')
    
    return {
      fromAmount: fromAmount,
      fromCurrency: fromCurrency,
      toAmount: toAmount,
      toCurrency: toCurrency
    }
  }

  setValuesForm() {
    const fromAmount = document.getElementById('from-value');
    const fromCurrency = document.getElementById('from-currency');
    const toAmount = document.getElementById('to-value');
    const toCurrency = document.getElementById('to-currency');

    fromAmount.value = this.fromAmount;
    fromCurrency.value = this.fromCurrency;
    toAmount.value = this.toAmount;
    toCurrency.value = this.toCurrency;
  }

  swapButton() {
    const fromAmount = document.getElementById('from-value');
    const fromCurrency = document.getElementById('from-currency');
    const toAmount = document.getElementById('to-value');
    const toCurrency = document.getElementById('to-currency');
    const swapButton = document.getElementById('swap');

    swapButton.addEventListener('click', () => {
      const lsValues = this.getLocalStorage();
    
      localStorage.setItem('to-amount', lsValues.fromAmount);
      localStorage.setItem('to-currency', lsValues.fromCurrency);
      localStorage.setItem('from-amount', lsValues.toAmount);
      localStorage.setItem('from-currency', lsValues.toCurrency);

      // Swap class properties
      this.fromAmount = lsValues.toAmount;
      this.fromCurrency = lsValues.toCurrency;
      this.toAmount = lsValues.fromAmount;
      this.toCurrency = lsValues.fromCurrency;

      // Swap DOM values
      fromAmount.value = this.fromAmount;
      fromCurrency.value = this.fromCurrency;
      toAmount.value = this.toAmount;
      toCurrency.value = this.toCurrency;
    });
  }

  getUserInput() {
    const fromCurrency = document.getElementById('from-currency')
    const fromValue = document.getElementById('from-value');
    const toCurrency = document.getElementById('to-currency');
    const toValue = document.getElementById('to-value');

    const fromAmount = this.fromAmount;
    const storedFromCode = this.fromCurrency;
    const toAmount = this.toAmount;
    const storedToCode = this.toCurrency;

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
      this.fromCurrency = fromCode;
      this.toCurrency = toCode;

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
      this.fromCurrency = fromCode;
      this.toCurrency = toCode;

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
      this.fromCurrency = fromCode;
      this.toCurrency = toCode;
      this.toAmount = parseFloat(toAmount);

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
      this.fromCurrency = fromCode;
      this.toCurrency = toCode;
      this.toAmount = parseFloat(toAmount);

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