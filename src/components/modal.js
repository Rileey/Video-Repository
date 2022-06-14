import React, { useContext, useState, useEffect } from 'react'
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import { ChatBubble, Favorite, FavoriteBorder, Home, Share, LocationOn, Person, Create, People, DashboardOutlined } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../css/modal.modules.css'
import { AuthContext } from '../authContext/authContext';






const Modal = ({closeModal}) => {

    const { user } = useContext(AuthContext)
    const [video, setVideo] = useState({})
    const [post, setPost] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isChosen, setIsChosen] = useState(false)

    const handleChange = (e) => {
        const value = e.target.value
        setPost({...post, [e.target.name]: value})

    }

    if (video === {}) {
        return null
    }



    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault();
             let data = new FormData();
            data.append('userId', user._id) 
            data.append('description', post.description)
            if(video) {
            for (let i = 0; i < video.length; i++) {
                data.append('video', video[i], video[i].name)
            }
            try {
                await axios.post('/posts', data )
                setIsLoading(false)
                window.location.reload()
            } catch (err) {
                console.log(err);
            }
        } 
            
    }

    
    
    return(<>
        <div className="modalBackground">
            <form class="modalContainer" >
                <div className="titleCloseBtn">
                <button onClick={() => closeModal(false)}> X </button>
                </div>
                <div className="modTitle">
                    <textarea className="des-cc" type="text" name="description" placeholder={"What's going on "+user.username + " ?"} onChange={handleChange}></textarea>
                </div>
                <div className="bodyy" >
                    <div className="upload-body">
                        <input type="button" value="Choose Video" className="upload" />
                        <input type="file" id='video' name="video" className='videoplayer' accept="video/*" onChange={(e)=>{
                            setVideo(e.target.files)
                            console.log(e.target.files[0]?.name)
                            setIsChosen(true)
                            }}/>
                        {
                            isChosen ? (
                                <span className="file-upload-s">{video[0]?.name}</span>
                            ) : (
                                null
                            )
                        }
                    </div>
                    {isLoading ? (
                    <div className="upload-body-right">
                        <div class="loader"></div>
                        <input type="button" value="Sending..." className="upload" onClick={handleSubmit}/>
                    </div>

                    ) : (
                    <div className="upload-body-right">
                        {/* <div class="loader"></div> */}
                        <input type="button" value="Upload" className="upload" onClick={handleSubmit}/>
                    </div>
                    )
                    }
                </div>
            </form>
        </div>
    </>)
}
export default Modal