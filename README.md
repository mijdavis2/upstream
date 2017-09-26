# UpStream

UpStream is a stream flow calc utility designed for <a href="http://www.tu.org/"><b>Trout Unlimited</b></a>, a national non-profit organization whose mission is to "conserve, protect and restore North America's coldwater fisheries and their watersheds".

**Features**:
- Generate comprehensive stream flow csv reports through a feature rich cross-platform native app.
- Auto generate data input forms from start bank, end bank, and desired number of stations (calculated from start & end bank inputs).
- Auto-fill dates and times.
- Store site names and IDs in a pick-list.
- Generates fully featured CSV files with complete excel formatted equasions.
- Work easy knowing that a temp file is saved on every keystroke - if your device battery dies or the app crashes, you'll never lose data.
- Email csv reports directly from the app (in beta).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Install](#install)
- [Develop](#develop)
  - [Requirements](#requirements)
  - [Build](#build)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Install

Go to the [releases page](https://github.com/mijdavis2/upstream/releases)
and download the appropriate package:
    
- **Windows**: `UpStream.Win.Setup.[version].exe`
  - double click after download to install - ignore any windows store warnings

- **Linux**: `upstream-[version]-x86_64.AppImage` 
  - if necessary, `chomd +x`, then run as any other binary to install

## CSV generation

When importing csv files created by **Upstream** use the following settings:

- Character set: `Unicode (UTF-8)`
- From row: `1`
- Separator Options:
    - `Separated by`
        - `Tab`
        - `Comma`
        - `Semicolon`
- Text Delimiter: `"`

## Develop

> This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).

This project utilizes vuex for state storage and GitHub's [primer-css framework](primercss.io) as a styling base.


### Requirements

- node 7+
- yarn

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:9080
yarn dev

# run unit & end-to-end tests
yarn test

# lint all JS/Vue component files in `src/`
yarn lint

```

### Build

```
yarn build
```

## License

**Software:** [MIT (c) 2017](LICENSE)


**Icons:**

- <p class="source">Scroll icon made by <a href="http://www.flaticon.com/authors/daniel-bruce" title="Daniel Bruce">Daniel Bruce</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></p>
