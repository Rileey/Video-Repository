import React, { useContext, useState, useRef, useEffect } from 'react'
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import { ChatBubble, Favorite, FavoriteBorder, Home, Share, LocationOn, Person, Create, People, DashboardOutlined } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import '../css/profilemodal.modules.css'
import picture from '../images/stockphoto.jpeg'
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import { AuthContext } from '../authContext/authContext';






const Modal = ({closeModal, profilePicture}) => {
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)
    const [show3, setShow3] = useState(false)
    const { user, error } = useContext(AuthContext)
    const [image, setImage] = useState({})
    const [person, setPerson] = useState({})
    const [message, setMessage] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [profile, setProfile] = useState([])

// console.log(user.email, '-----richmond-----')


    const handleShowHide = () => {
        setShow(!show)
    }

    const handleShowHide2 = () => {
        setShow2(!show2)
    }

    const handleShowHide3 = () => {
        setShow3(!show3)
    }

    const handleChange = (e) => {
        const value = e.target.value
        setPerson({...person, [e.target.name]: value})
    }

    useEffect(() =>{
        const getPerson = async () => {
            const res = await axios.get(`/users/find/${user._id}`)
            setProfile(res.data)
            console.log(res.data)
        }
        getPerson()
    }, [user._id])

    if (image === {}) {
        return null
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true)
        setLoading(true)

             let data = new FormData();

            data.append('userId', user._id) 
            if(person.newPassword) {
            data.append('password', person.newPassword)
            } else {
                setMessage('Input the New Password')
            }
            if(person.confirmPassword) {
            data.append('confirmPassword', person.confirmPassword)
            } else {
                setMessage('Confirm your password')
            }
            
            
            
            try {
            if (person.newPassword !== person.confirmPassword) {
                setMessage('Passwords do not match')
                setLoading(false)
            } else {
                await axios.put(`/users/${user._id}`, data )
                setMessage('Password has been changed')
                setLoading(false)
                window.location.reload()
            }
            
                
            } catch (err) {
                console.log(err);
            }
    } 

    
    
    return(<>
        <div className="modalBackgroun-d">
            <form class="modalContaine-r" >
                <div className="titleCloseBtn">
                <button onClick={() => closeModal(false)}> X </button>
                </div>
                
                <div className="mod-container">
                <span className="message"><b>{message}</b></span>
                    <div className="mod-type">
                        <label className="label">New Password</label>
                        <div className="visinput">
                        <input type={show2 ? 'text' : 'password'} name="newPassword" placeholder="New Password" className="p-mod-input" onChange={handleChange}/>
                        {
                                show2 ? (
                                    <span className='visibility' onClick={handleShowHide2}><Visibility style={{fontSize: '15px'}}/></span>
                                ) : (
                                    <span className='visibility' onClick={handleShowHide2}><VisibilityOff style={{fontSize: '15px'}}/></span>
                                )
                            }
                    </div>
                    </div>
                    <div className="mod-type">
                        <label className="label">Confirm New Password</label>
                        <div className="visinput">
                        <input type={show3 ? 'text' : 'password'} name="confirmPassword" placeholder="Confirm New Password" className="p-mod-input" onChange={handleChange} />
                        {
                                show3 ? (
                                    <span className='visibility' onClick={handleShowHide3}><Visibility style={{fontSize: '15px'}}/></span>
                                ) : (
                                    <span className='visibility' onClick={handleShowHide3}><VisibilityOff style={{fontSize: '15px'}}/></span>
                                )
                            }
                    </div>
                    </div>
                </div>
                {
                    loading ? (
                <div className="end" >
                    <div class="loader"></div>
                    <input type="button" value="Updating..." className="update" onClick={handleSubmit}/>
                </div>
                    ) : (
                <div className="end" >
                    {/* <div class="loader"></div> */}
                    <input type="button" value="Update" className="update" onClick={handleSubmit}/>
                </div>
                    )
                }
            </form>
        </div>
    </>)
}
export default Modal