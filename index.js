const config = require('./config');
const tempplate = require('./template');
const program = require('commander');
const http = require('http');
const querystring = require('querystring');

program
  .version('1.0.0')
  .usage('<city_name> [options]')
  .option('-c, --country', 'Set country code. Default "ru"', 'ru')
  .option('-v, --verbose', 'Verbose output. Default false')
  .parse(process.argv);

const verboseMode = !!program.verbose;

const request = {
  host: config.api_host,
  path: config.api_path + '?' + querystring.stringify({
    appid: config.app_id,
    units: config.units,
    q: program.args.pop()
  })
};

let response = '';
let res = http.get(request, resp => {
  const statusCode = res.statusCode;

  resp.on('data', chunk => {
    response += chunk;
  });

  resp.on('end', () => {
    try {
      let data = JSON.parse(response);
      if (verboseMode) {
        console.log(data);
      } else {
        console.log(tempplate(data));
      }
    } catch (e) {
      console.log(new Error(e.message));
    }
  });
});

res.on('error', err => console.log(new Error(err)));

