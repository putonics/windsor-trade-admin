import React from 'react'
const IconMaterial = props => {
    return (
        <i className={'material-icons ' + (props.className || '')} style={props.style}>
            {props.children}
        </i>
    )
}
export default IconMaterial