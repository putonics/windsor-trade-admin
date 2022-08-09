import React from 'react'

/**
 * @param {{rows: number, cols: number}} props 
 */
const TableSkeleton = props => {
    const rows = Array.from(Array(props.rows).keys())
    const cols = Array.from(Array(props.cols).keys())

    return (
        <div className='w-full'>
            {
                rows.map(row => (
                    <div key={`skeleton-row-${row}`} className='flex flex-1 flex-row'>
                        {
                            cols.map(col => (
                                <div
                                    key={`skeleton-col-${col}`}
                                    className={`flex-1 py-4 bg-slate-400 border-2 border-slate-300 rounded blur
                                    animate-pulse ${(row + col) % 2 ? 'duration-300' : 'duration-1000'}`}
                                >
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default TableSkeleton