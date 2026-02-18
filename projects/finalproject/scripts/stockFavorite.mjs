import { OneStock } from "./stockOne.mjs";

export class FavoriteStock {
    constructor() {
        
    }

    async init() {
        await this.makeDataList();
        this.removeFromLocalStorage();
    }

    removeFromLocalStorage() {
        document.addEventListener('click', (e) => {
            if(e.target.classList.contains('stock-remove')) {
                console.log('Button clicked!');
                let favorites = JSON.parse(localStorage.getItem('favorite-stocks')) || [];
                const stock = e.target.closest('.one-stock');
                if(stock) {
                    const symbol = stock.dataset.symbol;
                    console.log('Removing:', symbol);
                    const newFavorites = favorites.filter(fav => fav !== symbol);
                    localStorage.setItem('favorite-stocks', JSON.stringify(newFavorites));
                    stock.remove();
                }
            };
        });
    }   

    addToLocalStorage() {
        const button = document.getElementById('add-stock-button');
        button.addEventListener('click', () => {
            const stock = document.getElementById('add-favorite-stock').value;
            let favorites = JSON.parse(localStorage.getItem('favorite-stocks')) || [];
            if(!favorites.includes(stock)) {
                favorites.push(stock);
                localStorage.setItem('favorite-stocks', JSON.stringify(favorites));
                console.log('Added:', stock);
                const newStock = [stock];
                const oneStock = new OneStock(document.querySelector('.favorite-stock-list'), newStock);
                oneStock.init();
            }
        });
    }

    async makeDataList() {
        const favoriteList = document.getElementById('favorite-stocks-list');
        const stockList = await this.getDataList();
        let html = "";
        stockList.forEach(stock => {
            html += this.dataListTemplate(stock);
        });
        favoriteList.insertAdjacentHTML("beforeend", html);
    }

    async getDataList() {
        const res = await fetch('./data/stockList.json');
        const data = await res.json();
        return data;
    }

    dataListTemplate(ticker) {
        let html = `
        <option>${ticker}</option>`;
        return html;
    }
}