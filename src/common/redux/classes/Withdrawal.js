import User from "./User"

/**
 * Withdrawal
 * Case-1: Withdrawal to bank acoount
 * User send the request status is pending until served by the Super Admin
 * User can see pending request and served request in his login
 * Super admin can see only the pending requests and he will serve the request manualy
 *
 * Case-2: Withdrawal to purchase PKG for himself or for other users
 * User send the request and the request will be served if the balace is available in his wallet
 */
export default class Withdrawal {
  docref = { id: "" }
  appname = ""
  subscriberdocid = ""
  docid = "" //user-docid
  name = ""
  countrycode = ""
  mobile = ""
  email = ""
  walletBalance = 0 //walletBalance at the time of request //updated at the time of served
  amount = 0
  requestedon = 0
  servedon = 0
  description = ""

  constructor(w = null) {
    this.docref =
      w && w.docref && w.docref.id ? { id: w.docref.id } : { id: "" }
    this.appname = w && w.appname ? w.appname : ""
    this.subscriberdocid = w && w.subscriberdocid ? w.subscriberdocid : ""
    this.docid = w && w.docid ? w.docid : ""
    this.name = w && w.name ? w.name : ""
    this.countrycode = w && w.countrycode ? w.countrycode : ""
    this.mobile = w && w.mobile ? w.mobile : ""
    this.email = w && w.email ? w.email : ""
    this.walletBalance = w && w.walletBalance ? +w.walletBalance : 0
    this.amount = w && w.amount ? +w.amount : 0
    this.requestedon =
      w && w.requestedon ? +w.requestedon : new Date().getTime()
    this.servedon = w && w.servedon ? +w.servedon : 0
    this.description = w && w.description ? w.description : "Withdrawal"
  }

  /**
   * @param { User | Withdrawal } w
   */
  set(w) {
    this.docref =
      w && w.docref && w.docref.id ? { id: w.docref.id } : this.docref
    this.appname = w && w.appname ? w.appname : this.appname
    this.subscriberdocid =
      w && w.subscriberdocid ? w.subscriberdocid : this.subscriberdocid
    this.docid = w && w.docid ? w.docid : this.docid
    this.name = w && w.name ? w.name : this.name
    this.countrycode = w && w.countrycode ? w.countrycode : this.countrycode
    this.mobile = w && w.mobile ? w.mobile : this.mobile
    this.email = w && w.email ? w.email : this.email
    this.walletBalance =
      w && w.walletBalance ? +w.walletBalance : this.walletBalance
    this.amount = w && w.amount ? +w.amount : this.amount
    this.requestedon = w && w.requestedon ? +w.requestedon : this.requestedon
    this.servedon = w && w.servedon ? +w.servedon : this.servedon
    this.description = w && w.description ? w.description : this.description
  }

  json = () => {
    const {
      docref,
      appname,
      subscriberdocid,
      docid,
      name,
      countrycode,
      mobile,
      email,
      walletBalance,
      amount,
      requestedon,
      description,
      servedon,
    } = this
    return {
      docref,
      appname,
      subscriberdocid,
      docid,
      name,
      countrycode,
      mobile,
      email,
      walletBalance,
      amount,
      requestedon,
      description,
      servedon,
    }
  }
}
