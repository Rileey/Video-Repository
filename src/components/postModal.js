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






const PostModal = ({
     posts
    }) => {
    const location = useLocation()
    const history = useNavigate();
    const {id} = useParams()
    const { user } = useContext(AuthContext)
    const [post, setPost] = useState([])


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

  currentPostIndex = posts.findIndex(
    (postData, index) => postData._id === currentPostId._id
  );


  if (currentPostIndex > 0) {
    currentPostIndex--;
    // console.log('currentPostIndex', currentPostIndex, post._id);

    history(`/community/${post._id}`)
    setPost(posts[currentPostIndex]);
    
  }
};

const forwardArrow = () => {
  
  let previousPostId = post._id;
  // console.log(post, 'post', posts, 'posts')
  let previousPostIndex = 0;
  previousPostIndex = posts.findIndex(
    (postData, index) => { 
      // console.log('prevPostData', postData,)
      if (previousPostIndex < posts.length - 1) {
        previousPostIndex = previousPostIndex + 1;
        const currentPostIndex = previousPostIndex
        
        // console.log(currentPostIndex, 'current post index', postData._id, 'previousPostId', 
        // // postData, 'newPostId'  
        // )
        // console.log('currentPostIndex', currentPostIndex, previousPostId);
    
        
        setPost(posts[currentPostIndex]);
    
    
    
        // return postData._id
        
      }
      // history(`/community/${postData._id}`)
      return postData._id === previousPostId
}
  );

  history(`/community/${post._id}`)



  
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
                        history('/community')
                        e.stopPropagation()
                        }}> X </button>
                    </div>
                   <Fullpost user={user} post={post}/>
                </div>
            </div>
        
    </div>
    </>)
}
export default PostModal