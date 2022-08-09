import React from 'react'
import assets from '../../assets'
import Button from '../../common/components/Button'
import Select from '../../common/components/Select'
import User from '../../common/redux/classes/User'
import style from '../../common/style'

/**
 * @param {{busy:boolean, user: User, onSend: (amount:number)=>{}}} props 
 */
const UserCard = props => {
    const { user } = props

    const [amount, setAmount] = React.useState(15)

    return (
        <div className={style('p-4').card()}>
            <div className='flex gap-x-2'>
                <img src={assets.user} className='w-24 h-24 opacity-25 hover:opacity-30 ease-in-out cursor-pointer' />
                <div className='gap-y-1'>
                    <div className='text-slate-900 font-semibold'>{user.name}</div>
                    <div className='text-slate-900 font-extrabold'>{user.docid}</div>
                    <div className='text-slate-900 text-xs'>{user.email}</div>
                    <div className='text-slate-900'>{user.countrycode}-{user.mobile}</div>
                </div>
            </div>
            <div className='flex w-full justify-between'>
                {
                    user.idproof.name ?
                        <div className='text-sm'>
                            <div className='flex'>
                                <div className='text-slate-500'>{user.idproof.name}:</div>
                                <div>&nbsp;{user.idproof.number}</div>
                            </div>
                            <div className='flex'>
                                <div className='text-slate-500'>Issued by </div>
                                <div>&nbsp;{user.idproof.issuingAuthority}</div>
                            </div>
                        </div>
                        :
                        <div className='text-red-800'>
                            Id proof not given.
                        </div>
                }
            </div>
            <div className='flex items-center gap-2 m-2 p-2 border border-stone-300 rounded-lg'>
                <Select
                    disabled={props.busy}
                    label='Select package'
                    value={amount}
                    onChange={text => setAmount(+text)}
                    options={[
                        { label: '$15', value: 15 },
                        { label: '$100', value: 100 },
                        { label: '$250', value: 250 },
                        { label: '$500', value: 500 },
                    ]}
                />
                <div className='mt-3'>
                    <Button disabled={props.busy} color='green' onClick={() => props.onSend(amount)}>Send</Button>
                </div>
            </div>
        </div>
    )
}

export default UserCard