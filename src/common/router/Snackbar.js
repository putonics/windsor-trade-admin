import React from 'react'
import { ControlerContext } from './MainFrame'
export default class Snackbar {
    open = false
    /**
     * @type{'SUCCESS'|'ERROR'|'INFO'}
     */
    type
    msg = ''
    /**
     * @private 
     */
    dispatch
    bindDispatch = (dispatch) => (this.dispatch = dispatch)
    /**
     * @private 
     */
    dispatchSnackbar = () => this.dispatch({ type: 'dispatchSnackbar', payload: this })


    /**
     * @param {Snackbar} snackbar 
     */
    constructor(snackbar) {
        this.open = snackbar && snackbar.open ? snackbar.open : false
        this.type = snackbar && snackbar.type ? snackbar.type : 'INFO'
        this.msg = snackbar && snackbar.msg ? snackbar.msg : ''
        this.dispatch = snackbar && snackbar.dispatch ? snackbar.dispatch : null
    }

    showSuccess = (msg = '') => {
        this.open = true
        this.type = 'SUCCESS'
        this.msg = msg
        this.dispatchSnackbar()
    }

    showError = (msg = '') => {
        this.open = true
        this.type = 'ERROR'
        this.msg = msg
        this.dispatchSnackbar()
    }

    showInfo = (msg = '') => {
        this.open = true
        this.type = 'INFO'
        this.msg = msg
        this.dispatchSnackbar()
    }

    close = () => {
        this.open = false
        this.msg = ''
        this.dispatchSnackbar()
    }
}

/**
 * @returns {Snackbar}
 */
export const useSnackbar = () => {
    const controllerContext = React.useContext(ControlerContext)
    const snackbar = controllerContext.state.snackbar
    snackbar.bindDispatch(controllerContext.dispatch)
    return snackbar
}