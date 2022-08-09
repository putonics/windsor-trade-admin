import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../common/components/Button'
import Form from '../common/components/Form'
import Select from '../common/components/Select'
import TextBox from '../common/components/TextBox'
import CountryCodes from '../common/constants/CountryCodes'
import { api } from '../common/redux/classes/CryptoServer'
import User from '../common/redux/classes/User'
import style from '../common/style'

const Signup = props => {

    const { refdocid } = useParams()

    const [busy, setBusy] = React.useState(false)
    const [error, setError] = React.useState('')
    React.useEffect(() => {
        api(`/referer/${refdocid}`).then(flag => {
            if (!flag) {
                setError('Invalid reference id!')
                setBusy(true)
            }
        })
    }, [refdocid])

    const [state, setState] = React.useState({
        refdocid: refdocid, name: '', email: '', countrycode: '1', mobile: '', password: ''
    })

    React.useEffect(() => setError(''), [state])

    const onChangeEmail = (email) => {
        setState({ ...state, email })
        if (email.length >= 14 && email.includes('.') && email.includes('@')) {
            api(`/email/${email}`).then(flag => {
                if (flag) {
                    setError('Email already exists!')
                }
            })
        }
    }

    const navigate = useNavigate()
    const onSubmit = async () => {
        setBusy(true)
        const user = new User(await api('/user/signup', (new User(state)).json()))
        if (user && user.docid) {
            alert('Successfully created please keep this id: ' + user.docid)
            navigate('/')
        } else {
            setBusy(false)
            setError('Not registered! Try again')
        }
    }

    return (
        <div className={style('bg-indigo-900').fullScreen().centerContent()}>
            <Form onSubmit={onSubmit}>
                <div className={style('md:gap-6 sm:gap-0 mx-2 grid md:grid-cols-2 sm:grid-cols-1').card()}>
                    <div className='p-6'>
                        <div className={style('text-xl font-extrabold text-slate-900 mb-6')}>
                            Signup here
                        </div>
                        <TextBox
                            required
                            disabled={true}
                            label='Referer id'
                            type='text'
                            value={refdocid}
                        />
                        <TextBox
                            required
                            disabled={busy || error.startsWith('Email')}
                            label='Name'
                            type='text'
                            value={state.name}
                            onChange={name => setState({ ...state, name })}
                        />
                        <TextBox
                            required
                            disabled={busy}
                            label='Email'
                            type='email'
                            value={state.email}
                            onChange={onChangeEmail}
                        />
                    </div>
                    <div className='p-6'>
                        <Select
                            required
                            disabled={busy || error.startsWith('Email')}
                            label='Live in'
                            type='text'
                            value={state.countrycode}
                            options={CountryCodes.map(c => ({ label: c.name, value: c.code }))}
                            onChange={countrycode => setState({ ...state, countrycode })}
                        />
                        <div className='p-1 flex flex-row justify-center items-center'>
                            <img className='w-10 h-10 border border-solid border-slate-200' src={`https://countryflagsapi.com/svg/${CountryCodes.find(c => c.code === state.countrycode).name}`} />
                            <div className='p-1 flex flex-row justify-center items-center'>
                                <div className='font-semibold text-slate-500'>ISD: </div>
                                <div className='font-semibold text-slate-800'>+{state.countrycode}</div>
                            </div>
                        </div>
                        <TextBox
                            required
                            disabled={busy || error.startsWith('Email')}
                            label='Mobile no.'
                            type='text'
                            value={state.mobile}
                            onChange={mobile => setState({ ...state, mobile })}
                        />
                        <TextBox
                            required
                            disabled={busy || error.startsWith('Email')}
                            label='Password'
                            type='password'
                            value={state.password}
                            onChange={password => setState({ ...state, password })}
                        />
                        <div className={style('flex justify-end')}>
                            <Button disabled={busy || error.startsWith('Email')} color='indigo' type='submit'>Request to join</Button>
                        </div>
                        <div className='text-red-700'>
                            {error}
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default Signup
