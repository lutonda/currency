class ExchangeDTO {

    constructor(exchange) {
        this.date = exchange.date;
        this.value = exchange.inValue * 1;
        this.code = exchange.currency.code;
        this.name = exchange.currency.name;
        this.description = exchange.currency.description;

        //return this
    }

}

module.exports = ExchangeDTO;