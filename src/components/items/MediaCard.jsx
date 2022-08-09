import React from 'react'
import Button from '../../common/components/Button'
import style from '../../common/style'

/**
 * @param {{url: string, type: 'image'|'video', onDelete: ()=>{}, disabled: boolean}} props 
 */
const MediaCard = props => {
    return (
        <div className={
            style('w-full').card()
        }>
            <div className={
                style('w-full bg-slate-500')
                    .add('flex flex-col').centerContent()
            }>
                <div className={style('w-full h-40 overflow-clip')}>
                    {
                        props.type === 'image'
                            ?
                            <img src={props.url} className={style('w-full h-full object-fill')}
                                alt='Your browser does not support the image.'
                            />
                            :
                            <iframe className={style('w-full')}
                                src={props.url + '?autoplay=1'}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                    }
                </div>
                <div className={style('p-2')}>
                    <Button
                        disabled={props.disabled}
                        color='rose' icon='fa fa-trash'
                        onClick={props.onDelete}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default MediaCard