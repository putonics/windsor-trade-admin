import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../common/components/Button'
import style from '../../common/style'

const ItemBrief = props => {
    const { itemIndex } = props
    const navigate = useNavigate()
    return (
        <div className={style('p-4').card()}>
            <div className={style('flex justify-between flex-wrap')}>
                <div className={style('flex flex-wrap gap-6')}>
                    <div className={style('flex gap-2')}>
                        <div className={style('text-slate-600')}>Item</div>
                        <div className={style('text-slate-900 font-bold')}>{itemIndex.item.name}</div>
                    </div>
                    <div className={style('flex gap-2')}>
                        <div className={style('text-slate-600')}>unit</div>
                        <div className={style('text-slate-900 font-bold')}>{itemIndex.item.unitName}</div>
                    </div>
                    <div className={style('flex gap-2')}>
                        <div className={style('text-slate-600')}>manufactured by</div>
                        <div className={style('text-slate-900 font-bold')}>{itemIndex.item.manufacturer}</div>
                    </div>
                </div>
                <div className={style('flex-1 flex justify-end')}>
                    <Button onClick={() => navigate(`/items/${itemIndex.item.docref.id}`)}>
                        <i className='fa fa-edit' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ItemBrief