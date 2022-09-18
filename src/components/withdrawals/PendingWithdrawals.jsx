import { clear } from "@testing-library/user-event/dist/clear"
import React from "react"
import TableSkeleton from "../../common/components/TableSkeleton"
import { sendOtp } from "../../common/redux/api/Email"
import User from "../../common/redux/classes/User"
import { useWithdrawals } from "../../common/redux/classes/Withdrawals"
import { useBusyPage } from "../../common/router/BusyPage"
import { useConfirm } from "../../common/router/Confirm"
import { useLogin } from "../../common/router/Login"
import { useOTPConfirm } from "../../common/router/OTPConfirm"
import { useSnackbar } from "../../common/router/Snackbar"
import WithdrawalCard from "./WithdrawalCard"

const PendingWithdrawals = (props) => {
  const withdrawals = useWithdrawals()
  const login = useLogin()
  const [busy, setBusy] = React.useState(false)

  React.useEffect(() => {
    if (login.info && !withdrawals.list.length) {
      setBusy(true)
      withdrawals.load(new User(login.info)).finally(() => setBusy(false))
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
    if (await withdrawals.serve(w)) {
      snackbar.showSuccess("Successfully withdrawan.")
    } else {
      snackbar.showError(
        "Unable to approve this withdrawal! May be the balance is insufficient!"
      )
    }
    setSending(false)
  }

  const _clear = async (w) => {
    if (await withdrawals.clear(w)) {
      snackbar.showSuccess("Message cleared successfully")
    } else {
      snackbar.showError("Unable to clear message!")
    }
    setSending(false)
  }

  const submit = (w) => {
    setSending(true)
    confirm.open(
      <div className="p-2">
        <div className="text-orange-600 text-center animate-pulse duration-75">
          <span className="font-extrabold">Warning!&nbsp;</span>
          Once you approve this withdrawal, this cannot be revert back.
        </div>
        <div className="text-slate-900 text-xl text-center font-extrabold">
          Are you sure?
        </div>
      </div>,
      async () => {
        const res = await sendOtp(login.info)
        if (res) {
          otpConfirm.open(
            res.otp,
            "Please verify the OTP",
            <div className="p-2">
              <div className="text-blue-800 text-center">
                An OTP with request-id{" "}
                <span className="text-orange-600 font-extrabold">
                  {res.requestid}
                </span>{" "}
                has been sent to {res.email}.
              </div>
            </div>,
            () => {
              send(w)
            },
            () => {
              setSending(false)
            }
          )
        } else {
        }
      },
      () => {
        setSending(false)
      }
    )
  }

  const clear = (w) => {
    setSending(true)
    confirm.open(
      <div className="p-2">
        <div className="text-orange-600 text-center animate-pulse duration-75">
          <span className="font-extrabold">Warning!&nbsp;</span>
          This message will be removed permanently.
        </div>
        <div className="text-slate-900 text-xl text-center font-extrabold">
          Are you sure?
        </div>
      </div>,
      async () => await _clear(w),
      () => {
        setSending(false)
      }
    )
  }

  return busy ? (
    <TableSkeleton rows={4} cols={3} />
  ) : !withdrawals.list.length ? (
    <div className="text-slate-400 text-2xl font-extrabold">
      No pending withdrawal request
    </div>
  ) : (
    withdrawals.list.map((w, i) => (
      <WithdrawalCard
        withdrawal={w}
        key={i}
        onSubmit={() => submit(w)}
        onClear={() => clear(w)}
      />
    ))
  )
}

export default PendingWithdrawals
