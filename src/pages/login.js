import { useContext, 
    useEffect, 
    useState } from 'react'
import { login } from '../authContext/apicalls';
import { AuthContext } from '../authContext/authContext';
import { Visibility, VisibilityOff } from '@material-ui/icons'
import axios from 'axios';
import '../css/login.modules.css'
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const [show, setShow] = useState(false)
    
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    const [random, setRandom] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const history = useNavigate()
    const { isFetching, error, dispatch } = useContext(AuthContext)


    const handleShowHide = () => {
        setShow(!show)
    }

    const handleClick = async(e) => {
        e.preventDefault()
        setSubmitted(true)
        try {
            login({email, password}, dispatch)
            if (!email || !password) {
                setMessage('Input all fields')
                console.log('no input---', error)
            } else if (error){
                setMessage('Incorrect email or password')
                console.log('just error---', error)
            } else if (!error){
                setMessage('Success')
            }
    
            
        } catch (err) {
            console.log(err)
        }
       
    }


    useEffect(() => {
        const getRandom = async () => {
            const res = await axios.get('/movies/random', {
                headers: {
                    token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzQ1ZGJhNWQ5ZGY1NmEzMzhhNTFmNCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDA2MzIyMjYsImV4cCI6MTY0MzIyNDIyNn0.FliBS9psdYuSEbr2OHwGf4iurw4ZjDYUJlbDggfnv1M'
                }
            })
            setRandom(res.data[0].image[0])
        }
        getRandom()
    }, [])


    
    return (
        <div className='log-login' 
        style=
        {
            {backgroundImage: `url(${random.image})`}
            }
            >
            <div className="top-container">
                <div className="my-logo">
                    <span>talentcroft</span>
                </div>
            </div>
            <div className="form-container">
            <div className="log-container">
                <form className='log-form' action="/">
                    <h1 className="sign-in">Sign In</h1>
                    { submitted ? 
                        (<p
                        style={{
                            color: 'white',
                            padding: '10px',
                            fontWeight: '600',
                            backgroundColor: 'black'
                        }}>{message}</p>) : null}
                        {submitted && !email ?
                            (<input type="email" className='red' placeholder='Please input the correct email' autoComplete='false' onChange={(e) => setEmail(e.target.value)}/>) :
                            (<input type="email" placeholder='Your Email' onChange={(e) => setEmail(e.target.value)}/>)
                        }
                        
                        {submitted && !password ?
                            (<div className='input-password'>
                            <input type={show ? "text": "password"} className='red' placeholder='Please input the correct password' onChange={(e) => setPassword(e.target.value)}/>
                            {
                                show ? (
                                    <span className='visibility' onClick={handleShowHide}><Visibility /></span>
                                ) : (
                                    <span className='visibility' onClick={handleShowHide}><VisibilityOff /></span>
                                )
                            }
                            </div>) :
                            (<div className='input-password'>
                            <input type={show ? "text": "password"}  placeholder='Your Password' onChange={(e) => setPassword(e.target.value)}/>
                            {
                                show ? (
                                    <span className='visibility' onClick={handleShowHide}><Visibility /></span>
                                ) : (
                                    <span className='visibility' onClick={handleShowHide}><VisibilityOff /></span>
                                )
                            }
                            </div>)
                        }




                        
                        <button className="log-button" onClick={handleClick}>Sign In</button>
                    <span className="signup-span">New to talentcroft views? Sign up <Link to='/register' 
                    style={{textDecoration: 'none', color: 'white'}}><b>here</b></Link></span>
                </form>
            </div>

        </div>
        </div>
    )
}

export default Login