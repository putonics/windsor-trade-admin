import React from "react"
import Button from "../../common/components/Button"
import User from "../../common/redux/classes/User"
import style from "../../common/style"

/**
 * @param {{busy:boolean, user: User, onSend: (amount:number)=>{}, onUnblock:()=>{}}} props
 */
const UserCard = (props) => {
  const { user } = props

  return (
    <div className={style("p-2").card()}>
      <div className="gap-y-1">
        <div className="text-slate-900 font-semibold">{user.name}</div>
        <div className="text-slate-400 text-xs">{user.email}</div>
        <div className="text-slate-600 font-extrabold">{user.docid}</div>
        <div className="text-slate-800">
          +{user.countrycode}-{user.mobile}
        </div>
        <Button
          disabled={props.busy}
          color="red"
          onClick={props.onUnblock}
          className="text-xs"
        >
          Click to unblock
        </Button>
        {/* </div> */}
      </div>
    </div>
  )
}

export default UserCard
