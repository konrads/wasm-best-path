import { calcBestPath } from "./bestPath";

export function calculate() {
  const output = document.getElementById('output');
  const time = document.getElementById('time');
  const inputs = [...document.querySelectorAll('#inputs .input')].map((input) => {
    const source = input.querySelector('.source');
    const target = input.querySelector('.target');
    const provider = input.querySelector('.provider');
    const cost = input.querySelector('.cost');
    return({source: source.value, target: target.value, provider: provider.value, cost: +cost.value});
  }).filter(({source, target}) => source != '' && target != '');
  output.textContent = `starting`;
  const t0 = performance.now();
  try {
    const res = calcBestPath(inputs);
    const t1 = performance.now();
    function stepsStr(steps) {
      return [...steps.entries()].map(([i, {source, target, provider, cost}]) => i == 0 ? `${source} → ${target} @ ${cost} (${provider})`: ` → ${target} @ ${cost} (${provider})`).join(``)
    }
    const resStr = res.filter(({source, target}) => source != target).map(({source, target, totalCost, steps}) => `${source}-${target}`.padEnd(9, ' ') + `@ ${totalCost}${steps.length > 0 ? `: ${stepsStr(steps)}` : ''}`).join(`\n`)
    time.textContent = `${t1 - t0} ms`;
    output.textContent = resStr;
  } catch (e) {
    const t1 = performance.now();
    time.textContent = `${t1 - t0} ms`;
    output.textContent = `error: ${e}: ${JSON.stringify(e)}`;
  }
}

document.getElementById("calculate").addEventListener("click", _ => {
  calculate();
});