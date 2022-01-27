import {useState} from "react"

export function LoginForm(){
    const dispatch = useDispatch()
    const [error, setError]=useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async e =>{
        e.preventDefault();
        setError(null, e)
        //await dispatch(login(username, password))
    }

    return(
        <form className="ui form" onSubmit={handleSubmit}>
                            <div className="field">
                                <label>Username</label>
                                <div className="ui left icon input">
                                    <input type="text" value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" />
                                    <i className="user icon"></i>
                                </div>
                            </div>
                            <div className="field">
                                <label>Password</label>
                                <div className="ui left icon input">
                                    <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
                                    <i className="lock icon"></i>
                                </div>
                            </div>
                            <div className="ui blue submit button">Login</div>

        </form>
                        
    )
}