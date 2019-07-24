### Sources

- https://medium.com/@ZeFifi/d%C3%A9buter-avec-webpack-partie-1-import-export-et-compilation-ffd45bb3943d
- https://geekco.fr/blog/webpack-4-ma-configuration-pour-compiler-javascript-html-css-images-et-fonts
- https://www.valentinog.com/blog/babel/
- https://scotch.io/tutorials/setting-up-webpack-for-any-project
- https://vuejs-templates.github.io/webpack/structure.html	

### Initialise package.json pour NPM

```sh
npm init -y
```

Add webpack as a dev dependency to the project

```sh
npm install webpack -D
```

Add the following script to package.json

```json
"scripts": {
  "build": "webpack",
  "start": "webpack --watch"
},
```

### Create folder structure

 - Create a new folder called src in the root of the project.
 - Create a file inside src called app.js.
 - Create an index.html file in the root of the project.

```sh
mkdir src && cd src && touch app.js && cd .. && touch index.html
```

### Refer to the JavaScript right before </body> in index.html.

```html
<html>
	<head>
		<title>My webpack project</title>
		<script type="text/javascript" src="dist/app-bundle.js"></script>
	</head>
	<body>
		<h1>My webpack project</h1>
	</body>
</html>
```

### Create a file called webpack.config.js in the root of your project.

```sh
touch webpack.config.js
```

```javascript
const webpack = require("webpack");
const path = require("path");

let config = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./app-bundle.js"
  }
}

module.exports = config;
```


### Ajouter du javascript dans app.js

```javascript
document.write("Je débute avec Webpack !");
```

### Tester

Lancer `npm run build` puis ouvrir index.html dans un navigateur.
Lancer `npm run start` pour activer le rafraichissement automatique de la compilation.


### Intégrer Babel

Ajouter les dépendances :

```sh
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
```

Create a new file named `.babelrc` inside the project folder :

```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

Integrate Babel in Webpack process : edit `webpack.config.js` and add this after the "output" object :

```javascript
module: {
    rules: [{
      test: /\.js|jsx$/,
      exclude: /node_modules/,
      use: { loader: "babel-loader" }
    }]
  }
```

Tester en utilisant la nouvelle syntaxe dans app.js; ajouter la ligne suivante :

```javascript
let a = "J'apprends Webpack (et tout le reste) !";
document.write(a);
```

Tester en lançant `npm run build` et en ouvrant `index.html`.


### Ajouter la compilation du scss en CSS


Add the `assets` and `assets/scss` directories structure inside `src` :

```sh
mkdir src/assets src/assets/scss
```

Create scss file at `src/scss/app.scss` and add some scss inside :

```scss
$midnight-blue : #2c3e50;

body {
  background-color: $midnight-blue;
}
```

Add dependency from index.js :

```javascript
require("./assets/scss/app.scss");
```

Ajouter les dépendances pour la compilation SCSS :

```
npm i sass-loader node-sass css-loader --save-dev
```

Configurer webpack en ajoutant dans la section `rules` de `webpack.config.js` :

```javascript
  {
    test: /\.(sass|scss)$/,
    use: [
    {
        loader: "css-loader" // translates CSS into CommonJS
    }, 
    {
        loader: "sass-loader" // compiles Sass to CSS
    }
    ]
  }
```

Tester avec `npm run start`.


### Extraire le CSS compilé dans le bundle dans un fichier CSS séparé

Ajouter le plugin `mini-css-extract-plugin`

```sh
npm i mini-css-extract-plugin --save-dev
```

Configurer dans `webpack.config.js` :

```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  module: {
	rules: [
	  {
		// règles de compilation pour javascript
	  },
	  {
		test: /\.sc|ass$/,
		use: [
		{ loader: MiniCssExtractPlugin.loader },
		{ loader: "css-loader" },          
		{ loader: "sass-loader" }
		]
	  },
	]
  },
  plugins: [
	new MiniCssExtractPlugin({
	  filename: "[name].css",
	  chunkFilename: "[id].css"
	}),
  ]
}; 
```


### Installer un serveur de développement avec Hot Module Reload

Installer la dépendance :

```
npm install webpack-dev-server --save-dev
```

Après l’array de votre objet plugins dans votre fichier de configuration Webpack, ajouter :

```
devServer: {
  contentBase: path.resolve(__dirname, "./dist"),
  historyApiFallback: true,
  inline: true,
  open: true,
  hot: true
},
devtool: "eval-source-map"
```


Remplacer la commande `start`dans package.json :

```
"start": "webpack-dev-server -d --hot --config webpack.config.js --watch"
```


### Move index.html in src and add HTML Webpack plugin

Move :

```
mv index.html src
```

Remove inclusion of javascript from HTML :

```html
<script type="text/javascript" src="dist/app-bundle.js"></script>
```

Add HTML webpack dependency :

```sh
npm install html-webpack-plugin --save-dev
```

Add the plugin to `webpack.config.js` :

```javascript
  plugins: [  // Array of plugins to apply to build chunk
      new HtmlWebpackPlugin({
          template: __dirname + "/src/index.html",
          inject: 'body'
      })
  ],
```


### Add webpack dashboard

Add dependency :

```
npm install webpack-dashboard --save-dev
```

Modify webpack.config.js :

```
const DashboardPlugin = require("webpack-dashboard/plugin");
```

Add it to the plugins section :

```javascript
plugins: [
	// other plugins
	new DashboardPlugin()
]
```