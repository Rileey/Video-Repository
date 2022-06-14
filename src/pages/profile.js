import '../css/profile.modules.css'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Link, useParams, Routes, Route  } from 'react-router-dom'
import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import ArrowCircleUpRoundedIcon from '@mui/icons-material/ArrowCircleUpRounded';
import { ArrowDropDown, DashboardOutlined, LocationOn } from '@material-ui/icons'
import Navbar from '../components/navbar';
import { AuthContext } from '../authContext/authContext';
// import Video from '../components/video'
import ProfileVideo from '../components/profileVideo'
import ProfilePostModal from '../components/profilePostModal'
import Media from "react-media"



const Profile = () => {
    const { user: currentUser } = useContext(AuthContext)
    const [ user, setUser ] = useState([])
    const [video, setVideo] = useState([])
    const [profilePicture, setProfilePicture] = useState([])
    const [hovered, setHovered] = useState(false)
    const [myPosts, setMyPosts] = useState([])
    const [show, setShow] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const {id} = useParams()

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users/find/${id}`);
            setUser(res.data)
            setProfilePicture(res.data.profilePicture[0])
            window.scrollTo(0, 0);
        }
        fetchUser();
    }, [id])


    useEffect(() => {
        const getMyVideo = async() => {
            const res = await axios.get(`posts/user/${user.email}`)
            setVideo(res.data);
            window.scrollTo(0, 0);
        }
        getMyVideo()
    }, [user])


    useEffect(()=> {
        const getmyPost = async () => {
            const { data } = await axios.get(`/profile/posts/user/${user.email}`)
            setMyPosts(data)
        }
        getmyPost()
    }, [user])


    if (video.length === 0){
        return null
    }

    const arrLength = video.map((vid)=>vid.upvotes.length)
    const totalUpvotes = arrLength.reduce((a, b) => a + b, 0)

    return(
        <>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        {/* {
                            show && (
                                <ProfileModal
                                //  post={post} 
                                profilePicture={profilePicture}
                                 closeModal={setShow} show={show}/>
                            )
                        } */}
            <div className="me-container">
                <div className="me-top">
                    <div className="me-left">
                        <div className="left-top">
                        <div className="me-profile-img" >
                            <img className="me-img" src={profilePicture?.profilePicture || "../stockphoto.jpeg"} alt="" />    
                        </div>
                        <div className="me-profile-names">
                            <span className="me-name">{user.username}</span>
                        </div>
                        </div>
                        <div className="left-bottom">
                        <div className="me-bottom">
                        <span className="bio">{user.about}</span>
                        </div>
                        </div>
                    </div>
                    <div className="me-right">
                        <div className="me-posts">
                           <div className="me-logo">
                               <InsertPhotoRoundedIcon/>
                           </div>
                           <div className="me-numbers">
                                <span className="large-number">
                                    { video?.length}
                                </span>
                                <span className="small-caption">Posts</span>
                           </div>                         
                        </div>
                        <div className="me-followers">
                           <div className="me-logo">
                               <PeopleRoundedIcon />
                           </div>
                           <div className="me-numbers">
                                <span className="large-number">
                                    {user.followers?.length}
                                    </span>
                                <span className="small-caption">Followers</span>
                            </div> 
                        </div>
                        <div className="me-upvotes">
                           <div className="me-logo">
                               <ArrowCircleUpRoundedIcon />
                           </div>
                           <div className="me-numbers">
                                <span className="large-number">{totalUpvotes}</span>
                                <span className="small-caption">Upvotes</span>
                           </div> 
                        </div>
                    </div>
                </div>
                
                <div className="community-heade-r" >
                <div className="community-bar">
                    <Link to="/timeline" style={{textDecoration: 'none', color: 'white'}}>
                        <div className="top-logo">
                            <DashboardOutlined className='c-comp'/> Timeline
                        </div>
                    </Link>
                    <Link to="/community" style={{textDecoration: 'none', color: 'white'}}>
                        <div className="top-logo">
                            <LocationOn className='c-comp'/> Community
                        </div>
                    </Link>
                </div>
            </div>

                <div className="me-posts-container">
                    <div className="me-many-posts">
                    <Media query = '(min-width: 950px)'>
                  {
                    matches => {
                      return matches 
                      ? (
                        <>
                        {video.map((video)=> (
                            <Link to={`/profile/${user._id}/${video._id}`}>
                            <div key={video._id} className="me-content-container">
                                 <ProfileVideo video={video} />
                            </div>
                            </Link>
                        ))}
                         </>
                      ) : (
                        <>
                        {video.map((video)=> (
                            <div key={video._id} className="me-content-container">
                                 <ProfileVideo video={video} />
                            </div>
                        ))}
                         </>
                      )}}
                      </Media>
                    </div>
                    <Routes >
                        <Route exact path="/:id" element={<ProfilePostModal myPosts={myPosts} user={user} />} />
                    </Routes >
                </div>
            </div>
        </>
    )
}

export default Profile