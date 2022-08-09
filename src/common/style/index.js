class Style {
    /**
     * @private
     */
    className = ''
    constructor(style) {
        this.className = style && style.className ? style.className : ''
    }
    /**
     * @private
     * @param {string} val 
     * @returns {Style}
     */
    setClass = (val) => {
        this.className = this.className + ' ' + val
        return this
    }

    /**
     * @override
     * @public 
     * @returns {string} 
     */
    toString = () => this.className.trim()

    /**
     * @param {string} className 
     * @returns {Style}
     */
    add = (className) => this.setClass(className)
    /**
     * @param {string} className 
     * @returns {Style}
     */
    xs = (className) => this.setClass('xs:' + className)
    /**
     * @param {string} className 
     * @returns {Style}
     */
    sm = (className) => this.setClass('sm:' + className)
    /**
     * @param {string} className 
     * @returns {Style}
     */
    md = (className) => this.setClass('md:' + className)
    /**
     * @param {string} className 
     * @returns {Style}
     */
    lg = (className) => this.setClass('lg:' + className)
    /**
     * @param {string} className 
     * @returns {Style}
     */
    xl = (className) => this.setClass('xl:' + className)
    /**
     * @param {string} className 
     * @returns {Style}
     */
    xxl = (className) => this.setClass('2xl:' + className)
    /**
     * @param {string} className 
     * @returns {Style}
     */
    hover = (className) => this.setClass('hover:' + className)
    /////////////////////////////////////////////////////////////////////////
    fullScreen = () => this.setClass('w-screen h-screen')
    full = () => this.setClass('w-full h-full')
    centerContent = () => this.setClass('flex justify-center items-center')
    /**
     * @param {'l'|'r'|'t'|'b'|'bl'|'br'|'tl'|'tr'|'L'|'R'|'T'|'B'|'BL'|'BR'|'TL'|'TR'} direction 
     * @returns {Style} 
     */
    gradient = (direction = 'l') => this.setClass(`bg-gradient-to-${direction.toLowerCase()}`)
    from = (color) => this.setClass(`from-[${color}]`)
    to = (color) => this.setClass(`to-[${color}]`)
    via = (color) => this.setClass(`via-[${color}]`)
    /**
     * @param {'sm'|'md'|'lg'|'xl'|'2xl'|'inner'|'none'|'inherit'} size
     * @param {string} color
     * @returns {Style} 
     */
    shadow = (size, color) => this.setClass(
        (size ? (size.startsWith('shadow') ? size : `shadow-${size.toLowerCase()}`) : 'shadow')
        + ' ' + (color ? (color.startsWith('#') ? `shadow-[${color}]` : color) : 'shadow-black')
    )
    /**
     * @param {'sm'|'md'|'lg'|'xl'|'2xl'|'inner'|'none'|'inherit'} size
     * @param {string} color
     * @returns {Style} 
     */
    dropShadow = (size) => this.setClass(
        (size ? (size.startsWith('drop-shadow') ? size : `drop-shadow-${size.toLowerCase()}`) : 'drop-shadow')
    )

    card = () => this.setClass('drop-shadow-xl rounded bg-slate-50 overflow-clip')

    grid = (cols, gap) => this.setClass(grids[cols > 12 ? 12 : cols]).setClass(gaps[gap > 6 ? 6 : gap])
    /**
     * @param {number} cols 
     * @returns {Style}
     */
    colspan = (cols) => this.setClass(`colspan-${cols}`)

    /**
     * @param {'center'|'between'|'around'|'evenly'|'start'|'end'} justify 
     * @param {'center'|'baseline'|'stretch'|'start'|'end'} align 
     * @param {boolean} wrap 
     * @param {boolean} reverse
     * @returns {Style}
     */
    flex = (justify = 'center', align = 'center', wrap = false, reverse = false) => this.setClass(`flex flex-row${reverse ? '-reverse' : ''} ${wrap ? 'flex-wrap' : ''} justify-${justify} items-${align}`)
}

/**
 * @param {string} className 
 * @returns {Style}
 */
const style = (className) => new Style(className ? { className: className } : null)
export default style

const grids = [
    '',
    'grid grid-cols-1',
    'grid grid-cols-2',
    'grid grid-cols-3',
    'grid grid-cols-4',
    'grid grid-cols-5',
    'grid grid-cols-6',
    'grid grid-cols-7',
    'grid grid-cols-8',
    'grid grid-cols-9',
    'grid grid-cols-10',
    'grid grid-cols-11',
    'grid grid-cols-12',
]

const gaps = [
    '',
    'gap-1',
    'gap-2',
    'gap-3',
    'gap-4',
    'gap-5',
    'gap-6',
]