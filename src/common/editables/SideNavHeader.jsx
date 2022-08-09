import React from 'react'
import { useLogin } from '../router/Login'

const SideNavHeader = props => {

    const login = useLogin()

    return (
        <div className='sm:p-2 md:p-0 flex-1 flex justify-center items-center'>
            <div className='font-extrabold text-xl'>
                Windsor Trade
            </div>
        </div>
    )
}

export default SideNavHeader