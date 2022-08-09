import React from "react"
import { ControlerContext } from "./MainFrame"

export default class BusyPage {
    open = false

    dispatch
    bindDispatch = (dispatch) => (this.dispatch = dispatch)
    /**
     * @private 
     */
    dispatchBusyPage = () => this.dispatch({ type: 'dispatchBusyPage', payload: this })

    constructor(busyPage = null) {
        this.open = busyPage && busyPage.open ? busyPage.open : false
        this.dispatch = busyPage && busyPage.dispatch ? busyPage.dispatch : null
    }

    set = (open = false) => {
        this.open = open
        this.dispatchBusyPage()
    }
}

/**
 * @returns {BusyPage}
 */
export const useBusyPage = () => {
    const controllerContext = React.useContext(ControlerContext)
    const busyPage = controllerContext.state.busyPage
    busyPage.bindDispatch(controllerContext.dispatch)
    return busyPage
}