import { useSelector, useDispatch } from 'react-redux'
import { api } from './CryptoServer'
import Package from './Package'
import Withdrawal from './Withdrawal'
/////////////////////////////////////////////////////////
export const APPNAME = 'windsortrade'
export const SUBSCRIBERDOCID = 'WINDSOR-TRADE-MLM'
////////////////////////////////////////////////////////
export default class Withdrawals {

    /**
     * @type {Array<Withdrawal>}
     */
    list

    dispatch
    bindRedux = (dispatch) => (this.dispatch = dispatch)
    dispatchWithdrawals = () =>
        this.dispatch({ type: 'dispatchWithdrawals', payload: new Withdrawals(this) })

    constructor(withdrawals = null) {
        this.list = withdrawals && withdrawals.list ? withdrawals.list.map(u => new Withdrawal(u)) : []
        this.dispatch = withdrawals && withdrawals.dispatch ? withdrawals.dispatch : null
    }

    json = () => this.list.map(u => u.json())

    /**
     * @param {Withdrawal} user 
     */
    load = async (user) => {
        const withdrawals = await api('/admin/withdrawal-list', new Withdrawal(user).json())
        this.list = withdrawals.map(w => new Withdrawal(w))
        this.dispatchWithdrawals()
    }

    /**
     * @param {Withdrawal} withdrawal 
     */
    serve = async (withdrawal) => {
        const w = await api('/admin/withdraw-serve', withdrawal.json())
        if (w && w.servedon && withdrawal.docid === w.docid) {
            this.list = this.list.filter(w2 => !(
                w2.docid === w.docid
                && w2.requestedon === w.requestedon
                && w2.amount === w.amount
            ))
            this.dispatchWithdrawals()
            return true
        }
        return false
    }
}

/**
 * @returns {Withdrawals}
 */
export const useWithdrawals = () => {
    let withdrawals = useSelector((state) => state.withdrawals)
    if (!withdrawals) withdrawals = new Withdrawals()
    withdrawals.bindRedux(useDispatch())
    return withdrawals
}