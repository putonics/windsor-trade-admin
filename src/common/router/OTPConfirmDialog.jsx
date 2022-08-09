import React from 'react'
import Button from '../components/Button'
import Form from '../components/Form'
import TextBox from '../components/TextBox'
import { useOTPConfirm } from './OTPConfirm'

const OTPConfirmDialog = props => {
    const confirm = useOTPConfirm()
    const [text, setText] = React.useState('')

    return (
        confirm.description
            ?
            <div className='fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur bg-slate-900/60 flex justify-center items-center'>
                <div className='transition-opacity drop-shadow-xl rounded bg-slate-50 overflow-clip p-4'>
                    <div className='flex flex-col justify-center items-center'>
                        <div className='text-blue-800 text-lg mb-4'>{confirm.description}</div>
                        <Form onSubmit={() => confirm.yesConfirm(text)}>
                            <TextBox type='text' value={text} onChange={setText} label={confirm.otpLabel} />
                            {confirm.error ? <div className='py-2 mb-2 text-sm text-red-700 font-extrabold text-center'>{confirm.error}</div> : <></>}
                            <div className='flex justify-around gap-10'>
                                <Button
                                    type='reset'
                                    onClick={confirm.noConfirm}
                                    color='red'>Cancel</Button>
                                <Button
                                    type='submit'
                                    color='blue'>Verify</Button>
                            </div>
                        </Form>
                    </div >
                </div>
            </div>
            : <></>
    )
}

export default OTPConfirmDialog