import React from 'react'
import Button from '../../common/components/Button'
import TextBox from '../../common/components/TextBox'
import style from '../../common/style'
import MediaCard from './MediaCard'

class Media {
    url = ''
    type = 'image'//'image'|'video'
}

/**
 * @param {{medias: Array<Media>, onChange: (Array<Media>)=>{}, disabled: boolean}} props 
 */
const MediaForm = props => {
    const { medias = [], onChange = () => { } } = props

    const [state, setState] = React.useState(medias)

    const [url, setUrl] = React.useState('')
    React.useEffect(() => {
        if (url.startsWith('https://www.youtube.com/watch?v=')) {
            setUrl(url.replace('watch?v=', 'embed/'))
        }
    }, [url])

    React.useEffect(() => {
        setState(medias)
    }, [props])

    const handleAdd = type => {
        const newState = state.map(m => m)
        newState.push({ url, type: type })
        setState(newState)
        setUrl('')
        onChange(newState)
    }

    return (
        <div className={style('w-full my-4 p-6').card()}>
            <div className={style('text-lg font-extrabold mb-4')}>Images &amp; YouTube videos of Item</div>
            <div
                className={style('flex flex-col gap-4')}
            >
                <TextBox
                    disabled={props.disabled}
                    type='url'
                    label='Image / Video URL'
                    placeholder='https://www.youtube.com/watch?v=m_JchTHUzhI'
                    value={url}
                    onChange={text => setUrl(text)}
                />
                <div className={style('flex flex-row gap-4 justify-end')}>
                    <Button
                        icon='fa fa-add'
                        disabled={!Boolean(url) || props.disabled}
                        onClick={() => handleAdd('image')}
                    >
                        Image URL
                    </Button>
                    <Button
                        icon='fa fa-add'
                        disabled={!Boolean(url) || props.disabled}
                        onClick={() => handleAdd('video')}
                    >
                        Video URL
                    </Button>
                </div>
            </div>
            <div className={style('mt-6').grid(4, 4)}>
                {
                    state.map((m, i) =>
                        <MediaCard
                            disabled={props.disabled}
                            key={'mediacard' + i}
                            url={m.url}
                            type={m.type}
                            onDelete={() => { setState(state.filter((mx, index) => index !== i)) }}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default MediaForm