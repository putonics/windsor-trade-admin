import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import ROUTES from '../editables/ROUTES'
import SideNavHeader from '../editables/SideNavHeader'

const SideNav = props => {

    const location = useLocation()

    React.useEffect(props.onClick, [location])

    return (
        <div
            className={'z-50 sidenav h-screen bg-indigo-900' + (props.open ? ' ease-linear' : ' hidden md:block')} >
            <div
                className="
                            flex flex-row justify-between items-start
                            p-5 md:m-2 sm:m-0 text-center 
                            text-blue-100 
                        "
            >
                <div className='p-2 text-xl text-red-500 md:hidden sm:block cursor-pointer hover:text-red-400'
                    onClick={props.onClick}
                >
                    <i className='fa fa-close' />
                </div>
                <SideNavHeader />
            </div>
            {
                ROUTES.filter(route => Boolean(route.title)).map(
                    (route, index) => (
                        <Link to={route.path} key={'side-nav-route-' + index}>
                            <div
                                className={`
                                    pl-2 py-2 md:m-2 sm:m-0 text-left 
                                    rounded-sm cursor-pointer
                                    hover:bg-slate-300  hover:text-slate-900 text-sm
                                    ${location.pathname.includes(route.path) ? 'bg-slate-400 text-slate-900 font-semibold' : 'text-slate-400'}
                                `}
                            >
                                <div className={`fas fa-${route.icon} mr-2`}></div>
                                {route.title}
                            </div>
                        </Link>
                    )
                )
            }
        </div>
    )
}

export default SideNav 
