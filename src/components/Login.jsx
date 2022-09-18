import React from "react"
import assets from "../assets"
import Button from "../common/components/Button"
import Form from "../common/components/Form"
import TextBox from "../common/components/TextBox"
import { useLogin } from "../common/router/Login"
import style from "../common/style"

const Login = (props) => {
  const [state, setState] = React.useState({ userid: "", password: "" })

  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState("")

  const login = useLogin()

  React.useEffect(() => {
    if (login.signinTried > 1 && !login.info) {
      setError("Wrong! user-id or password.")
    } else {
      setError("")
    }
    setBusy(false)
  }, [login])

  const onSubmit = () => {
    setBusy(true)
    const { userid, password } = state
    login.signin(userid, password)
  }

  return (
    <div className={style("bg-indigo-900").fullScreen().centerContent()}>
      <div
        className={style(
          "md:w-1/2 md:gap-6 sm:gap-0 mx-2 grid md:grid-cols-2 sm:grid-cols-1"
        ).card()}
      >
        <div className="bg-slate-400 p-6">
          <div className="font-extrabold text-center text-2xl text-blue-900">
            Super Admin
          </div>
          <div className="m-6">
            <img src={assets.loginSide} className={style().full()} />
          </div>
        </div>
        <div className="p-6">
          <div className="text-xl font-extrabold text-slate-900 mb-6">
            Login here
            <div className="text-sm">V 3.3.0</div>
          </div>
          <Form onSubmit={onSubmit}>
            <div className="flex flex-col gap-4">
              <TextBox
                disabled={busy}
                label="User-id"
                type="text"
                value={state.userid}
                onChange={(userid) => setState({ ...state, userid })}
              />
              <TextBox
                disabled={busy}
                label="Password"
                type="password"
                value={state.password}
                onChange={(password) => setState({ ...state, password })}
              />
              <div className="flex justify-end">
                <Button disabled={busy} color="indigo" type="submit">
                  Sign in
                </Button>
              </div>
            </div>
          </Form>
          <div className="text-red-700">{error}</div>
        </div>
      </div>
    </div>
  )
}

export default Login
