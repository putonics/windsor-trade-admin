import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../common/components/Button'
import style from '../../common/style'
import { useItemIndices } from '../../common/redux/classes/items/ItemIndices'
import { useLogin } from '../../common/router/Login'
import TableSkeleton from '../../common/components/TableSkeleton'
import ItemBrief from './ItemBrief'

const ItemsPage = props => {
    const navigate = useNavigate()
    const [busy, setBusy] = React.useState(false)

    const itemIndices = useItemIndices()
    const login = useLogin()

    React.useEffect(() => {
        if (!login.info) return
        const { appname, subscriberdocid } = login.info
        if (!itemIndices.appname) {
            setBusy(true)
            itemIndices.load(appname, subscriberdocid).finally(() => setBusy(false))
        }
    }, [itemIndices, login])

    return (
        <div className={style('relative').full()}>
            <div className={style('space-y-1 pb-16')}>
                {
                    busy
                        ?
                        <TableSkeleton rows={10} cols={4} />
                        :
                        itemIndices.indices.map(itemIndex => (
                            <ItemBrief
                                key={itemIndex.item.docref.id}
                                itemIndex={itemIndex}
                            />
                        ))
                }
            </div>
            <div className={style('fixed bottom-3 right-6')}>
                <Button disabled={busy} fab icon='fa fa-add' onClick={() => navigate('/items/new-item')} />
            </div>
        </div >
    )
}

export default ItemsPage