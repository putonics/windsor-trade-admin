import React from 'react'
import CheckBox from './CheckBox'
/**
 * @param {{
 *      label: string,
 *      list: Array<string>,
 *      value: string,
 *      onChange: (text: string)=>{},
 *      disabled: boolean,
 *      readonly: boolean,
 *      required: boolean,
 * }} props 
 */
const GroupCheckBox = props => {
    const { label = 'Select one', list = [], value = '', onChange = () => { } } = props
    const [state, setState] = React.useState({ list, value })
    React.useEffect(() => {
        if (state.value !== value) onChange(state.value)
    }, [state])
    return (
        <div className='block'>
            <CheckBox
                disabled={props.disabled}
                required={props.required}
                readonly={true}
                checked={state.value || value}
                label={label}
            />
            <div id={label}
                className='mt-2 flex flex-wrap gap-2 justify-around items-center 
                    bg-slate-200
                    shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline focus:shadow-slate-400
                    resize-none'
            >
                {
                    state.list.map(item => (
                        <CheckBox
                            checked={item === state.value || item === value}
                            disabled={props.disabled}
                            readonly={props.readonly}
                            label={item} key={item}
                            onChange={v => setState({ ...state, value: v })}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default GroupCheckBox