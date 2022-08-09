import React from "react"
import { ControlerContext } from "./MainFrame"

export default class Confirm {
    component = null
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
    dispatchConfirm = () => this.dispatch({ type: 'dispatchConfirm', payload: this })

    constructor(c = null) {
        this.component = c && c.component ? c.component : null
        this.onYes = c && c.onYes ? c.onYes : null
        this.onNo = c && c.onNo ? c.onNo : null
        this.dispatch = c && c.dispatch ? c.dispatch : null
    }

    open = (component, onYes = () => { }, onNo = () => { }) => {
        this.component = component
        this.onYes = onYes
        this.onNo = onNo
        this.dispatchConfirm()
    }

    yesConfirm = () => {
        const onYes = this.onYes
        this.component = null
        this.onYes = null
        this.onNo = null
        this.dispatchConfirm()
        onYes()
    }

    noConfirm = () => {
        const onNo = this.onNo
        this.component = null
        this.onYes = null
        this.onNo = null
        this.dispatchConfirm()
        onNo()
    }
}

/**
 * @returns {Confirm}
 */
export const useConfirm = () => {
    const controllerContext = React.useContext(ControlerContext)
    const confirm = controllerContext.state.confirm
    confirm.bindDispatch(controllerContext.dispatch)
    return confirm
}