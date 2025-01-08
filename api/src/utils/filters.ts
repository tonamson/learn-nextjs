import * as currency from 'currency-formatter'

export default class Filters {
    static money(money, symbol = '', symbol_left = true, fixed = 2) {
        if (money == undefined) {
            money = 0
        }
        if (symbol_left) {
            return currency.format(money, {
                symbol,
                decimal: '.',
                thousand: ',',
                precision: fixed,
                format: {
                    pos: '%s%v',
                    neg: '%s-%v',
                    zero: '%s%v',
                },
            })
        }
        return currency.format(money, {
            symbol,
            decimal: '.',
            thousand: ',',
            precision: fixed,
            format: {
                pos: '%v%s',
                neg: '-%v%s',
                zero: '%v%s',
            },
        })
    }

    static splitAddress(address: string, show = 6) {
        const strTemp = ''
        if (address == null || address.length === 0) {
            return ''
        }
        if (address.length < 8) {
            return address
        }
        return strTemp.concat(address.slice(0, show), '...', address.slice(-1 * show))
    }
}
