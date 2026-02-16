import { getStockData } from "./apiDataFetch.mjs";
import { getParam } from "./utilities.mjs";

export class OneStock {
    constructor(element) {
        const param = getParam();
        this.stock = param ? [param]: ['MSFT', 'AAPL', 'TSLA', 'META', 'AMZN', 'GOOGL'];
        this.element = element;
    }

    async renderStockData() {
        let mockStockData;
        try {
            const response = await fetch('data/mockStockData.json');
            mockStockData = await response.json();
        } catch (error) {
            console.error('Failed to load mock stock data:', error);
            return;
        }
        const stocks = this.stock;
        const stockSection = this.element;
        for (const stock of stocks) {
            const data = mockStockData[stock]; //await getStockData(stock);
            const stockTemplate = this.stockTemplate(data);
            stockSection.insertAdjacentHTML('beforeend', stockTemplate);
        }
    }

    stockTemplate(stock) {
        let html = `
        <div class="one-stock">
            <div class="stock-symbol"><h2>${stock.symbol} / ${stock.name}</h2></div>
            <div class="stock-close">
                <div class="close-title">Close</div>
                <div>$${stock.previousClose}</div>
            </div>
            <div class="stock-price">
                <div class="price-title">Price</div>
                <div>$${stock.price}</div>
            </div>
            <div class="stock-change">
                <div class="change-title">Change</div>
                <div>${stock.changePercentage.toFixed(2)}%</div>
            </div>
        </div>
        `;
    return html;
    }
}