# WASM wrapper for [best-path](https://github.com/konrads/best-path) library

Wraps the best path calculation in Rust. Based on https://github.com/rustwasm/wasm_game_of_life.

## Run

```shell
cargo build
wasm-pack build
cd www && npm i && npm run start && cd -
open localhost:8080
# observe the inputs and outputs, modify www/index.js#sampleEdges as necessary
```

## Snags

- Inputs and outputs are serialized into a String, as the required dynamic Vector isn't catered for in wasm pack
