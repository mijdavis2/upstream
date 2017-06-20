# upstream

> Streamflow calc utility for Trout Unlimited

## Requirements

- node 7+
- yarn

> Note: Linux dev environment is preferred

## Develop

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:9080
yarn run dev

# run unit & end-to-end tests
yarn test

# lint all JS/Vue component files in `src/`
yarn run lint

```

## Build

`electron-packager ./ upstream --all --overwrite`

## Specs

_Just some notes on desired features_

Inputs
- startBank.tapeFt: int
- endBank.tapeFt: int

Output
- numberOfStationOptions
    - "If 14 stations, take measurements every x ft"
    - "" same for 15-17+

^ Click one of those options

Output
- table with tapeFt set for each station

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
