# upstream

> Streamflow calc utility for Trout Unlimited

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run unit & end-to-end tests
npm test


# lint all JS/Vue component files in `src/`
npm run lint

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).


# Specs

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

# Build

`electron-packager ./ upstream --all --overwrite`