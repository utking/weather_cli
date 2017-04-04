# weather_cli
CLI weather app

## Requirements

* commander

## Installation

```
$ npm install
```

Create a `config.js` exporting an object of the following structure:

```
module.exports = {
  app_id: 'api.openweathermap.org App ID',
  api_host: 'api.openweathermap.org',
  api_path: '/data/2.5/weather',
  units: 'metric' // or another
};
```

## Usage examples

```
// Show all usage options
$ node index.js -h

// fetch current weather for a city
$ node index.js city_name

// fetch current weather for a city in verbose mode
$ node index.js city_name -v

```

## License

This code uses the [MIT License](https://opensource.org/licenses/MIT)
