import React from 'react'
import Button from '../../common/components/Button'
import { readableDateTimeLong } from '../../common/editables/services'
import PackageRequest from '../../common/redux/classes/PackageRequest'
import style from '../../common/style'

/**
 * @param {{pr: PackageRequest}} props 
 */
const PackageCard = props => {
    const { pr } = props
    return (
        <div className={style('p-4 grid grid-cols-1 md:grid-cols-3 gap-2').card()}>
            <div>
                <div className='flex gap-2'>
                    <div className='text-slate-600'>Requested package:</div>
                    <div className='text-slate-900 font-extrabold'>${pr.amount}<span className='text-red-700 font-extrabold'>*</span></div>
                </div>
                <div className='text-slate-900 font-semibold italic'>{readableDateTimeLong(pr.requestedon)}</div>
                <div className='flex gap-2'>
                    <div className='text-slate-600'>To:</div>
                    <div className='text-slate-900 font-extrabold'>{pr.todocid}</div>
                </div>
                <div className='text-slate-900'>{pr.name}</div>
            </div>
            <div>
                <div className='flex gap-2'>
                    <div className='text-slate-600'>By:</div>
                    <div className='text-slate-900 font-extrabold'>{pr.docid}</div>
                </div>
                <div className='text-slate-900 text-left font-semibold'>{pr.name}</div>
                <div className='text-slate-900 italic text-left font-semibold'>{pr.email}</div>
                <div className='text-slate-900 text-left font-semibold'>+{pr.countrycode}-{pr.mobile}</div>
            </div>
            <div className='flex flex-col justify-center items-center gap-2'>
                <div className='text-red-700 text-xs italic text-center'>
                    *Please be confirmed to receive the amount form {pr.name} before assigning this package to {pr.toname}.
                </div>
                <Button color='orange' onClick={props.onSubmit}>Add package ${pr.amount}</Button>
            </div>
        </div>
    )
}

export default PackageCard