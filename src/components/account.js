import '../css/account.modules.css'
import { AuthContext } from '../authContext/authContext'
import Navbar from './navbar'
import card from '../images/mastercard.svg'
import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import ProfileModal from '../components/profileModal'
import { useParams } from 'react-router-dom'
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';

const Account = () => {

    const { user, error, dispatch } = useContext(AuthContext)
    const [image, setImage] = useState({})
    const [person, setPerson] = useState({})
    const [file, setFile] = useState(false)
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [profile, setProfile] = useState([])
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [name, setName] = useState(false)
    const [number, setNumber] = useState(false)
    const [bio, setBio] = useState(false)
    const {id} = useParams()

    useEffect(() => {
        const getPerson = async () => {
            const res = await axios.get(`/users/find/${id}`)
            setProfile(res.data)
        }
        getPerson()
    }, [])
    

    const date = new Date(user.createdAt)
    const joined = date.getDate()  + '/' + date.getMonth() + '/' + date.getFullYear()

    const handleChange = (e) => {
        const value = e.target.value
        setPerson({...person, [e.target.name]: value})
    }

    if (image === {}) {
        return null
    }

    if (profile.length === 0) {
        return null
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        setSubmitted(true)
             let data = new FormData();

            data.append('userId', user._id) 
            if(person.username){
                data.append('username', person.username)
            }
            if(person.phone) {
            data.append('phone', person.phone)
            }
            if(person.about) {
            data.append('about', person.about)
            }
            if (!image) {
                data.append('profilePicture', person.profilePicture[0]?.profilePicture)
            }else {
            for (let i = 0; i < image.length; i++) {
                data.append('profilePicture', image[i], image[i].name)
            }
            try {
                await axios.put(`/users/${user._id}`, data )
                setLoading(false)
                if (error){
                    setMessage('Username has been TAKEN!!!')
                    console.log('just error---', error)
                }
                window.location.reload()
            } catch (err) {
                console.log(err);
            }
        } 
            
    }

    

    return(
        <>
        <Navbar />
        {
                            show && (
                                <ProfileModal
                                //  post={post} 
                                // profilePicture={profilePicture}
                                 closeModal={setShow} show={show}/>
                            )
                        }
        <div className="account-head">
            <div className="account-body">
                <div className="user-notice">
                    <div className="me-img-container-s  modImage" >
                    <div className="image-caption-s">
                    <img className="account-image" src={profile?.profilePicture[0]?.profilePicture || "../stockphoto.jpeg"} alt=""  cache={false}/>
                    <input type="file" id='image' name="profilePicture" className='modd-image' accept= "image/png, image/jpeg" onChange={(e)=>{
                        setImage(e.target.files)
                        setFile(true)
                    }}/>
                    <div className="moddLogo">
                        <CameraAltRoundedIcon />
                    </div>
                   
                </div>
                {
                    loading ? (
                <div className="end" >
                    <div class="loader"></div>
                    <input type='button' className='account-btn' value='saving...' onClick={handleSubmit}/>
                </div> 
                    ) : (
                    <div className="end" >
                        <div className="cap">
                         {
                    file ? (
                <span className="uploade-d">{image[0]?.name}</span>
                ) : (null)
                }
                        <input type='button' className='account-btn' value='Save' onClick={handleSubmit}/>
                        </div>
                    </div> 
                    ) 
                }
                        </div>
                    <span className="account">
                        Hello {profile.username}
                    </span>
                    <span className="joined">
                        Joined {joined}
                    </span>
                    <span className="notice-details">
                        Visit your account at talentcroft.com to update your payment
                        details, change your payment plan and other features
                    </span>
                </div>
            </div>
            <div className="user-information">
                <span className="billing">
                   <b> MEMBERSHIP AND BILLING </b>
                </span>
                <span className="use-r billing">email: <b>{profile.email}</b></span>
                <span className="use-r billing">phone: <b>+234 {profile.phoneNumber}</b></span>
                <hr />
                {
                    name ? (
                        <div className="change-container">
                            {
                                submitted && error ? (
                                    <input type="text" name="username" id="" placeholder={message} className="mod-input" onChange={handleChange} />
                                ) : (
                                    <input type="text" name="username" id="" placeholder={"Change username from " +profile.username + " ?"} className="mod-input" onChange={handleChange} />
                                )
                            }
                            
                            <input type="button" value="Back" className="go-back" onClick={()=>setName(false)} />
                        </div>
                    ) : (
                        <span className='user-action' onClick={()=>setName(true)}>Change Username</span>
                    )
                }
                <hr />
                {
                    number ? (
                        <div className="change-container">
                            <input type="number" name="phone" id="" placeholder={"Change number from " +profile.phoneNumber + " ?"} className="mod-input" onChange={handleChange} />
                            <input type="button" value="Back" className="go-back" onClick={()=>setNumber(false)} />
                        </div>
                    ) : (
                        <span className='user-action' onClick={()=>setNumber(true)}>Change Phone Number</span>
                    )
                }
                <hr />
                {
                    bio ? (
                        <div className="change-container">
                            <input type="text" name="about" id="" placeholder={"Tell us about " +profile.username } className="mod-input" onChange={handleChange} />
                            <input type="button" value="Back" className="go-back" onClick={()=>setBio(false)} />
                        </div>
                    ) : (
                        <span className='user-action' onClick={()=>setBio(true)}>Update Bio</span>
                    )
                }
                <hr />
                <span className='user-action' onClick={()=>setShow(true)}>Change Password</span>
                <hr />
                
                <span className="billing">Card Details</span>
                <div className="user-card">
                <img className='mastercard' src={card} alt="" srcset="" />
                <span className="billing">.... .... .... 2008</span>
                </div>
                <span className="billing">Your next billing date is ---</span>
            </div>
        </div>
        </>
    )
}

export default Account