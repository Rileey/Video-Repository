import React, { Suspense, useContext, useState, useEffect, useRef } from 'react'
import { ChatBubble, Favorite, FavoriteBorder, Home, Share, LocationOn } from '@material-ui/icons'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ReactPlayer from 'react-player'
// import { Link } from 'react-router-dom'
// import Navbar from '../components/navbar'
import '../css/video.modules.css'
import PostControl from '../components/postControl'
import Media from "react-media"
import { AuthContext } from '../authContext/authContext'
import axios from 'axios'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
// import film from '../images/gif.gif'


const formated = (seconds) => {
    if (isNaN(seconds)){
        return '00:00'
    }
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = date.getUTCSeconds().toString().padStart(2, '0')
    if (hh){
        return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`
    }

    return `${mm}:${ss}`
}



const ProfileVideo = ({video}) => {

    const [hover, setHover] = useState(false)
    const [click, setClick] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [isUpvoted, setIsUpvoted] = useState(false)
    const [timeDisplayFormat, setTimeDisplayFormat] = useState('normal')
    const [upvote, setUpvote] = useState(video.upvotes?.length)
    const [like, setLike] = useState(video.likes?.length)
    const { user:currentUser, dispatch } = useContext(AuthContext)
    const [state, setState] = useState({
        playing: false,
        muted: true,
        volume: 1,
        playbackRate: 1.0,
        played: 0,
        seeking: false,
    })
    const {playing, muted, volume, playbackRate, played, seeking} = state
    const playerRef = useRef(null)
    // const playerContainerRef = useRef(null)
    const controlsRef = useRef(null)

    const handlePlayPause = () => {
        setState({...state, playing: !state.playing})
    }

    const handleProgress = (changeState) => {

        if(!state.seeking){
            setState({...state, ...changeState})
        }
    }

    const handleMute = () => {
        setState({...state, muted: !state.muted})
    }

    const handleVolumeChange = (e, newValue) => {
        setState({
            ...state, 
            volume: parseFloat(newValue/100), 
            muted: newValue === 0 ? true:false
        })
    }

    const handleSeekChange = (e, newValue) => {
        setState({...state, played: parseFloat(newValue/100)})
    }

    const handleSeekMouseDown = (e) => {
        setState({...state, seeking: true})
    }

    const handleSeekMouseUp = (e, newValue) => {
        setState({...state, seeking: false})
        playerRef.current.seekTo(newValue/100)
    }

    const handleChangeDisplayFormat = () => {
        setTimeDisplayFormat(
         timeDisplayFormat==='normal'
        ?'remaining' : 'normal',)
    }

    const handleVolumeSeekUp = (e, newValue) => {
        setState({
            ...state, 
            volume: parseFloat(newValue/100), 
            muted: newValue === 0 ? true:false
        })
    }

    const handlePlaybackRateChange = (rate) => {
        setState({...state, playbackRate: rate})
    }
    

    const currentTime = playerRef.current 
    ? playerRef.current.getCurrentTime() 
    : '00:00';
    const duration = playerRef.current 
    ? playerRef.current.getDuration() 
    : '00:00'; 

    const elapsedTime = timeDisplayFormat==='normal' 
    ? formated(currentTime) 
    : `-${formated(duration - currentTime)}`;
    const totalDuration = formated(duration)


    useEffect(() => {
        setIsLiked(video.likes?.includes(currentUser._id))
    }, [currentUser._id, video.likes])

    useEffect(() => {
        setIsLiked(video.upvotes?.includes(currentUser._id))
    }, [currentUser._id, video.upvotes])

    const handleLike = async () => {
        try {
            const res = await axios.put(`/posts/${video._id}/like`, {
                userId: currentUser._id,
            })
            console.log(res.data)
            
            setLike(isLiked ? like - 1 : like + 1)
            setIsLiked(!isLiked)
            
        } catch (err) {
            console.log(err)
        }
    
}

const handleUpvote = async () => {
    try {
        const res = await axios.put(`/posts/${video._id}/upvote`, {
            userId: currentUser._id,
        })
        console.log(res.data)
        setUpvote(isUpvoted ? upvote - 1 : upvote + 1)
            setIsUpvoted(!isUpvoted)          
    } catch (err) {
        console.log(err)
    }

}


// console.log(video._creator)

    return(
        <>
                 <>
                    <Media query = '(min-width: 950px)'>
                  {
                    matches => {
                      return matches 
                      
                      ? (
                <div className="timeline-posts">
                    <div className="post-container"
                    onMouseEnter={()=>setHover(true)}
                    onMouseLeave={()=>setHover(false)}
                    >
                        <div className="post-imag-e">
                                <>
                                <div className="imagey-user">
                                <img src={video._creator?.profilePicture[0].profilePicture} alt="" className="imagey-image" />
                                <span className="imagey-words">{video._creator?.username}</span>
                                </div> 
                                <PlayArrowIcon 
                                    style={{
                                        position: 'absolute',
                                        right: '10',
                                        top: '10',
                                        color: 'white'
                                    }}
                                    />  
                                <div className="imagey-container">

                    <ReactPlayer
                    ref={playerRef}
                    url={video.video[0]?.video} 
                    playing={playing} 
                    muted={muted}
                    volume={volume}
                    playbackRate={playbackRate}
                    style={{backgroundColor: 'black'}}
                    onProgress={handleProgress}
                    width='100%'
                    height='100%'
                    />
                                                           
                                </div>
                                </>
                                <>
                                <div className="fullpost-social" style={{
                                    position: "absolute", 
                                    left: '0%',
                                    top: '130px', 
                                    backgroundColor:'#0000008a'
                                    }}>
                                    {
                                !like ? (
                                    <FavoriteBorder style={{fontSize:"20px", margin: "0 10px"}} />
                                ) : (
                                    <Favorite style={{fontSize:"20px", margin: "0 10px", color: 'red'}} />
                                )
                                }
                                    <span className="likes" style={{fontSize:"20px", margin: "0 10px"}}>
                                        {video.likes?.length}
                                    </span>
                                </div>
                                <div className="fullpost-social" style={{
                                    position: "absolute", 
                                    left: '0%', 
                                    bottom: '130px',
                                    backgroundColor:'#0000008a'
                                }}>
                                    <ArrowCircleUpIcon style={{fontSize:"20px", margin: "0 10px"}} onClick={handleUpvote}/>
                                    <span className="upvotes" style={{fontSize:"20px", margin: "0 10px"}}>
                                    {video.upvotes?.length}
                                    </span>
                                </div>
                                </>   
                        </div>
                    </div>
                    
                </div>
                    
                      ) : (
     
                        <div className="timeline-posts">
                        <div className="post-container">
                            <div className="post-imag-e">
                                    <>
                                    <div className="imagey-user">
                                    <img src={video._creator?.profilePicture[0].profilePicture} alt="" className="imagey-image" />
                                    <span className="imagey-words">{video._creator?.username}</span>
                                    </div> 
                                    <PlayArrowIcon 
                                        style={{
                                            position: 'absolute',
                                            right: '10',
                                            top: '10',
                                            color: 'white'
                                        }}
                                        />  
                                    <div className="imagey-container">
                        <ReactPlayer
                        ref={playerRef}
                        url={video.video[0]?.video} 
                        playing={playing} 
                        muted={muted}
                        volume={volume}
                        playbackRate={playbackRate}
                        style={{backgroundColor: 'black'}}
                        onProgress={handleProgress}
                        width='100%'
                        height='100%'
                        />
                                                               
                                    </div>
                                    </>
                                    <>
                          <PostControl
                    ref={controlsRef}
                    onPlayPause={handlePlayPause}
                    playing={playing}
                    muted={muted}
                    onMute={handleMute}
                    onvolumechange={handleVolumeChange}
                    onVolumeSeekUp={handleVolumeSeekUp}
                    volume={volume}
                    playbackRate={playbackRate}
                    onPlaybackRateChange={handlePlaybackRateChange}
                    played={played}
                    onSeek={handleSeekChange}
                    onSeekMouseDown={handleSeekMouseDown}
                    onSeekMouseUp={handleSeekMouseUp}
                    elapsedTime={elapsedTime}
                    totalDuration={totalDuration}
                    onChangeDisplayFormat={handleChangeDisplayFormat}
                    />
                                    <div className="fullpost-social" style={{
                                        position: "absolute", 
                                        left: '0%',
                                        top: '130px', 
                                        backgroundColor:'#fff'
                                        }}>
                                        {
                                    !like ? (
                                        <FavoriteBorder style={{fontSize:"20px", margin: "0 10px"}} onClick={handleLike}/>
                                    ) : (
                                        <Favorite style={{fontSize:"20px", margin: "0 10px", color: 'red'}} onClick={handleLike}/>
                                    )
                                    }
                                        <span className="likes" style={{fontSize:"20px", margin: "0 10px"}}>
                                        {like}
                                        </span>
                                    </div>
                                    <div className="fullpost-social" style={{
                                        position: "absolute", 
                                        left: '0%', 
                                        bottom: '130px',
                                        backgroundColor:'#fff'
                                    }}>
                                        <ArrowCircleUpIcon style={{fontSize:"20px", margin: "0 10px"}} onClick={handleUpvote}/>
                                        <span className="upvotes" style={{fontSize:"20px", margin: "0 10px"}}>
                                        {upvote}
                                        </span>
                                    </div>
                                    </>   
                            </div>
                        </div>
                        
                    </div>
                      )}}
                      </Media>
                </>

        </>
    )

}

export default ProfileVideo

