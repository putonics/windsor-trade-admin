import React from 'react'
import { useSnackbar } from './Snackbar'

const SnackbarDialog = props => {
    const snackbar = useSnackbar()
    React.useEffect(() => {
        if (snackbar.open) {
            setTimeout(snackbar.close, 2000)
        }
    }, [snackbar])

    return (
        snackbar.msg && snackbar.open
            ?
            <div className='fixed left-0 right-0 bottom-0 z-50 flex justify-center items-center h-fit'
                onMouseOver={snackbar.close}
            >
                {
                    snackbar.type === 'SUCCESS' ?
                        <div className='my-2 transition-opacity drop-shadow-xl rounded overflow-clip p-4 text-white bg-green-700'>
                            {snackbar.msg}
                        </div>
                        : snackbar.type === 'ERROR' ?
                            <div className='my-2 transition-opacity drop-shadow-xl rounded overflow-clip p-4 text-white bg-red-700'>
                                {snackbar.msg}
                            </div>
                            :
                            <div className='my-2 transition-opacity drop-shadow-xl rounded overflow-clip p-4 text-white bg-blue-700'>
                                {snackbar.msg}
                            </div>
                }
            </div>
            : <></>
    )
}

export default SnackbarDialog