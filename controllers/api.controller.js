
var Currency = require("../models/currency");
var Source = require("../models/source");
var SyncVersion = require("../models/syncVersion");
var Exchange = require("../models/exchange");
var ExchangeDTO = require("../models/dto/exchange.dto.js");

exports.index = function (req, res, next) {
    res.render("api", { title: "Hey", message: "Hello there!" });
};
exports.getOneCurrency= async (req,res)=>{
    var currency=await Currency.find(req.params.code);
    res.json({
        status: 200,
        message: "success",
        currencies:currency         
    })  
}
exports.getAllCurrencies = async(req, res, next) => {
    console.log('colled')
    console.log(new Date())
    var currencies=await Currency.find();
    
    res.json({
        status: 200,
        message: "success",
        currencies:currencies         
    })
};

exports.getAllBy = async (req, res) => {

    var { source, version } = req.params;
    var { base, date } = req.query;

    var filter = version && version !== 'latest' ? { version: version * 1 } : {};
    if (date) filter.date = { $gte: date + 'T00:00:00Z', $lte: date + 'T23:59:59Z' }


    var sourceObj=await Source.findOne({code:source});
    
    version = await SyncVersion.findOne(filter).sort({ 'date': -1 }).populate('exchanges');
    var exchanges = []
    var baseExchange;
    await Exchange.find({ version: version, source:sourceObj }).exec(async (err, datas) => {
        if (base) {
            var currency = await Currency.findOne({ code: base })
            baseExchange = await Exchange.findOne({ version: version, currency: currency });
        }
        datas.forEach(data => {

            try {
                if (baseExchange)
                    data.inValue = data.inValue / baseExchange.inValue;
                exchanges.push(new ExchangeDTO(data))
            } catch (error) {
                console.log(data)
                console.log(error.toString())
            }
        })

        res.status = 401
        res.code = 401
        res.json({
            status: 401,
            message: "Unknow user",
            source: source,
            base: base || 'EUR',
            version: version.version,
            date: version.date,
            exchanges: exchanges.sort((x, y) => x.code > y.code ? 1 : -1)
        })
    })

}

exports.convert = async (req, res) => {

    var { source, version } = req.params;
    var { base, date, from, to, amount } = req.query;

    var filter = version && version !== 'latest' ? { version: version * 1 } : {};
    if (date)
        filter.date = { $gte: date + 'T00:00:00Z', $lte: date + 'T23:59:59Z' }


    version = await SyncVersion.findOne(filter).sort({ 'date': -1 }).populate('exchanges');

    var sourceObj=version.sources.filter(s=>s.code==source)[0];
    var currencies = await Currency.find({ code: [from, to] })
    exchanges = await Exchange.find({ version: version, currency: currencies, source:sourceObj });
    from = exchanges.filter(e=>e.currency.code==from)[0]
    to = exchanges.filter(e=>e.currency.code==to)[0]

    var total = (amount * 1) *  to.inValue / from.inValue


    res.status = 401
    res.code = 401
    res.json({
        status: 401,
        message: "Unknow user",
        source: source,
        base: base || 'EUR',
        version: version.version,
        date: version.date,
        data: {
            from: from.currency.code,
            to: to.currency.code,
            amount: amount,
            value: total,
            version:version,
            source:sourceObj
        }
    })
};

exports.getAllSources = async function (req, res) {

    var sources = await Source.find()
    res.status = 200
    res.json({
        status: 200,
        message: "success",
        sources: sources
    })

};
