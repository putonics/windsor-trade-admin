import { useSelector, useDispatch } from "react-redux"
import { api } from "./CryptoServer"
import PackageRequest from "./PackageRequest"
import User from "./User"
/////////////////////////////////////////////////////////
export const APPNAME = "windsortrade"
export const SUBSCRIBERDOCID = "WINDSOR-TRADE-MLM"
////////////////////////////////////////////////////////
export default class PackageRequests {
  /**
   * @type {Array<PackageRequest>}
   */
  list

  dispatch
  bindRedux = (dispatch) => (this.dispatch = dispatch)
  dispatchPackageRequests = () =>
    this.dispatch({
      type: "dispatchPackageRequests",
      payload: new PackageRequests(this),
    })

  constructor(packageRequests = null) {
    this.list =
      packageRequests && packageRequests.list
        ? packageRequests.list.map((u) => new PackageRequest(u))
        : []
    this.dispatch =
      packageRequests && packageRequests.dispatch
        ? packageRequests.dispatch
        : null
  }

  json = () => this.list.map((u) => u.json())

  /**
   * @param {User} user
   */
  load = async (user) => {
    const packageRequests = await api(
      "/admin/package-list",
      new User(user).json()
    )
    this.list = packageRequests.map((p) => new PackageRequest(p))
    this.dispatchPackageRequests()
  }

  /**
   * @param {PackageRequest} pr
   */
  serve = async (pr) => {
    const p = await api("/admin/package-serve", pr.json())
    if (p && p.servedon && pr.docid === p.docid) {
      this.list = this.list.filter(
        (p2) =>
          !(
            p2.docid === p.docid &&
            p2.requestedon === p.requestedon &&
            p2.amount === p.amount
          )
      )
      this.dispatchPackageRequests()
      return true
    }
    return false
  }

  /**
   * @param {PackageRequest} pr
   */
  clear = async (pr) => {
    const p = await api("/admin/package-clear", pr.json())
    if (p && pr.docid === p.docid) {
      this.list = this.list.filter(
        (p2) =>
          !(
            p2.docid === p.docid &&
            p2.requestedon === p.requestedon &&
            p2.amount === p.amount
          )
      )
      this.dispatchPackageRequests()
      return true
    }
    return false
  }
}

/**
 * @returns {PackageRequests}
 */
export const usePackageRequests = () => {
  let packageRequests = useSelector((state) => state.packageRequests)
  if (!packageRequests) packageRequests = new PackageRequests()
  packageRequests.bindRedux(useDispatch())
  return packageRequests
}
