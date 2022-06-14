import React, { useContext, useState, useEffect } from 'react'
import { ChatBubble, Favorite, FavoriteBorder, Home, Share, LocationOn, Person, Create, People, DashboardOutlined } from '@material-ui/icons'
import { Link, useHistory, useLocation } from 'react-router-dom'
import Navbar from '../components/navbar'
import PostModal from '../components/postModal'
import UploadList from '../components/uploadlist'
import '../css/community.modules.css'
import Post from '../components/post'
import axios from 'axios'
import Video from '../components/video'
import Modal from 'react-modal'
import Media from "react-media"
import { Routes, Route } from 'react-router-dom'
import { AuthContext } from '../authContext/authContext'
import {SectionsContainer, Section} from 'react-fullpage';

Modal.setAppElement('#root')

const Community = () => {

    const [posts, setPosts] = useState([])

    const [searchTerm, setSearchTerm] = useState("")
   
    const {user} = useContext(AuthContext)

    useEffect(()=> {
        const getPosts = async () => {
            const res = await axios.get('/posts')
            setPosts(res.data.data)
        }
        getPosts()
    }, [])

    if (posts.length === 0){
        return null
    }

    return(
        <>
                    <Media query = '(min-width: 950px)'>
                  {
                    matches => {
                      return matches 
                      ? (
                <>
                  <div className="community-container" >
                  <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                      <div className="community-header" >
                          <div className="community-bar">
                              <Link to="/timeline" >
                                  <div className="top-logo">
                                      <DashboardOutlined className='c-comp'/> Timeline
                                  </div>
                              </Link>
                              <Link to={`/profile/${user._id}`}>
                                  <div className="top-logo">
                                      <Home className='c-comp'/> Me
                                  </div>
                              </Link>
                          </div>
                      </div>
                      <div className="premium-container" >
                          <div className="video-list" >
                          {
                          posts.map((video, index) => (
                          <div className="video-link" key={video._id}>
                              <Link to={{pathname:`/community/${video._id}`, post: video}}> 
                                <Video video={video} />
                              </Link>
                          </div>
                          ))
                          }
                          </div>
                      </div>
          
          
                  <Routes >
                      <Route exact path="/:id" element={<PostModal posts={posts} />}/>
                  </Routes >
                      
                  </div>
                  </>
                      ) : (
                        <>
                        <div className="community-container" >
                        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                            <div className="community-header" >
                                <div className="community-bar">
                                    <Link to="/timeline" >
                                        <div className="top-logo">
                                            <DashboardOutlined className='c-comp'/> Timeline
                                        </div>
                                    </Link>
                                    <Link to={`/profile/${user._id}`}>
                                        <div className="top-logo">
                                            <Home className='c-comp'/> Me
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="premium-container" >
                                <div className="video-list" >
                                {
                                posts.map((video, index) => (
                                <div className="video-link" key={video._id}>
                                    {/* <SectionsContainer {...options}> */}
                                    <Video video={video} />
                                    {/* </SectionsContainer> */}
                                </div>
                                ))
                                }
                                </div>
                            </div>
                        </div>
                        </>
                      )}}
                      </Media>
                     </>
    )
}

export default Community
        