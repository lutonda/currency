
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
    var filter = {};
    client.get(source.url + source.endpoint + '?access_key=' + source.access_key, async function (data, response) {
        // parsed response body as js object
        filter.date = { $gte: data.date + 'T00:00:00Z', $lte: data.date + 'T23:59:59Z' }
        var version = await SyncVersion.findOne(filter).sort({ 'date': -1 })
        if (!version) {
            version=new SyncVersion();
            var exchange, log = [];
            version.sourceDate = data.date
            version = await version.save()
        }
        var exchange, log = [];
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
    var { source, data, date } = req.query
    date=date.split('WAT').join('T')
    data = base64decode(data);
    data = data.split('\n');
    var rates = [];
    var i = 0;

    rates.push(['AOA',1,1]);
    switch (source) {
        case 'Atlantico':
            i = -1;
            while (i < data.length) {
                rates.push([data[i += 1], data[i += 3], data[i += 2]]);
            }
            break;
        case 'BNI':
            i = -1;
            while (i < data.length) {
                rates.push([data[i++], data[i].split(' ')[1], data[i++].split(' ')[2]]);
            }
            break;
        case 'BCI':
            i = 0;
            while (i < data.length) {
                rates.push([data[i++], data[i++], data[i++]]);
            }
            break;
        default:
            rates = data.map(d => d.split(' '));
            break;
    }

    //return callback(data);
    var log=[];
    var source = await (await Source.findOne({ 'code': source }))
    if(!source) return [];
    //    { $gte: date + 'T00:00:00Z', $lte: date + 'T23:59:59Z' }
    var version = await SyncVersion.findOne({ date: date }).sort({ 'date': -1 })
    if (!version) {
        version=new SyncVersion();
        var exchange, log = [];
        version.sourceDate = date
        version.date = date
        version = await version.save()
    }
    version.sources.push(source);
    await version.save();
    //source.versions.push(version);
    
    var exchange = null;
    var baseRate=rates.filter(r=>r[0]=="EUR")[0][1].split(',').join('.') * 1;
    rates.forEach(async rate => {

        await Currency.findOne({ code: rate[0] }, async (err, currency) => {
            log=[];
            try {

                if (!currency) {
                    console.log('rate ' + rate[0] + ' notfound')
                    return;
                }
                if (err) {
                    log.push('err ' + err.toString())
                    console.log('err ' + err.toString())
                }

                exchange = new Exchange()
                exchange.inValue = baseRate/rate[1].split(',').join('.') * 1;
                exchange.outValue = baseRate/rate[2].split(',').join('.') * 1;
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
}
