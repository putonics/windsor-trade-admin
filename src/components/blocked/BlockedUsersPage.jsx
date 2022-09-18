import React from "react"
import TableSkeleton from "../../common/components/TableSkeleton"
import { sendOtp } from "../../common/redux/api/Email"
import { useUsers } from "../../common/redux/classes/Users"
import { useBusyPage } from "../../common/router/BusyPage"
import { useConfirm } from "../../common/router/Confirm"
import { useLogin } from "../../common/router/Login"
import { useOTPConfirm } from "../../common/router/OTPConfirm"
import { useSnackbar } from "../../common/router/Snackbar"
import UserCard from "./UserCard"

const BlockedUsersPage = (props) => {
  const login = useLogin()
  const users = useUsers()
  const [busy, setBusy] = React.useState(false)
  const snackbar = useSnackbar()

  React.useEffect(() => {
    if (!users.list.length || users.list[0].active) {
      snackbar.showInfo("Loading...")
      setBusy(true)
      users.loadInactiveUsers(login.info).finally(() => setBusy(false))
    } else {
      snackbar.showInfo(users.list.length + " blocked users.")
    }
  }, [users])

  const [sending, setSending] = React.useState(false)
  const send = (user, amount) => {
    if (sending) return
    users.send(
      user,
      amount,
      () => {
        setSending(false)
        snackbar.showSuccess("Successfully alotted. Please check email.")
      },
      () => {
        setSending(false)
        snackbar.showError("Unable to alot. Please try again.")
      }
    )
  }

  const confirm = useConfirm()
  const otpConfirm = useOTPConfirm()
  const busyPage = useBusyPage()
  React.useEffect(() => {
    busyPage.set(sending)
  }, [sending])

  return (
    <div>
      {busy ? (
        <TableSkeleton rows={4} cols={3} />
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-2">
          {!users.list.length ? (
            <div className="text-slate-400 text-2xl font-extrabold">
              No new registration
            </div>
          ) : (
            users.list.map((u) => (
              <UserCard
                user={u}
                key={u.docid}
                busy={sending}
                onUnblock={() =>
                  confirm.open(
                    <div className="p-2 text-slate-900 text-xl text-center font-extrabold">
                      Are you sure?
                    </div>,
                    () =>
                      users.unblock(
                        u,
                        () => snackbar.showSuccess("Successfully Unblocked"),
                        () => snackbar.showError("Unable to unblock")
                      ),
                    () => {}
                  )
                }
                onSend={(amount) => {
                  setSending(true)
                  confirm.open(
                    <div className="p-2">
                      <div className="text-orange-600 text-center animate-pulse duration-75">
                        <span className="font-extrabold">Warning!</span> Once
                        applied the process cannot be revert back.
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
                            send(u, amount)
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
                }}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default BlockedUsersPage
