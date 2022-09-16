import { useSelector, useDispatch } from "react-redux"
import { api } from "./CryptoServer"
import Package from "./Package"
import User from "./User"
/////////////////////////////////////////////////////////
export const APPNAME = "windsortrade"
export const SUBSCRIBERDOCID = "WINDSOR-TRADE-MLM"
////////////////////////////////////////////////////////
export default class Users {
  /**
   * @type {Array<User>}
   */
  list

  dispatch
  bindRedux = (dispatch) => (this.dispatch = dispatch)
  dispatchUsers = () =>
    this.dispatch({ type: "dispatchUsers", payload: new Users(this) })

  constructor(users = null) {
    this.list = users && users.list ? users.list.map((u) => new User(u)) : []
    this.dispatch = users && users.dispatch ? users.dispatch : null
  }

  json = () => this.list.map((u) => u.json())

  /**
   * @param {User} user
   */
  loadNewUsers = async (user) => {
    const users = await api("/user/new", new User(user).json())
    this.list = users.map((u) => new User(u))
    this.dispatchUsers()
  }

  /**
   * @param {User} user
   */
  loadInactiveUsers = async (user) => {
    const users = await api("/user/inactive", new User(user).json())
    this.list = users.map((u) => new User(u))
    this.dispatchUsers()
  }

  /**
   * @param {User} user
   * @param {number} amount
   */
  send = async (user, amount, onSuccess = () => {}, onError = () => {}) => {
    user.packages.push(new Package({ amount, index: user.packages.length }))
    // console.log(user.json())
    const receivedUser = new User(await api("/admin/package", user.json()))
    if (receivedUser.active) {
      this.list = this.list.filter((u) => u.docid !== receivedUser.docid)
      this.dispatchUsers()
      onSuccess()
    } else {
      onError()
    }
  }

  /**
   * @param {User} user
   */
  block = async (user, onSuccess = () => {}, onError = () => {}) => {
    if (!user.active) return
    user.active = false
    const receivedUser = new User(await api("/user/block", user.json()))
    if (!receivedUser.active) {
      this.list = this.list.filter((u) => u.docid !== receivedUser.docid)
      this.dispatchUsers()
      onSuccess()
    } else {
      onError()
    }
  }

  /**
   * @param {User} user
   */
  unblock = async (user, onSuccess = () => {}, onError = () => {}) => {
    if (user.active) return
    user.active = true
    const receivedUser = new User(await api("/user/unblock", user.json()))
    if (receivedUser.active) {
      this.list = this.list.filter((u) => u.docid !== receivedUser.docid)
      this.dispatchUsers()
      onSuccess()
    } else {
      onError()
    }
  }
}

/**
 * @returns {Users}
 */
export const useUsers = () => {
  let users = useSelector((state) => state.users)
  if (!users) users = new Users()
  users.bindRedux(useDispatch())
  return users
}
