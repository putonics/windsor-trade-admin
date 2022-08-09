import React from 'react'
import Button from '../../common/components/Button'
import Form from '../../common/components/Form'
import TextBox from '../../common/components/TextBox'
import style from '../../common/style'

const SettingsPage = props => {
    const [state, setState] = React.useState({ password: '' })
    const [busy, setBusy] = React.useState(false)
    const onSubmit = () => { }
    return (
        <div className='flex items-center justify-center'>
            <Form onSubmit={onSubmit}>
                <div className={style('p-6 w-fit flex flex-col items-center justify-center gap-2').card()}>
                    <TextBox
                        required
                        disabled={busy}
                        label='Password'
                        type='password'
                        value={state.password}
                        onChange={password => setState({ ...state, password })}
                    />
                    <Button disabled={busy} color='indigo' type='submit' icon='fa fa-save'>Save changes</Button>
                </div>
            </Form>
        </div>
    )
}

export default SettingsPage