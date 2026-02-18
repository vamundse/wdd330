import { getStockData } from "./apiDataFetch.mjs";
export class OneStock {
    constructor(element, stocklist) {
        this.stocklist = stocklist;
        this.element = element;
    }

    async init() {
        await this.renderStockData(this.stocklist)
    };

    async renderStockData(stocklist) {
        const stocks = stocklist;
        const stockSection = this.element;
        for (const stock of stocks) {
            const data = await getStockData(stock);
            const stockTemplate = this.stockTemplate(data);
            stockSection.insertAdjacentHTML('beforeend', stockTemplate);
        }
    }

    stockTemplate(stock) {
        let html = `
        <div class="one-stock" data-symbol="${stock.symbol}">
            <div class="stock-symbol"><h2>${stock.symbol} / ${stock.name}</h2></div>
            <div class="stock-close">
                <div class="close-title">Yesterday</div>
                <div>$${stock.previousClose}</div>
            </div>
            <div class="stock-price">
                <div class="price-title">Today</div>
                <div>$${stock.price}</div>
            </div>
            <div class="stock-change">
                <div class="change-title">Change</div>
                <div class="${stock.changePercentage > 0 ? 'positive' : stock.changePercentage < 0 ? 'negative' : ''}">${stock.changePercentage.toFixed(2)}%</div>
            </div>
            <button class="stock-remove">x</button>
        </div>
        `;
    return html;
    }
}