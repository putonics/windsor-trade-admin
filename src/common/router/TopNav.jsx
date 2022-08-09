import React from 'react'
import TopNavContent from '../editables/TopNavContent'

const TopNav = props => {
    return (
        <div className={'px-4 bg-gradient-to-b from-violet-900 to-indigo-900' + (props.open ? ' hidden md:block' : '')}>
            <div
                className='flex justify-start gap-4 items-center m-2 p-2 text-xl text-gray-300 hover:text-white cursor-pointer'
                onClick={props.onClick}
            >
                <i className='fa fa-bars' />
                <TopNavContent />
            </div>
        </div>
    )
}

export default TopNav
