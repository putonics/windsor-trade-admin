import React from 'react'

/**
 * @param {{
 *      type: "button"| "checkbox"| "color"| "date"| "datetime-local"| "email"| "file"| "hidden"| "image"| "month"| "number"| "password"| "radio"| "range"| "reset"| "search"| "submit"| "tel"| "text"| "time"| "url"| "week",
 *      label: string,
 *      placeholder: string,
 *      value: string,
 *      required: boolean,
 *      multiline: boolean,
 *      min: number,
 *      max: number,
 *      disabled: boolean,
 *      readonly: boolean,
 *      onChange: (text: string)=>{},     
 *      onBlur: (text: string)=>{},     
 *      onFocus: (text: string)=>{},     
 * }} props 
 */
const TextBox = props => {
    const [state, setState] = React.useState('')

    React.useEffect(() => {
        if (!props || props.value === undefined || props.value === null) return
        const text = `${props.value}`
        if (state !== text) {
            setState(text)
        }
    }, [props])

    const isValid = (text) =>
        ((props.required && props.type === 'number' && props.min !== undefined && props.min !== null)
            ? (+text) >= (+props.min || 0)
            : true)
        &&
        ((props.required && props.type === 'number' && props.max)
            ? (+text) <= (+props.max)
            : true)

    const handleChange = e => {
        const text = `${e.target.value || ''}`
        if (!isValid(text)) {
            setState(`${state}`)
            return
        }
        setState(text)
        if (props && text !== props.value && props.onChange) {
            props.onChange(text)
        }
        if (!props.onChange) console.log('Warning: Missing onChange() event handler!')
    }

    const [status, setStatus] = React.useState({ touched: false, focused: false })
    const handleFocus = () => {
        setStatus({ touched: true, focused: true })
        if (props && props.onFocus) props.onFocus(state)
    }

    const handleBlur = () => {
        setStatus({ ...status, focused: false })
        if (props && props.onBlur) props.onBlur(state)
    }

    return (
        <div className='block'>
            <label
                className={`block ${(props.required && status.touched && !status.focused && !state) || !isValid(state) ? 'text-red-600' : 'text-gray-700'} text-sm font-bold mb-2`}
                htmlFor={props.label}
            >
                {props.label}
                {
                    props.required ? <span className='font-extrabold text-red-600'>*</span> : <></>
                }
            </label>
            {
                props.multiline
                    ?
                    <textarea
                        className="
                            bg-slate-200
                            shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                            leading-tight focus:outline-none focus:shadow-outline focus:shadow-slate-400
                            resize-none
                        "
                        rows={props.multiline.rows || 4}
                        value={state}
                        id={props.label}
                        type={`${props.type || 'text'}`}
                        placeholder={props.placeholder || props.label}
                        required={Boolean(props.required)}
                        maxLength={props.max || undefined}
                        minLength={props.min || undefined}
                        disabled={Boolean(props.disabled)}
                        readOnly={Boolean(props.readonly)}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                    :
                    <input
                        className="
                            bg-slate-200
                            shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                            leading-tight focus:outline-none focus:shadow-outline focus:shadow-slate-400
                        "
                        value={state}
                        id={props.label}
                        type={`${props.type || 'text'}`}
                        placeholder={props.placeholder || props.label}
                        required={Boolean(props.required)}
                        maxLength={props.max || undefined}
                        minLength={props.min || undefined}
                        disabled={Boolean(props.disabled)}
                        readOnly={Boolean(props.readonly)}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
            }
            <p className="text-red-500 text-xs italic">
                {
                    props.required && status.touched && !status.focused && !state
                        ? 'This field is mandatory.'
                        : state && props.type === 'number' && status.focused && (!isNaN(props.min) || !isNaN(props.max))
                            ? `Number must be between ${props.min} to ${props.max}`
                            : state && props.type !== 'number' && status.focused && (!isNaN(props.min) || !isNaN(props.max))
                                ? `Length of text must be between ${props.min} to ${props.max} characters`
                                : ''
                }&nbsp;
            </p>
        </div>
    )
}

export default TextBox