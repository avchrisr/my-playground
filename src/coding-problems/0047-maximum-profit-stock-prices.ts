/*
This problem was asked by Facebook.

Given a array of numbers representing the stock prices of a company in chronological order, 
write a function that calculates the maximum profit you could have made from buying and selling that stock once. 
You must buy before you can sell it.

For example, given [9, 11, 8, 5, 7, 10], you should return 5, since you could buy the stock at 5 dollars and sell it at 10 dollars.
*/

// SOLUTION     --   O(n) time  |  O(1) space
// vars: minBuyPrice, maxSellPrice, maxProfit, currBuyPrice, currSellPrice, currProfit
// iterate through the stock prices in the array
// if the next iterating number is smaller than the currBuyPrice, set the currBuyPrice to it. set the minBuyPrice/maxSellPrice/maxProfit up to that point. set the currProfit to 0
// if the next iterating number is smaller than the currBuyPrice AND the currProfit is 0, then set the currBuyPrice to it
// if the next iterating number is greater than the currBuyPrice, set the currSellPrice to it, and add the diff to the currProfit
// once the loop exits, check the max/curr values, and return the minBuyPrice|maxSellPrice|maxProfit

const maximumProfitCalc = (stockPrices: number[]): any => {
    if (stockPrices.length < 2) {
        return `NOT ENOUGH INFO`;
    }

    let minBuyPrice: number = stockPrices[0], maxSellPrice: number, maxProfit: number = 0
    let currBuyPrice: number = stockPrices[0], currSellPrice: number, currProfit: number = 0;

    for (let i=1; i < stockPrices.length; i++) {
        if (stockPrices[i] < currBuyPrice) {
            currBuyPrice = stockPrices[i];
            currProfit = 0;
        } else if (stockPrices[i] > currBuyPrice) {
            currSellPrice = stockPrices[i];
            currProfit += currSellPrice - stockPrices[i-1];
            if (currProfit > maxProfit) {
                maxProfit = currProfit;
                maxSellPrice = currSellPrice;
                minBuyPrice = currBuyPrice;                
            }
        }
    }

    return {
        minBuyPrice,
        maxSellPrice,
        maxProfit
    };
};


// const stockPrices = [9, 11, 8, 5, 7, 10];       // 5, 10  (5)
// const stockPrices = [9, 11, 1, 5, 7, 10];       // 1, 10 (9)
// const stockPrices = [9, 21, 1, 5, 7, 10];       // 9, 21 (12)
const stockPrices = [9, 2, 1, 5, 10, 7];       // 1, 10 (9)

console.log(maximumProfitCalc(stockPrices));

export {};
