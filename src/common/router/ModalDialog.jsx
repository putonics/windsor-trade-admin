import React from 'react'
import { useModal } from './Modal'

const ModalDialog = props => {
    const modal = useModal()
    return (
        modal.component && modal.open
            ?
            <div className='fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur bg-slate-900/60 flex justify-center items-center'>
                <div className='transition-opacity drop-shadow-xl rounded bg-slate-50 overflow-clip p-4'>
                    {modal.component}
                </div>
            </div>
            : <></>
    )
}

export default ModalDialog