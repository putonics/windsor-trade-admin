export default class PackageRequest {
    appname = ''
    subscriberdocid = ''
    docid = '' //WC{name[0:1]}000001
    todocid = ''
    amount = 0
    ///////////////////
    name = ''
    countrycode = ''
    mobile = ''
    email = ''
    ////////////////////
    toname = ''
    tocountrycode = ''
    tomobile = ''
    toemail = ''
    ////////////////////
    requestedon = 0
    solvedon = 0

    constructor(pr = null) {
        this.appname = pr && pr.appname ? pr.appname : ''
        this.subscriberdocid = pr && pr.subscriberdocid ? pr.subscriberdocid : ''
        this.docid = pr && pr.docid ? pr.docid.toUpperCase() : ''
        this.todocid = pr && pr.todocid ? pr.todocid.toUpperCase() : ''
        this.amount = pr && pr.amount ? pr.amount : 0
        ////////////////////////////////////////////////////
        this.name = pr && pr.name ? pr.name.toUpperCase() : ''
        this.countrycode = pr && pr.countrycode ? pr.countrycode : ''
        this.mobile = pr && pr.mobile ? pr.mobile : ''
        this.email = pr && pr.email ? pr.email : ''
        ////////////////////////////////////////////////////
        this.toname = pr && pr.toname ? pr.toname.toUpperCase() : ''
        this.tocountrycode = pr && pr.tocountrycode ? pr.tocountrycode : ''
        this.tomobile = pr && pr.tomobile ? pr.tomobile : ''
        this.toemail = pr && pr.toemail ? pr.toemail : ''
        ////////////////////////////////////////////////////
        this.requestedon = pr && pr.requestedon ? pr.requestedon : 0
        this.solvedon = pr && pr.solvedon ? pr.solvedon : 0
    }

    json = () => {
        const {
            appname, subscriberdocid, docid, todocid, amount,
            name, countrycode, mobile, email,
            toname, tocountrycode, tomobile, toemail,
            requestedon, solvedon,
        } = this
        return ({
            appname, subscriberdocid, docid, todocid, amount,
            name, countrycode, mobile, email,
            toname, tocountrycode, tomobile, toemail,
            requestedon, solvedon,
        })
    }
}