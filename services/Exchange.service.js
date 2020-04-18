
const cheerio = require('cheerio')
const HtmlTableToJson = require('html-table-to-json');

var SyncVersion = require('../models/syncVersion');
var Currency = require('../models/currency')
var Exchange = require('../models/exchange')
var Source = require('../models/source')
const { base64encode, base64decode } = require('nodejs-base64')
var config = require('../config/config.json');

var Client = require('node-rest-client').Client;

var client = new Client();

exports.international = async function (data, callback) {

    source = await Source.findOne({ code: 'Fixer' })

    var exchange = null;
    var currency = null;
    client.get(source.url + source.endpoint + '?access_key=' + source.access_key, async function (data, response) {
        // parsed response body as js object
        var version = new SyncVersion();
        var exchange, log = [];
        version.sourceDate = data.date
        version = await version.save()
        Object.keys(data.rates).map(i => [data.rates[i], i]).forEach(async rate => {

            await Currency.findOne({ code: rate[1] }, async (err, currency) => {
                try {

                    if (!currency) {
                        currency = new Currency()
                        currency.code = rate[1]
                        await currency.save()
                        log.push('rate ' + rate[1] + ' notfound')
                        console.log('rate ' + rate[1] + ' notfound')
                    }
                    if (err) {
                        log.push('err ' + err.toString())
                        console.log('err ' + err.toString())
                    }

                    exchange = new Exchange()
                    exchange.inValue = rate[0];
                    exchange.outValue = rate[0];
                    exchange.source = source;
                    exchange.currency = currency;
                    exchange.version = version;

                    exchange.log = log;
                    exchange.isActive = log.length == 0
                    exchange = await exchange.save()

                } catch (e) {
                    exchange.log.push('err ' + e.toString())
                    exchange = await exchange.save()
                }
            })

        });
    });/**/
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing     

}
exports.local = async function (req, res, callback) {

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    var { source, data } = req.query
    data = base64decode(data);
    return callback(data);
    var sources = await (await Source.findOne({ 'code': source }))
    console.log(sources)
    var exchange = null;
    var currency = null;
    var $ = null;
    var jsonTables = null;
    sources.forEach(source => {
        client.get(source.url, async function (data, response) {
            $ = cheerio.load(data.toString());
            data = $(source.htmlSelector).parent().html()

            jsonTables = HtmlTableToJson.parse(data);
            console.log('------------------------------')
            console.log(jsonTables)

        })
    })
}
