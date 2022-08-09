import { useSelector, useDispatch } from 'react-redux'
import CryptoJS from 'crypto-js'
import { tryLogin, SECRET } from '../editables/services'
////////////////////////////////////////////////////////////////////////////////////
const encrypt = data => CryptoJS.AES.encrypt(JSON.stringify(data), SECRET).toString()
const decrypt = cipher => JSON.parse(CryptoJS.AES.decrypt(cipher, SECRET).toString(CryptoJS.enc.Utf8))
////////////////////////////////////////////////////////////////////////////////////
const setSession = (data) => {
    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1) //Validity: 1 day
    const accessToken = encrypt({ data, timestamp: tomorrow.getTime() })
    window.localStorage.setItem('accessToken', accessToken)
}
const removeSession = () => window.localStorage.removeItem('accessToken')
const getSession = () => {
    const accessToken = window.localStorage.getItem('accessToken')
    try {
        if (accessToken) {
            const { data, timestamp } = decrypt(accessToken)
            if (timestamp > new Date().getTime()) {
                return data
            }
        }
    } catch (ex) {

    }
    removeSession()
    return null
}

export default class Login {
    /**
     * @private 
     */
    userid
    /**
     * @private 
     */
    password

    info //information fetched after login

    signinTried = 0

    /**
     * @private 
     */
    dispatch
    bindRedux = (dispatch) => (this.dispatch = dispatch)
    /**
     * @private 
     */
    dispatchLogin = () => this.dispatch({ type: 'dispatchLogin', payload: new Login(this) })
    /**
     * @private 
     */
    gotoSigninPage = () => {//hard reload
        const a = document.createElement("a")
        a.href = '/'
        a.click()
        document.body.removeChild(a)
    }

    /**
     * @param {Login} login 
     */
    constructor(login) {
        this.userid = login && login.userid ? login.userid : null
        this.password = login && login.password ? login.password : null
        this.info = login && login.info ? login.info : null
        this.signinTried = login && login.signinTried ? login.signinTried : 0
        this.dispatch = login && login.dispatch ? login.dispatch : null
    }

    signin = async (userid, password) => {
        try {
            const data = getSession()
            // alert(JSON.stringify(data))
            if (userid && password) {
                this.info = await tryLogin(userid, password)
                this.userid = userid
                this.password = password
                setSession({ userid: this.userid, password: this.password })
            } else if (data && data.userid && data.password) {
                this.info = await tryLogin(data.userid, data.password)
                this.userid = data.userid
                this.password = data.password
            } else {
                this.info = null
            }
        } catch (ex) {
            this.info = null
        }
        this.signinTried++
        this.dispatchLogin()
    }

    signout = () => {
        removeSession()
        this.info = null
        this.dispatchLogin()
        this.gotoSigninPage()
    }
}

/**
 * @returns {Login}
 */
export const useLogin = () => {
    let login = useSelector((state) => state.login)
    if (!login) login = new Login()
    login.bindRedux(useDispatch())
    return login
}