# Scratch

Static Web Project Structure

## Features

* Sass for stylesheets
* Modern JavaScript
* [Gulp](https://gulpjs.com/) for compiling assets, optimizing images, and concatenating and minifying files
* [Browsersync](http://www.browsersync.io/) for synchronized browser testing
* [Bootstrap](https://getbootstrap.com/) for simplifying CSS commands

## Requirements

Make sure all dependencies have been installed before moving on:

* [Node.js](http://nodejs.org/) >= 8.0.0
* [Gulp](https://gulpjs.com/docs/en/getting-started/quick-start)

## Theme structure

```shell
root/                   # → Root of Scratch theme
├── dist/               # → Built theme assets (never edit)
├── node_modules/       # → Node.js packages (never edit)
├── src/                # → Front-end assets
│   ├── fonts/          # → Theme fonts
│   ├── images/         # → Theme images
│   ├── js/             # → Theme JS
│   └── scss/           # → Theme stylesheets
├── .babelrc            # → JS Babel presets
├── gulpfile.babel.js   # → Gulp tasks
├── package.json        # → Node.js dependencies and scripts
├── index.html          # → Main template file
```

## Theme development

* Run `npm install` from the theme directory to install dependencies

### Build commands

* `npm run start` — Compile assets when file changes are made, start Browsersync session
Complete the web url `http://localhost:3000` with `/dist`
* `npm run build` — Compile and optimize the files in your assets directory for production