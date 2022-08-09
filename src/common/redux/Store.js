import { createStore } from "redux"
import Login from '../router/Login'
import Users from "./classes/Users"
import Withdrawals from "./classes/Withdrawals"
import PackageRequests from "./classes/PackageRequests"

const initstate = {
    login: new Login(),
    users: new Users(),
    withdrawals: new Withdrawals(),
    packageRequests: new PackageRequests(),
}

export const Store = createStore((state = initstate, action) => {
    switch (action.type) {
        case 'dispatchLogin':
            return { ...state, login: action.payload }
        case 'dispatchUsers':
            return { ...state, users: action.payload }
        case 'dispatchWithdrawals':
            return { ...state, withdrawals: action.payload }
        case 'dispatchPackageRequests':
            return { ...state, packageRequests: action.payload }
        default:
            return state
    }
})