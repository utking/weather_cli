const config = require("./config/config");
const forecastTemplate = require("./templates/forecast_template");
const template = require("./templates/template");
const program = require("commander");
const http = require("http");
const querystring = require("querystring");

const Console = require('console').Console;
const Logger = new Console(process.stdout, process.stderr);

program
  .version("1.0.1")
  .usage("<city_name> [options]")
  .option("-f, --forecast", "Show 5 day forecast")
  .option("-c, --country [code]", "Set country code. Default 'ru'", "ru")
  .option("-v, --verbose", "Verbose output. Default false")
  .parse(process.argv);

const verboseMode = !!program.verbose;
const cityName = program.args.length ? program.args.pop() : config.default_city;
const requestPath = (program.forecast ? config.api_forecast_path : config.api_path);

const request = {
  host: config.api_host,
  path: requestPath + "?" + querystring.stringify({
    appid: config.app_id,
    units: config.units,
    q: cityName
  }) + (program.country ? ("," + program.country) : "")
};

let response = "";
let res = http.get(request, (resp) => {
  const statusCode = res.statusCode;

  resp.on("data", (chunk) => {
    response += chunk;
  });

  resp.on("end", () => {
    try {
      let data = JSON.parse(response);
      if (verboseMode) {
        Logger.log(data);
      } else {
        if (program.forecast) {
          Logger.log(forecastTemplate(data));
        } else {
          Logger.log(template(data));
        }

      }
    } catch (e) {
      Logger.log(new Error(e.message));
    }
  });
});

res.on("error", (err) => { Logger.log(new Error(err)) });

