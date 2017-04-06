# weather_cli
CLI weather app

## Requirements

* commander

## Installation

```
$ npm install
```

Create a `config.js` (see the config.js.sample for details).
Create `forecast_template.js` and `template.js` files (see template.js.sample and forecast_template.js.sample for details).

## Usage examples

```
// Show all usage options
$ node index.js -h

// fetch current weather for a city
$ node index.js city_name

// fetch current weather for a city in verbose mode
$ node index.js city_name -v

// fetch forecast for a city (5 days)
$ node index.js city_name -f
```

## License

This code uses the [MIT License](https://opensource.org/licenses/MIT)
