import React from 'react'
import Confirm from './Confirm'
import Modal from './Modal'
import Snackbar from './Snackbar'
import SideNav from './SideNav'
import TopNav from './TopNav'
import ConfirmDialog from './ConfirmDialog'
import ModalDialog from './ModalDialog'
import SnackbarDialog from './SnackbarDialog'
import OTPConfirm from './OTPConfirm'
import OTPConfirmDialog from './OTPConfirmDialog'
import BusyPage from './BusyPage'
import BusyPageScreen from './BusyPageScreen'

const initialState = {
    busyPage: new BusyPage(),
    confirm: new Confirm(),
    otpConfirm: new OTPConfirm(),
    snackbar: new Snackbar(),
    modal: new Modal(),
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'dispatchBusyPage':
            return { ...state, busyPage: action.payload }
        case 'dispatchConfirm':
            return { ...state, confirm: action.payload }
        case 'dispatchOTPConfirm':
            return { ...state, otpConfirm: action.payload }
        case 'dispatchSnackbar':
            return { ...state, snackbar: action.payload }
        case 'dispatchModal':
            return { ...state, modal: action.payload }
        default:
            return state
    }
}

export const ControlerContext = React.createContext({ state: initialState, dispatch: () => { } })

const MainFrame = props => {

    const [openSideNav, setOpenSideNav] = React.useState(false)

    const [state, dispatch] = React.useReducer(reducer, initialState)

    return (
        <ControlerContext.Provider value={{ state: state, dispatch: dispatch }}>
            <div className='relative'>
                <div className='grid md:grid-cols-5 sm:grid-cols-1'>
                    <SideNav open={openSideNav} onClick={() => setOpenSideNav(false)} />
                    <div className='md:col-span-4 md:h-screen bg-neutral-300 flex flex-col'>
                        <TopNav open={openSideNav} onClick={() => setOpenSideNav(!openSideNav)} />
                        <div className='md:overflow-y-scroll flex-1 p-6' onClick={e => e.stopPropagation()}>
                            {props.children}
                        </div>
                    </div>
                </div>
                <ModalDialog />
                <BusyPageScreen />
                <SnackbarDialog />
                <ConfirmDialog />
                <OTPConfirmDialog />
            </div>
        </ControlerContext.Provider>
    )
}

export default MainFrame
