import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../common/components/Button'
import Form from '../../common/components/Form'
import GroupCheckBox from '../../common/components/GroupCheckBox'
import TextBox from '../../common/components/TextBox'
import { useItemIndices } from '../../common/redux/classes/items/ItemIndices'
import ItemView from '../../common/redux/classes/items/views/ItemView'
import { useLogin } from '../../common/router/Login'
import style from '../../common/style'
import MediaForm from './MediaForm'

const ItemForm = props => {

    const { itemdocid } = useParams()
    const itemIndices = useItemIndices()
    const login = useLogin()

    const [state, setState] = React.useState(new ItemView().json())

    React.useEffect(() => {
        console.log(state)
    }, [state])

    React.useEffect(() => {
        if (!login.info) return
        const { appname, subscriberdocid } = login.info
        if (itemIndices.indices.length > 0 && itemdocid && itemdocid !== 'new-item' && !state.subscriberdocid) {
            setBusy(true)
            itemIndices.fetchItem(itemdocid)
                .then(item => setState(item.json()))
                .finally(() => setBusy(false))
        } else if (!itemIndices.appname) {
            setBusy(true)
            itemIndices.load(appname, subscriberdocid)
                .finally(() => setBusy(false))
        }
    }, [itemIndices, itemdocid, login])

    const navigate = useNavigate()
    const [busy, setBusy] = React.useState(false)
    const handleSubmit = async () => {
        if (!login.info) return
        setBusy(true)
        if (itemdocid === 'new-item') {
            await itemIndices.insert(new ItemView(state),
                () => {
                    setBusy(false)
                    setState(new ItemView().json())
                    navigate('/items')
                },
                () => {
                    setBusy(false)
                }
            )
        } else {
            await itemIndices.update(new ItemView(state),
                () => {
                    setBusy(false)
                    setState(new ItemView().json())
                    itemIndices.reload()
                    navigate('/items')
                },
                () => {
                    alert('on ok')
                    setBusy(false)
                }
            )
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <div className={style('p-4 my-2').card()}>
                <div className={style('grid md:grid-cols-2 gap-4 mb-2')}>
                    <TextBox
                        disabled={busy}
                        label='Item name' placeholder='eg.: Dabur Honey 500gm' required
                        value={state.name} onChange={name => setState({ ...state, name })}
                    />
                    <TextBox
                        disabled={busy}
                        label='Manufacturer name' placeholder='eg.: Dabur India Ltd' required
                        value={state.manufacturer} onChange={manufacturer => setState({ ...state, manufacturer })}
                    />
                </div>
                <GroupCheckBox
                    disabled={busy}
                    label='Unit name'
                    list={['Pack', 'Bottle', 'Box', 'Tin', 'Pouch', 'Strip', 'Roll']}
                    value={state.unitName}
                    onChange={unitName => setState({ ...state, unitName })}
                    required
                />
            </div>
            <div className={style('p-4 my-2').card()}>
                <div className={style('grid md:grid-cols-2 gap-4 mb-2')}>
                    <TextBox
                        disabled={busy}
                        label='Item type' placeholder='eg.: Food suplement'
                        value={state.type} onChange={type => setState({ ...state, type })}
                    />
                    <TextBox
                        disabled={busy}
                        label='Made of' placeholder='eg.: 100% Pure Honey'
                        value={state.composition} onChange={composition => setState({ ...state, composition })}
                    />
                </div>
                <TextBox
                    disabled={busy}
                    multiline
                    label='Description' placeholder='eg.: Comes with Honey, Glass Jar, Steel Lid etc.'
                    value={state.description} onChange={description => setState({ ...state, description })}
                />
            </div>
            <MediaForm
                disabled={busy}
                medias={[...state.images.map(url => ({ url, type: 'image' })), ...state.videos.map(url => ({ url, type: 'video' }))]}
                onChange={medias => setState({
                    ...state,
                    images: medias.filter(media => media.type === 'image').map(media => media.url),
                    videos: medias.filter(media => media.type === 'video').map(media => media.url),
                })}
            />
            <div className={style('p-6').card().centerContent()}>
                <Button
                    busy={busy}
                    type='submit' color='indigo'
                    icon='fa fa-save'
                >
                    Save
                </Button>
            </div>
        </Form >
    )
}

export default ItemForm