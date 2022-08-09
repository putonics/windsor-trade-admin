export default class Subordinate {
    docid = ''
    name = ''
    /////////////////////////////////////////////////////////////
    dp = 0 //direct package i.e only the subordinate package
    tp = 0 //total package price of this member
    mp = 0 //total monthly package price of this member

    constructor(s = null) {
        this.docid = s && s.docid ? s.docid.toUpperCase() : ''
        this.name = s && s.name ? s.name.toUpperCase() : ''
        this.dp = s && s.dp ? s.dp : 0
        this.tp = s && s.tp ? s.tp : 0
        this.mp = s && s.mp ? s.mp : 0
    }

    json = () => {
        const { docid, name, dp, tp, mp } = this
        return ({ docid, name, dp, tp, mp })
    }
}