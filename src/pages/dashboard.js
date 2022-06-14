import React, { useContext, useState, useEffect } from 'react'
import { ChatBubble, Favorite, FavoriteBorder, Home, Share, LocationOn, Person, Create, People} from '@material-ui/icons'
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import { Link } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../css/dashboard.modules.css'
import axios from 'axios'
import Footer from '../components/footer'
import Modal from '../components/modal'
import Post from '../components/post'
import Media from "react-media"
import { AuthContext } from '../authContext/authContext'

const Dashboard = () => {

    const [searchTerm, setSearchTerm] = useState("")
    const [stack, setStack] = useState(false)
    const [show, setShow] = useState(false)
    const [post, setPost] = useState([])
    const {user} = useContext(AuthContext)

    useEffect(()=> {
        const getPosts = async () => {
            const res = await axios.get('/posts/timeline/' + user._id)
            setPost(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt)
            }))
            window.scrollTo(0, 0);
        }
        getPosts()
    }, [])

    useEffect(() => {
        
    })


    return(
        <>
        <div className='dash-app'>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <div className="dash-timeline">
        <div className="side-bar">
                <div className="side-content-container">
                    <Link to={`/profile/${user._id}`}>
                        <div className="side-log-o" style={{textDecoration: 'none', color: '#ff7e00', margin: '20px 0'}}>
                            <Home className='comp'/> 
                            <span className='top-wordss'>Me</span>
                        </div>
                    </Link>
                    <Link to="/community">
                        <div className="side-log-o" style={{textDecoration: 'none', color: '#ff7e00', margin: '20px 0'}}>
                            <LocationOn className='comp'/> 
                            <span className='top-wordss'>Community</span>
                        </div>
                    </Link>
                        
                        <div className="side-log-o" onClick={()=>setShow(true)} style={{textDecoration: 'none', color: '#ff7e00', margin: '20px 0'}} >
                            <Create className='comp' /> 
                            <span className='top-wordss'>Upload Video</span>
                        </div>
                        
                        

                    {/* <Link to="/community" style={{textDecoration: 'none', color: 'white'}}> */}
                        <div className="side-log-o" style={{textDecoration: 'none', color: '#ff7e00', margin: '20px 0'}}>
                            <LeaderboardRoundedIcon className='comp'/> 
                            <span className='top-wordss'>Analytics</span>
                        </div>
                    {/* </Link> */}
                </div>
            </div>
            <div className="dashboard-container">
            
                <div className="timeline-container">
            {
                post.map((video) => (
                <div key={video._id}>
                <Post className='post' video={video}/>
                </div>
                ))
            }

           
                </div>
            </div>
            
            
                        {
                            show && (
                                <Modal post={post} closeModal={setShow} show={show}/>
                            )
                        }
        </div>
        </div>
        
        </>
        
    )

}

export default Dashboard

