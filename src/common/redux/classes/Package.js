export default class Package {
    index = 0
    amount = 0
    date = 0

    constructor(p = null) {
        this.index = p && p.index ? (+p.index) : 0
        this.amount = p && p.amount ? (+p.amount) : 15
        this.date = p && p.date ? (+p.date) : 0
    }

    json = () => {
        return ({ index: this.index, amount: this.amount, date: this.date })
    }
}