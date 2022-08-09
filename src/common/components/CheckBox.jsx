import React from 'react'
/**
 * @param {{
 *      label: string,
 *      value: string,
 *      disabled: boolean,
 *      readonly: boolean,
 *      required: boolean,
 *      checked: boolean,
 *      onChange: (text: string)=>{}     
 * }} props 
 */
const CheckBox = props => {

    const [state, setState] = React.useState(Boolean(props.checked))

    React.useEffect(() => {
        if (Boolean(props.checked) !== state) setState(!state)
    }, [props])

    const handleChange = e => {
        if (props.readonly) return
        const checked = !state
        setState(checked)
        if (!props.onChange) console.log('Warning: Missing onChange() event handler!')
        else props.onChange(checked ? props.value || props.label : null)
    }

    return (
        <div className='block'>
            <div className='flex flex-row gap-2 items-center hover:font-bold'>
                <input
                    className={`
                    bg-slate-200
                    ${state ? '' : props.required ? 'bg-red-200 appearance-none' : 'appearance-none'} border rounded text-gray-700 
                    leading-tight focus:outline-none cursor-pointer
                    w-6 h-6
                    `}
                    checked={state}
                    value={props.value || props.label || 'Check-box'}
                    id={props.label}
                    type='checkbox'
                    disabled={Boolean(props.disabled)}
                    required={Boolean(props.required)}
                    onChange={handleChange}
                />
                <label
                    className={`cursor-pointer block ${state ? 'text-slate-900 font-bold' : props.required ? 'text-red-600 font-bold' : 'text-slate-500'} text-sm`}
                    htmlFor={props.label}
                >
                    {props.label}
                    {
                        props.required ? <span className='font-extrabold text-red-600'>*</span> : <></>
                    }
                </label>
            </div>
        </div>
    )
}

export default CheckBox