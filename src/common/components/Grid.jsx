import React from 'react'
import PropTypes from 'prop-types'
import grids from './constants/grids'

const Grid = props => {
    const [className, setClassName] = React.useState(grids.all[0])
    React.useEffect(() => {
        let className = props.cols ? grids.all[props.cols] : ''
        className += props.xs ? grids.xs[props.xs] : ''
    }, [props])

    return (
        <div className={className}>{props.children}</div>
    )
}

Grid.propTypes = {
    cols: PropTypes.number,
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number,
    xxl: PropTypes.number,
    gap: PropTypes.number
}

export default Grid