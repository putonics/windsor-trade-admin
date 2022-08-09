import React from 'react'
/**
 * @param {{onSubmit: ()=>{}}} props 
 */
const Form = props => {
    return (
        <form {...props}
            onSubmit={e => {
                e.preventDefault()
                e.stopPropagation()
                if (props.onSubmit) {
                    props.onSubmit(e)
                } else {
                    console.log('Warning: onSubmit() does not given!')
                }
            }}
        >
            {props.children}
        </form>
    )
}

export default Form