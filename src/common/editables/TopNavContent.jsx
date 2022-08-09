import React from 'react'
import { useLogin } from '../router/Login'

const TopNavContent = props => {

    const login = useLogin()

    return (
        <div className='flex-1 flex'>
            <div className='flex-1 md:text-lg sm:text-xs'>
                <div className='grid md:grid-cols-2 sm:grid-cols-1'>
                    <div>
                        Welcome! {login.info.name}
                    </div>
                </div>
            </div>
            <div className='flex text-sm px-1 gap-1 justify-center items-center text-red-400 hover:text-red-500'
                onClick={login.signout}
            >
                <i className='fa fa-power-off' />
            </div>
        </div>
    )
}

export default TopNavContent