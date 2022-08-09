import { api } from "../redux/classes/CryptoServer"
import User from "../redux/classes/User"
export const SECRET = 'n4F1~Z!09<tb/}u=8M\'D"txL)w(-r#7$|pA+V{HC@q*5K^eo6Sv%3Jb\\G,5.y+'//set you SECRET here
/**
 * @param {string} userid 
 * @param {string} password 
 * @returns {Object}
 */
export const tryLogin = async (docid, password) => {
    //WRITE YOUR LOGIN CODE HERE. it must returns user info after login completed successfully
    const user = new User({ docid, password })
    return await api('/admin/signin', user.json())
}

export const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
/**
 * @param {number|Date} date 
 * @returns {string}
 */
export const readableDateTimeLong = (date) => {
    if (date) {
        const dt = new Date(date)
        return `${dt.getDate()} ${MONTHS[dt.getMonth()]} ${dt.getFullYear()} ${dt.toTimeString().substring(0, 5)} UTC`
    }
    return ''
}
/**
 * @param {number|Date} date 
 * @returns {string}
 */
export const readableDateLong = (date) => {
    if (date) {
        const dt = new Date(date)
        return `${dt.getDate()} ${MONTHS[dt.getMonth()]} ${dt.getFullYear()}`
    }
    return ''
}
/**
 * @param {number|Date} date 
 * @returns {string}
 */
export const readableDateUnderscore = (date) => {
    if (date) {
        const dt = new Date(date)
        return `${dt.getDate()}-${dt.getMonth() + 1}-${dt.getFullYear()}`
    }
    return ''
}
/**
 * @param {number|Date} date 
 * @returns {string}
 */
export const readableDateSlash = (date) => {
    if (date) {
        const dt = new Date(date)
        return `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`
    }
    return ''
}