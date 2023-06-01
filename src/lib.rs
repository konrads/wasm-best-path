extern crate best_path;
extern crate wasm_bindgen;

use best_path::{
    prelude::{
        floyd_warshall::calculator::{FloydWarshallCalculator, SCALE},
        Pair, ProviderPair,
    },
    BestPathCalculator,
};
use wasm_bindgen::prelude::*;

// NOTE: Cannot pass in/out Vec<struct>, some suggest to (de/)serialize it with serde, or convert to bytes.
//       to minimize dependencies, I instead stringified via format!(),  separators used in hierarchical order: ",", ":", ";"

// // Following structs can be (de/)serialized, but not in a Vector
// #[wasm_bindgen(getter_with_clone)]
// #[derive(Debug)]
// pub struct Edge { source: String, target: String, provider: String, cost: f64 }
//
// // Constructor needed as cannot construct JS version with { source: "xx", target: "yy", provider: "zz", cost: 11.22 }
// #[wasm_bindgen]
// impl Edge {
//     pub fn new(source: String, target: String, provider: String, cost: f64) -> Edge {
//         Edge { source, target, provider, cost }
//     }
// }
//
// #[wasm_bindgen(getter_with_clone)]
// #[derive(Debug)]
// pub struct Path { source: String, target: String, total_cost: f64, steps: Vec<Edge> }

#[wasm_bindgen]
pub fn calc_best_path(edges_str: String) -> String {
    let in_graph = edges_str
        .split('\n')
        .map(|x| x.trim())
        .filter(|x| !x.is_empty())
        .map(|x| {
            if let [source, target, provider, cost_str] = x.split(',').map(|x| x.trim()).collect::<Vec<_>>().as_slice() {
                (
                    ProviderPair {
                        pair: Pair {
                            source: source.to_string(),
                            target: target.to_string(),
                        },
                        provider: provider.to_string(),
                    },
                    (cost_str.parse::<f64>().unwrap() * SCALE) as u128,
                )
            } else {
                panic!("Invalid edge string {:?}", x)
            }
        })
        .collect::<Vec<_>>();

    let out_path = FloydWarshallCalculator::calc_best_paths(&in_graph).unwrap();

    out_path
        .into_iter()
        .map(|(p, pp)| {
            format!(
                "{},{},{},{}",
                p.source,
                p.target,
                pp.total_cost as f64 / SCALE,
                pp.steps
                    .into_iter()
                    .map(|x| format!("{};{};{};{}", x.pair.source, x.pair.target, x.provider, x.cost as f64 / SCALE))
                    .collect::<Vec<_>>()
                    .join(":")
            )
        })
        .collect::<Vec<String>>()
        .join("\n")
}
