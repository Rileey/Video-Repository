import React, { useContext, useState, useRef, useEffect, } from 'react'
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { ChatBubble, Favorite, FavoriteBorder, Home, Share, LocationOn, Person, Create, People, DashboardOutlined } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../css/postmodal.modules.css'
import Fullpost from './fullpost'
import { AuthContext } from '../authContext/authContext';
import { withRouter, useNavigate, useParams} from 'react-router-dom';
import { useLocation } from "react-router-dom"






const ProfilePostModal = ({user,
  myPosts
    }) => {
    const history = useNavigate();
    const {id} = useParams()
    const [post, setPost] = useState([])
    // const [myPosts, setMyPosts] = useState([])

    


    useEffect(()=> {
        const getPost = async () => {
            const { data } = await axios.get(`/posts/find/${id}`)
            if (data.getOnePost) {
              return setPost(data.getOnePost)
            } 
        }
        getPost()
    }, [id])

    if (post.length === 0) {
      return null
    }


const backArrow = () => {
  let currentPostId = post;
  let currentPostIndex = 0;

  currentPostIndex = myPosts.findIndex(
    (postData, index) => postData._id === currentPostId._id
  );


  if (currentPostIndex > 0) {
    currentPostIndex--;
    console.log('currentPostIndex', currentPostIndex);

    setPost(myPosts[currentPostIndex]);
  }
  history(`/profile/${user._id}/${post._id}`)
};

const forwardArrow = () => {
  let currentPostId = post;
  let currentPostIndex = 0;

  currentPostIndex = myPosts.findIndex(
    (postData, index) => { 
    return postData._id === currentPostId._id
}
  );



  if (currentPostIndex < myPosts.length - 1) {
    currentPostIndex++;
    console.log('currentPostIndex', currentPostIndex);

    setPost(myPosts[currentPostIndex]);
    
  }
  history(`/profile/${user._id}/${post._id}`)
};

    
    return(<>
    
    <div className="modal-Container">
            <div className="modalBackground-1">  
            <div className="modalLeft left"
            onClick={backArrow}
                >
                    <ArrowBackIosRoundedIcon/>
                </div>
                <div className="modalRight right"
                onClick={forwardArrow}
                >
                    <ArrowForwardIosRoundedIcon/>
                </div> 
                
                <div class="modalContainer-1">
                    <div className="titleCloseBtn-1">
                    <button onClick={(e) => {
                        history(`/profile/${user?._id}`)
                        e.stopPropagation()
                        }}> X </button>
                    </div>
                   <Fullpost user={user} post={post}/>
                </div>
            </div>
        
    </div>
    </>)
}
export default ProfilePostModal