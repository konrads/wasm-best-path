import { calcBestPath } from "./bestPath";

const sampleEdges = [
  { source: "BNB", target: "USDT", provider: "binance", cost: 354.19 },
  { source: "USDT", target: "BNB", provider: "dydx", cost: 0.002745 },
  { source: "DOT", target: "USDT", provider: "binance", cost: 17.43 },
  { source: "USDT", target: "DOT", provider: "uniswap", cost: 0.05737 },
  { source: "BTC", target: "ETH", provider: "binance", cost: 15.09 },
  { source: "ETH", target: "BTC", provider: "1inch", cost: 0.06626 },
  { source: "ETH", target: "BNB", provider: "binance", cost: 6.548 },
  { source: "BNB", target: "ETH", provider: "raydium", cost: 0.1527 },
];

function calculate() {
  const t0 = performance.now();
  const res = calcBestPath(sampleEdges);
  const t1 = performance.now();
  const output = document.getElementById("output");
  output.textContent = `time: ${t1 - t0} ms:

output: ${JSON.stringify(res, null, "  ")}`
}

calculate();
