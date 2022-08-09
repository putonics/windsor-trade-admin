import React from 'react'
import Button from './Button'
import { useModal } from '../router/Modal'

/**
 * @param {{busy: boolean}} props 
 */
const ConfirmDialog = props => {
    const modal = useModal()
    const [busy, setBusy] = React.useState(props.busy || false)
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='text-blue-800 text-lg mb-4'>Ar you sure?</div>
            <div className='flex justify-around gap-2'>
                <Button disabled={busy} onClick={modal.setClose} color='red'>No</Button>
                <Button disabled={busy} onClick={modal.callBack} color='blue'>Yes</Button>
            </div>
        </div>
    )
}

export default ConfirmDialog