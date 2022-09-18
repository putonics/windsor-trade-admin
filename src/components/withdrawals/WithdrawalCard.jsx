import React from "react"
import Button from "../../common/components/Button"
import { readableDateTimeLong } from "../../common/editables/services"
import Withdrawal from "../../common/redux/classes/Withdrawal"
import style from "../../common/style"

/**
 * @param {{withdrawal: Withdrawal}} props
 */
const WithdrawalCard = (props) => {
  const { withdrawal } = props
  return (
    <div className={style("p-4 grid grid-cols-1 md:grid-cols-3 gap-2").card()}>
      <div>
        <div className="flex gap-2">
          <div className="text-slate-600">Requested withdrawal:</div>
          <div className="text-slate-900 font-extrabold">
            ${withdrawal.amount}
          </div>
        </div>
        <div className="text-slate-900 font-semibold italic">
          {readableDateTimeLong(withdrawal.requestedon)}
        </div>
        <div className="flex gap-2">
          <div className="text-slate-600">Wallet balance:</div>
          <div className="text-slate-900 font-extrabold">
            ${withdrawal.walletBalance}
            <span className="text-red-700 font-extrabold">*</span>
          </div>
        </div>
      </div>
      <div>
        <div className="text-slate-900 text-center font-semibold">
          {withdrawal.name}
        </div>
        <div className="text-slate-900 italic text-center font-semibold">
          {withdrawal.email}
        </div>
        <div className="text-slate-900 text-center font-semibold">
          +{withdrawal.countrycode}-{withdrawal.mobile}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="text-red-700 text-xs italic text-center">
          *Please complete this process before making actual payment to this
          person. If it is success then you can send money to this person. If it
          is failed, then don't give the money to this person.
        </div>
        <Button color="orange" onClick={props.onSubmit}>
          Send ${withdrawal.amount}
        </Button>
        <Button color="gray" className="text-sm" onClick={props.onClear}>
          Clear this message
        </Button>
      </div>
    </div>
  )
}

export default WithdrawalCard
