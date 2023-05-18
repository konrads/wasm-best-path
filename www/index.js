import { calcBestPath } from "./bestPath";

const sampleEdges = [
  // initial prices
  { source: "BNB", target: "USDT", provider: "binance", cost: 354.19 },
  { source: "USDT", target: "BNB", provider: "dydx", cost: 0.002745 },
  { source: "DOT", target: "USDT", provider: "binance", cost: 17.43 },
  { source: "USDT", target: "DOT", provider: "uniswap", cost: 0.05737 },
  { source: "BTC", target: "ETH", provider: "binance", cost: 15.09 },
  { source: "ETH", target: "BTC", provider: "1inch", cost: 0.06626 },
  { source: "ETH", target: "BNB", provider: "binance", cost: 6.548 },
  { source: "BNB", target: "ETH", provider: "raydium", cost: 0.1527 },
  { source: "BNB", target: "DOT", provider: "binance", cost: 20.22 },
  { source: "BNB", target: "ETH", provider: "binance", cost: 0.21 },
  { source: "DOT", target: "USDT", provider: "cakeswap", cost: 17.3 },
  // alternative bitmex prices
  { source: "BNB", target: "USDT", provider: "bitmex", cost: 354 },
  { source: "USDT", target: "BNB", provider: "bitmex", cost: 0.002799 },
  { source: "DOT", target: "USDT", provider: "bitmex", cost: 17.89 },
  { source: "USDT", target: "DOT", provider: "bitmex", cost: 0.05 },
  { source: "BTC", target: "ETH", provider: "bitmex", cost: 15 },
  { source: "ETH", target: "BTC", provider: "bitmex", cost: 0.07726 },
  { source: "ETH", target: "BNB", provider: "bitmex", cost: 6.578 },
  { source: "BNB", target: "ETH", provider: "bitmex", cost: 0.15 },
  { source: "BNB", target: "DOT", provider: "bitmex", cost: 20.33 },
  { source: "BNB", target: "ETH", provider: "bitmex", cost: 0.22 },
  { source: "DOT", target: "USDT", provider: "bitmex", cost: 17.333 },
];

function calculate() {
  const inputs = document.getElementById("inputs");
  const output = document.getElementById("output");
  const time = document.getElementById("time");
  output.textContent = `starting`;
  inputs.textContent = JSON.stringify(sampleEdges, null, "  ");
  const t0 = performance.now();
  let res;
  try {
    res = calcBestPath(sampleEdges);
    const t1 = performance.now();
    time.textContent = `${t1 - t0} ms`;
    output.textContent = JSON.stringify(res, null, "  ");
  } catch (e) {
    const t1 = performance.now();
    output.textContent = `error: ${JSON.stringify(e)}`;
    time.textContent = `${t1 - t0} ms`;
  }
}

calculate();
