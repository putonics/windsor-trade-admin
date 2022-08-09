import React from 'react'
import Button from '../components/Button'
import { useConfirm } from './Confirm'

const ConfirmDialog = props => {
    const confirm = useConfirm()
    return (
        confirm.component
            ?
            <div className='fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur bg-slate-900/60 flex justify-center items-center'>
                <div className='transition-opacity drop-shadow-xl rounded bg-slate-50 overflow-clip p-4'>
                    <div className='flex flex-col justify-center items-center'>
                        <div className='text-blue-800 text-lg mb-4'>{confirm.component}</div>
                        <div className='flex justify-around gap-10'>
                            <Button
                                onClick={confirm.noConfirm}
                                color='red'>Don't do that</Button>
                            <Button
                                onClick={confirm.yesConfirm}
                                color='blue'>Yes proceed</Button>
                        </div>
                    </div >
                </div>
            </div>
            : <></>
    )
}

export default ConfirmDialog