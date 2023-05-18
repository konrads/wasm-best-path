import { calc_best_path } from "wasm-best-path";

function calcBestPath(edges) {
  const edgesStr = edges.map((x) => `${x.source},${x.target},${x.provider},${x.cost}`).join("\n");
  const resStr = calc_best_path(edgesStr);
  return resStr.split("\n").map((x) => x.split(",")).map(([source, target, totalCostStr, stepsStr]) => {
    const totalCost = +totalCostStr;
    let steps = [];
    if (stepsStr && stepsStr.trim().length > 0) {
      steps = stepsStr.trim().split(":").map((x) => {
        const [source, target, provider, costStr] = x.split(";");
        return { source, target, provider, cost: +costStr}
      })
    };
    return { source, target, totalCost, steps}
  });
}

export { calcBestPath };
