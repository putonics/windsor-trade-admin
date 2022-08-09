import React from 'react'
import TableSkeleton from '../../common/components/TableSkeleton'
import User from '../../common/redux/classes/User'
import { usePackageRequests } from '../../common/redux/classes/PackageRequests'
import { useLogin } from '../../common/router/Login'
import PackageCard from './PackageCard'
import { useConfirm } from '../../common/router/Confirm'
import { useOTPConfirm } from '../../common/router/OTPConfirm'
import { useBusyPage } from '../../common/router/BusyPage'
import { useSnackbar } from '../../common/router/Snackbar'
import { sendOtp } from '../../common/redux/api/Email'

const PendingPackages = props => {
    const packageRequests = usePackageRequests()
    const login = useLogin()
    const [busy, setBusy] = React.useState(false)

    React.useEffect(() => {
        if (login.info && !packageRequests.list.length) {
            setBusy(true)
            packageRequests.load(new User(login.info)).finally(() => setBusy(false))
        }
    }, [login])

    const [sending, setSending] = React.useState(false)
    const confirm = useConfirm()
    const otpConfirm = useOTPConfirm()
    const busyPage = useBusyPage()
    React.useEffect(() => {
        busyPage.set(sending)
    }, [sending])

    const snackbar = useSnackbar()
    const send = async (w) => {
        if (await packageRequests.serve(w)) {
            snackbar.showSuccess('Package successfully added.')
        } else {
            snackbar.showError('Unable to approve this package! May be the balance is insufficient!')
        }
        setSending(false)
    }

    const submit = (w) => {
        setSending(true)
        confirm.open(
            <div className='p-2'>
                <div className='text-orange-600 text-center animate-pulse duration-75'>
                    <span className='font-extrabold'>Warning!&nbsp;</span>
                    Once you add this package, this cannot be revert back.
                </div>
                <div className='text-slate-900 text-xl text-center font-extrabold'>Are you sure?</div>
            </div>,
            async () => {
                const res = await sendOtp(login.info)
                if (res) {
                    otpConfirm.open(
                        res.otp,
                        'Please verify the OTP',
                        <div className='p-2'>
                            <div className='text-blue-800 text-center'>
                                An OTP with request-id <span className='text-orange-600 font-extrabold'>{res.requestid}</span> has been sent to {res.email}.
                            </div>
                        </div>,
                        () => {
                            send(w)
                        }, () => {
                            setSending(false)
                        }
                    )
                } else {

                }
            },
            () => {
                setSending(false)
            },
        )
    }

    return (
        busy
            ? <TableSkeleton rows={4} cols={3} />
            : !packageRequests.list.length
                ? <div className='text-slate-400 text-2xl font-extrabold'>No pending package request</div>
                : packageRequests.list.map((pr, i) =>
                    <PackageCard
                        pr={pr}
                        key={i}
                        onSubmit={() => submit(pr)}
                    />
                )
    )
}

export default PendingPackages