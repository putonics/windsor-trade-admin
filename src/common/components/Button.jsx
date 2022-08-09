import React from 'react'
import './style.css'
import { bgColors500, bgColorsActive600, bgColorsHover700 } from './colors';
/**
 * @param {{
 *      fab: boolean,
 *      type: 'submit' | 'button' | 'reset',
 *      icon: string,
 *      color: 'gray'|'slate'|'zinc'|'stone'|'red'|'orange'|'amber'|'yellow'|'lime'|'green'|'emerald'|'teal'|'cyan'|'sky'|'blue'|'indigo'|'violet'|'purple'|'fuchsia'|'pink'|'rose',
 *      disabled: boolean,
 *      busy: boolean,
 *      onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{}
 * }} props 
 */
const Button = props => {

    const handleClick = props.busy || props.disabled ? e => { e.preventDefault(); e.stopPropagation(); }
        : props.onClick || (() => {
            if (props.type === 'button') console.log('Warning: Missing onClick() event handler!')
        })

    return (
        <div className='relative'>
            <button
                className={
                    `items-center relative
                ${props.disabled || props.busy
                        ? 'bg-gray-400 text-gray-500 font-bold'
                        : `${props.color ? bgColors500.filter(col => col.includes(props.color)) : 'bg-blue-500'} 
                    ${props.color ? bgColorsHover700.filter(col => col.includes(props.color)) : 'hover:bg-blue-700'}
                    ${props.color ? bgColorsActive600.filter(col => col.includes(props.color)) : 'hover:bg-blue-600'}
                     text-white font-bold focus:outline-none focus:shadow-outline`
                    }
                ${props.fab ? 'rounded-full w-12 h-12' : 'rounded py-2 px-4 flex gap-2'} ${props.className || ''}`
                }
                type={props.type || 'button'}
                disabled={Boolean(props.disabled)}
                onClick={handleClick}
            >
                {props.busy ? <img src={require('./busy.svg').default} className='w-6 h-6 animate-spin opacity-20' /> : <></>}
                {props.icon ? <i className={props.icon} /> : <></>}
                {props.fab ? '' : props.children}
            </button >
        </div>
    )
}

export default Button