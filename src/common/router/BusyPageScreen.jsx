import React from 'react'
import { useBusyPage } from './BusyPage'

const BusyPageScreen = props => {
    const busyPage = useBusyPage()
    return (
        busyPage.open
            ?
            <div className='fixed top-0 left-0 right-0 bottom-0 z-50 bg-black/40 flex justify-center items-center'>
                <img className="start-loader-img" src="https://windsortrad.com/logo192.png" />
            </div>
            :
            <></>
    )
}

export default BusyPageScreen