import React from "react"
import { ControlerContext } from "./MainFrame"

export default class Modal {
    /**
     * @type {JSX.Element}
     */
    component
    open = false
    callBack = () => { }
    /**
     * @private 
     */
    dispatch
    bindDispatch = (dispatch) => (this.dispatch = dispatch)
    /**
     * @private 
     */
    dispatchModal = () => this.dispatch({ type: 'dispatchModal', payload: this })

    /**
     * @param {Modal} modal 
     */
    constructor(modal) {
        this.component = modal && modal.component ? modal.component : <></>
        this.open = modal && modal.open ? modal.open : false
        this.callBack = modal && modal.callBack ? modal.callBack : () => { }
        this.dispatch = modal && modal.dispatch ? modal.dispatch : null
    }

    /**
     * @param {JSX.Element} component 
     */
    setComponent = (component) => {
        this.component = component
        this.dispatchModal()
    }

    setOpen = (callBack = () => { }) => {
        this.open = true
        this.callBack = callBack
        this.dispatchModal()
    }

    setClose = () => {
        this.open = false
        this.callBack = () => { }
        this.dispatchModal()
    }
}

/**
 * @returns {Modal}
 */
export const useModal = () => {
    const controllerContext = React.useContext(ControlerContext)
    const modal = controllerContext.state.modal
    modal.bindDispatch(controllerContext.dispatch)
    return modal
}