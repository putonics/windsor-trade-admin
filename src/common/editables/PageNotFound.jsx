import React from 'react'
import assets from '../../assets'

const PageNotFound = props => {
    return (
        <div className='w-screen h-screen flex justify-center items-center flex-col'>
            <img src={assets.invalidPage} className='w-1/2 h-1/2' />
            <div className='text-slate-400 text-xl font-extrabold'>404 Page not found</div>
        </div>
    )
}

export default PageNotFound