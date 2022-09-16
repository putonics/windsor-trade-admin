import BankAccount from "./BankAccount"
import Income from "./Income"
import Package from "./Package"
import Subordinate from "./Subordinate"

export const ADMINDOCID = "WCWC000001"
export const APPNAME = "windsortrade"
export const SUBSCRIBERDOCID = "WINDSOR-TRADE-MLM"

export default class User {
  appname = APPNAME
  subscriberdocid = SUBSCRIBERDOCID
  createdon = 0
  modifiedon = 0
  ///////////////////////
  refdocid = ""
  docid = "" //WC{name[0:1]}000001
  active = false
  name = ""
  countrycode = ""
  mobile = "" //with country code
  email = "" //validity checking with OTP
  password = ""
  idproof = { name: "", number: "", issuingAuthority: "" }
  /////////////////////////////////////////////////////////////////////
  bankAccount = new BankAccount()
  /////////////////////////////////////////////////////////////////////
  cryptoWalletAddress = ""
  /////////////////////////////////////////////////////////////////////
  /**
   * @type {Array<Subordinate>}
   */
  groupA = []
  /**
   * @type {Array<Subordinate>}
   */
  groupB = []
  /**
   * @type {Array<Package>}
   */
  packages = []
  totalWithdrawal = 0
  /**
   * @type {Array<{ amount: number; timestamp: number }>}
   */
  withdrawals = []
  /**
   * @type {Income}
   */
  income
  /////////////////////////////--ADMIN PROPERTIES--//////////////////////////
  totalTurnover = 0
  /**
   * @type {Array<{ amount: number, month: number, year: number }>}
   */
  monthlyTurnover = []
  /**
   * @type {"SELF" | "ADMIN"}
   */
  loginBy = "ADMIN"

  constructor(user = null) {
    this.createdon = user && user.createdon ? user.createdon : 0
    this.modifiedon = user && user.modifiedon ? user.modifiedon : 0
    //////////////////////////////////////////////////////////////
    this.refdocid = user && user.refdocid ? user.refdocid.toUpperCase() : ""
    this.docid = user && user.docid ? user.docid.toUpperCase() : ""
    this.active = user && user.active ? user.active : false
    this.name = user && user.name ? user.name.toUpperCase() : ""
    this.countrycode = user && user.countrycode ? user.countrycode : ""
    this.mobile = user && user.mobile ? user.mobile : ""
    this.email = user && user.email ? user.email : ""
    this.password = user && user.password ? user.password : ""
    this.idproof =
      user && user.idproof
        ? user.idproof
        : { name: "", number: "", issuingAuthority: "" }
    //////////////////////////////////////////////////////////////
    this.bankAccount =
      user && user.bankAccount ? new BankAccount(user.bankAccount) : null
    //////////////////////////////////////////////////////////////
    this.cryptoWalletAddress =
      user && user.cryptoWalletAddress ? user.cryptoWalletAddress : ""
    //////////////////////////////////////////////////////////////
    this.groupA =
      user && user.groupA ? user.groupA.map((a) => new Subordinate(a)) : []
    this.groupB =
      user && user.groupB ? user.groupB.map((b) => new Subordinate(b)) : []
    this.packages =
      user && user.packages ? user.packages.map((p) => new Package(p)) : []
    this.totalWithdrawal =
      user && user.totalWithdrawal ? user.totalWithdrawal : 0
    this.withdrawals = user && user.withdrawals ? user.withdrawals : []
    this.income = user && user.income ? new Income(user.income) : new Income()
    //////////////////////////////////////////////////////////////
    this.totalTurnover = user && user.totalTurnover ? user.totalTurnover : 0
    this.monthlyTurnover =
      user && user.monthlyTurnover ? user.monthlyTurnover : []
  }

  json() {
    const {
      appname,
      subscriberdocid,
      createdon,
      modifiedon,
      refdocid,
      docid,
      active,
      name,
      countrycode,
      mobile,
      email,
      password,
      idproof,
      totalWithdrawal,
      withdrawals,
      cryptoWalletAddress,
      loginBy,
    } = this
    const groupA = this.groupA.map((a) => a.json())
    const groupB = this.groupB.map((b) => b.json())
    const packages = this.packages.map((p) => p.json())
    const totalTurnover =
      this.docid === ADMINDOCID ? this.totalTurnover : undefined
    const monthlyTurnover =
      this.docid === ADMINDOCID ? this.monthlyTurnover : undefined
    const income = this.income.json()
    const bankAccount = this.bankAccount ? this.bankAccount.json() : null
    return {
      appname,
      subscriberdocid,
      createdon,
      modifiedon,
      refdocid,
      docid,
      active,
      name,
      countrycode,
      mobile,
      email,
      password,
      idproof,
      groupA,
      groupB,
      packages,
      totalWithdrawal,
      withdrawals,
      cryptoWalletAddress,
      totalTurnover,
      monthlyTurnover,
      income,
      bankAccount,
      loginBy,
    }
  }
}
