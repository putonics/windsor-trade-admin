import React from "react"
import { ControlerContext } from "./MainFrame"

export default class OTPConfirm {
    description = null
    otpLabel = null
    error = null
    /**
     * @private
     */
    otp = null
    /**
     * @private
     */
    onYes = null
    /**
     * @private
     */
    onNo = null
    /**
     * @private 
     */
    dispatch
    bindDispatch = (dispatch) => (this.dispatch = dispatch)
    /**
     * @private 
     */
    dispatchOTPConfirm = () => this.dispatch({ type: 'dispatchOTPConfirm', payload: this })

    constructor(c = null) {
        this.description = c && c.description ? c.description : null
        this.otpLabel = c && c.otpLabel ? c.otpLabel : null
        this.error = c && c.error ? c.error : null
        this.otp = c && c.otp ? c.otp : null
        this.onYes = c && c.onYes ? c.onYes : null
        this.onNo = c && c.onNo ? c.onNo : null
        this.dispatch = c && c.dispatch ? c.dispatch : null
    }

    open = (otp, otpLabel, description, onYes = () => { }, onNo = () => { }) => {
        this.otp = otp
        this.otpLabel = otpLabel
        this.description = description
        this.onYes = onYes
        this.onNo = onNo
        this.dispatchOTPConfirm()
    }

    yesConfirm = (otp) => {
        if (otp && this.otp === otp) {
            const onYes = this.onYes
            this.description = null
            this.onYes = null
            this.onNo = null
            this.error = null
            this.dispatchOTPConfirm()
            onYes()
        } else {
            this.error = 'Error! Not matched.'
            this.dispatchOTPConfirm()
        }
    }

    noConfirm = () => {
        const onNo = this.onNo
        this.description = null
        this.onYes = null
        this.onNo = null
        this.error = null
        this.dispatchOTPConfirm()
        onNo()
    }
}

/**
 * @returns {OTPConfirm}
 */
export const useOTPConfirm = () => {
    const controllerContext = React.useContext(ControlerContext)
    const otpConfirm = controllerContext.state.otpConfirm
    otpConfirm.bindDispatch(controllerContext.dispatch)
    return otpConfirm
}