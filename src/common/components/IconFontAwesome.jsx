import React from 'react'
const IconFontAwesome = props => {
    return (
        <i className={'fa fa-' + (props.children || '') + ' ' + (props.className || '')} style={props.style}></i>
    )
}
export default IconFontAwesome